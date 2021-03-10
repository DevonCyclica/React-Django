import json

from django.db.utils import IntegrityError
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from PyDictionary import PyDictionary

from sampleapp.models import Word

# Create your views here.

def word_list(request):
	"""Get the list of all words (excluding words that only exist as synonyms)."""
	words = Word.objects.prefetch_related('synonyms').filter(full_word=True)

	return JsonResponse({
		'words': [{
			'word': word.word,
			'synonyms': list(word.synonyms.values('id', 'word')),
			'id': word.id,
		} for word in words]
	})

def _filter_words(x):
	"""Helper function to filter synonyms to only include unhyphenated, single-word words."""
	if x.count(' ') or x.count('-'):
		return False
	else:
		return True

def _convert_word(word):
	"""Helper function to create/assign synonyms."""
	dictionary = PyDictionary()

	try:
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

		word.full_word = True
		word.save()

		### return the newly created word
		return JsonResponse({
			'word': {
				'word': word.word,
				'synonyms': [],
				'id': word.id,
			}
		})
	except TypeError:
		return HttpResponseBadRequest("Something went wrong when converting an existing word to a full word - most likely a fake word was passed in.")


@csrf_exempt
def convert_word(request):
	"""Convert a word that only exists as a synonym into a fully fledged word."""
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

@csrf_exempt
def clear_all_words(request):
	"""Delete all words."""
	secret_code ='shhhhh'
	if not json.loads(request.body).get('secretCode') == secret_code:
		return JsonResponse({})
	else:
		Word.objects.all().delete()
	return JsonResponse({ 'words': [] })
