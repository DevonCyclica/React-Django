import json

from django.db.utils import IntegrityError
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from PyDictionary import PyDictionary

from sampleapp.models import PartOfSpeech, Word

# Create your views here.

def word_list(request):
	"""Get the list of all words (excluding words that only exist as antonyms/synonyms)."""
	words = Word.objects.prefetch_related('synonyms', 'antonyms', 'part_of_speech').exclude(part_of_speech__isnull=True)

	return JsonResponse({
		'words': [{
			'word': word.word,
			'synonyms': list(word.synonyms.values('id', 'word')),
			'antonyms': list(word.antonyms.values('id', 'word')),
			'part_of_speech': list(word.part_of_speech.values('id', 'category')),
			'id': word.id
		} for word in words]
	})

def _filter_words(x):
	"""Helper function to filter antonyms/synonyms to only include unhyphenated, single-word words."""
	if x.count(' ') or x.count('-'):
		return False
	else:
		return True

def _convert_word(word):
	"""Helper function to create/assign synonyms, antonyms, and parts of speech."""
	dictionary = PyDictionary()

	### create synonyms
	# get the synonyms
	synonyms = filter(_filter_words, dictionary.synonym(word.word))
	synonym_through = Word.synonyms.through
	synonym_objs =[]
	# assign the synonyms
	for synonym in synonyms:
		synonym_objs.append(synonym_through(from_word=word, to_word=Word.objects.get_or_create(word=synonym)[0]))
	# create the synonyms
	synonym_through.objects.bulk_create(synonym_objs)

	### create antonyms
	# get the synonyms
	antonyms = dictionary.antonym(word.word)
	if antonyms:  # some words have no antonyms
		antonym_through = Word.antonyms.through
		antonym_objs = []
		# assign the synonyms
		for antonym in filter(_filter_words, antonyms):
			antonym_objs.append(antonym_through(from_word=word, to_word=Word.objects.get_or_create(word=antonym)[0]))
		# create the synonyms
		antonym_through.objects.bulk_create(antonym_objs)

	### most likely retrieve and assign parts of speech, but potentially create
	pos_through = Word.part_of_speech.through
	pos_through_objs = []
	# get the parts of speech
	pos = list(dictionary.meaning(word.word).keys())
	# assign the parts fo speech
	for part_of_speech in pos:
		pos_through_objs.append(pos_through(word=word, partofspeech=PartOfSpeech.objects.get_or_create(category=part_of_speech)[0]))
	# create the parts of speech
	pos_through.objects.bulk_create(pos_through_objs)

	### return the newly created word
	word = Word.objects.get(id=word.id)
	return JsonResponse({
		'word': {
			'word': word.word,
			'synonyms': list(word.synonyms.values('id', 'word')),
			'antonyms': list(word.antonyms.values('id', 'word')),
			'part_of_speech': list(word.part_of_speech.values('id', 'category')),
		}
	})


@csrf_exempt
def convert_word(request):
	"""Convert a word that only exists as a synonym/antonym into a fully fledged word."""
	try:  # retrieve word
		word = Word.objects.get(id=json.loads(request.body)['word'])
	except DoesNotExist:
		return HttpResponseBadRequest("That word does not exist!")

	# call _convert_word to handle the rest
	return _convert_word(word)

@csrf_exempt
def add_new_word(request):
	"""Add a new word from scratch."""

	word = json.loads(request.body)['newWord']

	dictionary = PyDictionary()
	if not dictionary.meaning(word):  # check that the word is actually a word
		return HttpResponseBadRequest("That is not a real word!")

	try:  # try to create the word and ensure it doesn't already exist
		word = Word(word=word)
		word.save()
	except IntegrityError:
		return HttpResponseBadRequest("That word already exists!")

	# call _convert_word to handle the rest
	return _convert_word(word)
