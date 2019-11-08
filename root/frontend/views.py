
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from pprint import pprint
from django.http import HttpResponseRedirect
from django.shortcuts import render, HttpResponse

# Create your views here.


@ensure_csrf_cookie
@login_required
def homepage(request):
    return render(request, 'frontend/Index.html')


@ensure_csrf_cookie
def loginPage(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            #log in the user
            user = form.get_user()
            login(request, user)
            return redirect('/')
            # lista = gitara.objects.all()
            # return render(request, 'homepage.html', {'elements': lista})
    else:
        form = AuthenticationForm()

    return render(request, 'frontend/Login.html', {'form': form})


@ensure_csrf_cookie
def logoutPage(request):
    logout(request)
    return redirect('login')


