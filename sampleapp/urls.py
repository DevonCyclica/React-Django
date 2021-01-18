from django.urls import path

from sampleapp import views

urlpatterns = [
  path('foo_detail/', views.foo_detail),
  path('foo_list/', views.foo_list),
  path('bar_detail/', views.bar_detail),
  path('bar_list/', views.bar_list),
]
