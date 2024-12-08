"""webproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib.auth import views as auth_views
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),

    #GET METHODS
    path('ws/author', views.get_author),
    path('ws/authors', views.get_authors),
    path('ws/publisher', views.get_publisher),
    path('ws/publishers', views.get_publishers),
    path('ws/book', views.get_book),
    path('ws/books', views.get_books),

    #POST METHODS
    path('ws/authorcreate', views.create_author),
    path('ws/publishercreate', views.create_publisher),
    path('ws/bookcreate', views.create_book),

    #PUT METHODS
    path('ws/authorupd', views.update_author),
    path('ws/publisherupd', views.update_publisher),
    path('ws/bookupd', views.update_book),

    #DELETE METHODS
    path('ws/authordel/<int:id>', views.delete_author),
    path('ws/publisherdel/<int:id>', views.delete_publisher),
    path('ws/bookdel/<int:id>', views.delete_book),

    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('books/', views.books, name='books'),
    path('books/<int:author>', views.books, name='books'),

    path('authors/', views.authors, name='authors'),

    path('detailedBook/<int:book>', views.detailedBooks, name='books'),
    path('detailedBook/', views.detailedBooks, name='books'),
    path('searchbooks/', views.searchBook, name='searchbooks'),
    path('searchauthors/', views.searchAuthor, name='searchauthors'),
    path('searchBooksByAuthorOrPublisher/', views.searchBookByAuthorOrPublisher, name='searchBookByAuthorOrPublisher'),
    path('addbook/', views.addBook, name='addbook'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    path('buy_book/<int:id>', views.buybook, name='buy_book'),
    path('shoppingcard/', views.shoppingCart, name='shoppingCard'),
]
