from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
from django.shortcuts import redirect, render


def auth_logout(request: HttpRequest):
    logout(request)
    return redirect('/')


def dashboard(request: HttpRequest):
    return view(request)

def detail(request: HttpRequest, id: int):
    return view(request)

def view(request: HttpRequest):
    return render(request, 'frontend/index.html')
