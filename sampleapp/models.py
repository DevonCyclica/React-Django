from django.db import models

# Create your models here.

class Foo(models.Model):
	name = models.CharField(max_length=50)

class Bar(models.Model):
	name = models.CharField(max_length=50)
	foo = models.ForeignKey(Foo, on_delete=models.CASCADE)
