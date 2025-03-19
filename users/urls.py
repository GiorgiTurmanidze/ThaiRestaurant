from os import name
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import LoginView, SignUpView, basketPage, menuPage, registerPage, loginPage, mainPage, menuPage

urlpatterns = [
   path('api/auth/signup/', SignUpView.as_view(), name="signup"),
   path('api/auth/login/', LoginView.as_view(), name="login"),
   path('register/', registerPage, name="register"),
   path('login/', loginPage, name="login"),
   path('ThaiRestaurant/', mainPage, name="mainPage"),
   path('menu/', menuPage, name="menuPage"),
   path('basket/', basketPage, name="basketPage")
]