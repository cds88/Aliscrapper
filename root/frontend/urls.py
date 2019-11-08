
 
from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutPage, name='logout')
]
