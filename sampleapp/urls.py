from django.urls import path

from sampleapp import views

urlpatterns = [
  path('word_list/', views.word_list),
  path('add_new_word/', views.add_new_word),
  path('convert_word/', views.convert_word),
  # path('foo_list/', views.foo_list),
  # path('bar_detail/', views.bar_detail),
  # path('bar_list/', views.bar_list),
  # path('similar_bars/', views.similar_bars),
]
