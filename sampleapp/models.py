from django.db import models

# Create your models here.

class Word(models.Model):
	word = models.CharField(max_length=50, unique=True)
	synonyms = models.ManyToManyField('Word', related_name='related_synonyms')
	full_word = models.BooleanField(default=False)

