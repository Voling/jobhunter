"""
URL configuration for jobhunter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from jobhunterapi.views import coor_to_zip_view, real_distance_view, get_geo_distance_view, geocode_view, get_company_address_view, get_surrounding_zip_codes_view, only_geocode_view, get_logo_view, search_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path('coor_to_zip/', coor_to_zip_view, name='coor_to_zip'),
    path('real_distance/', real_distance_view, name ='real_distance'),
    path('get_geo_distance/', get_geo_distance_view, name ='get_geo_distance'),
    path('geocode/', geocode_view, name='geocode'),
    path('get_company_address/', get_company_address_view, name='get_company_address'),
    path('get_surrounding_zip_codes/', get_surrounding_zip_codes_view, name='get_surrounding_zip_codes'),
    path('only_geocode/', only_geocode_view, name='only_geocode'),
    path('get_logo/', get_logo_view, name='get_logo'),
    path('search/', search_view, name='search'),
]
