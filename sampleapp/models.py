from django.db import models

# Create your models here.

class PartOfSpeech(models.Model):
	category = models.CharField(max_length=50, unique=True)

class Word(models.Model):
	word = models.CharField(max_length=50, unique=True)
	antonyms = models.ManyToManyField('Word', related_name='related_antonyms')
	synonyms = models.ManyToManyField('Word', related_name='related_synonyms')
	part_of_speech = models.ManyToManyField(PartOfSpeech)

