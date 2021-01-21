from django.http import JsonResponse
from django.shortcuts import render

from sampleapp.models import Foo, Bar

# Create your views here.

def foo_detail(request):
	pass

def foo_list(request):
	foos = Foo.objects.prefetch_related('bar_set').all()

	return JsonResponse({'foos': [{'id': foo.id, 'name': foo.name, 'bars': list(foo.bar_set.values('id', 'name'))} for foo in foos]})

def bar_detail(request):
	pass

def bar_list(request):
	pass

def similar_bars(request):
	bars = Bar.objects.filter(name__startswith=request.GET.get('barName')[:2]).values('id', 'name')
	return JsonResponse({'bars': list(bars)})
