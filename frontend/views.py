from django.shortcuts import render


def dashboard(request):
    return view(request)

def view(request):
    return render(request, 'frontend/index.html')
