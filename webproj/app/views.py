from django.shortcuts import render, redirect
from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializers import AuthorSerializer, PublisherSerializer, BookSerializer

from app.forms import BookQueryForm
from app.models import Author, Book, Publisher


# Create your views here.

def home(request):
    tparams = {
        'title': 'Home Page',
        'year': datetime.now().year,
    }
    return render(request, 'index.html', tparams)


def contact(request):
    tparams = {
        'title': 'Contact',
        'message': 'Your contact page.',
        'year': datetime.now().year,
    }
    return render(request, 'contact.html', tparams)


def about(request):
    tparams = {
        'title': 'About',
        'message': 'Your application description page.',
        'year': datetime.now().year,
    }
    return render(request, 'about.html', tparams)


def books(request, author=None):
    if author is None:
        data = Book.objects.all()
    else:
        data = Book.objects.filter(id=author)
    tparams = {
        'type': 'Books',
        'data': data,
    }
    return render(request, 'listing.html', tparams)

def detailedBooks(request, book=0):
    detailedBook = Book.objects.get(id=book)
    print(detailedBook.author.all())
    tparams = {
        'type': 'Books',
        'book': detailedBook,
    }
    return render(request, 'detailedbooks.html', tparams)

def authors(request):
    authors = Author.objects.all()
    tparams = {
        'type': 'Authors',
        'data': authors,
    }
    return render(request, 'listing.html', tparams)

def detailedAuthors(request, author=0):
    detailedAuthor = Author.objects.get(id=author)
    print(detailedAuthor.author.all())
    tparams = {
        'type': 'Authors',
        'detailedAuthor': detailedAuthor,
    }
    return render(request, 'detailedbooks.html', tparams)

def searchBook(request):
    """
    if 'query' in request.POST:
        query = request.POST['query']
        if query:
            books = Book.objects.filter(title__icontains=query)
            return render(request, 'listing.html', {'type':'Books', 'data':books})
        else:
            return render(request, 'booksearch.html', {'error' : True})
    return render(request, 'booksearch.html', {'error': False})
    """
    if request.method == 'POST':
        form = BookQueryForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data['query']
            books = Book.objects.filter(title__icontains=query)
            return render(request, 'listing.html', {'type':'Books', 'data':books})
    else:
        form = BookQueryForm()
    return render(request, 'booksearch.html', {'form':form})

def searchAuthor(request):
    """
    if 'query' in request.POST:
        query = request.POST['query']
        if query:
            authors = Author.objects.filter(name__icontains=query)
            return render(request, 'listing.html', {'type':'Authors', 'data':authors})
        else:
            return render(request, 'booksearchSimple.html', {'error' : True})
    return render(request, 'booksearchSimple.html', {'error': False})
    """
    if request.method == 'POST':
        form = BookQueryForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data['query']
            authors = Author.objects.filter(name__icontains=query)
            return render(request, 'listing.html', {'type':'Authors', 'data':authors})
    else:
        form = BookQueryForm()
    return render(request, 'booksearch.html', {'form':form})

def searchBookByAuthorOrPublisher(request):
    """
    if 'query' in request.POST:
        query = request.POST['query']
        if query:
            booksFromAuthors = Book.objects.filter(author__name__icontains=query)
            booksFromPublishers = Book.objects.filter(publisher__name__icontains=query)
            for book in booksFromPublishers:
                if book not in booksFromAuthors:
                    booksFromAuthors.append(book)
            return render(request, 'listing.html', {'type':'Books', 'data':booksFromPublishers})
        else:
            return render(request, 'booksearchSimple.html', {'error' : True})
    return render(request, 'booksearchSimple.html', {'error': False})
    """
    if request.method == 'POST':
        form = BookQueryForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data['query']
            booksFromAuthors = Book.objects.filter(author__name__icontains=query)
            booksFromPublishers = Book.objects.filter(publisher__name__icontains=query)
            for book in booksFromPublishers:
                if book not in booksFromAuthors:
                    booksFromAuthors.append(book)
            return render(request, 'listing.html', {'type':'Books', 'data':booksFromAuthors})
    else:
        form = BookQueryForm()
    return render(request, 'booksearch.html', {'form':form})

def addBook(request, success=False, error=False):
    authors = Author.objects.all()
    publishers = Publisher.objects.all()
    if request.method == 'POST':
        title = request.POST['title']
        date = request.POST['date']
        listauthors = request.POST.getlist('author')
        publisher = request.POST['publisher']
        if title and date and listauthors and publisher and not (request.user.is_authenticated or request.user.username != 'admin'):
            newbook = Book.objects.create(title=title, date=date, publisher_id=publisher)
            newbook.author.set(listauthors)
            return render(request, 'addnewbook.html', {"success" : True, "error" : False, "authors" : authors, "publishers" : publishers})
        return render(request, 'addnewbook.html', {"success" : False, "error" : True, "authors" : authors, "publishers" : publishers})
    return render(request, 'addnewbook.html', {"success" : False, "error" : False, "authors" : authors, "publishers" : publishers})



def buybook(request, id):
    tparams = {
        'title': 'Home Page',
        'year': datetime.now().year,
    }
    list_bought_books = request.session.get('list_bought_books', [])
    list_bought_books.append(id)
    request.session['list_bought_books'] = list_bought_books
    return render(request, 'index.html', tparams)

def shoppingCart(request):
    cart = Book.objects.filter(pk__in=request.session.get('list_bought_books', []))
    if cart == []:
        home(request)
    if request.user.is_authenticated:
        tparams = {
            'cart' : Book.objects.filter(pk__in=request.session.get('list_bought_books', [])),
        }
        return render(request, 'shoppingcart.html', tparams)
    home(request)



# ------------------- REST API ------------------- #

@api_view(['GET'])
def get_author(request):
    id = int(request.GET['id'])
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AuthorSerializer(author)
    return Response(serializer.data)

@api_view(['GET'])
def get_authors(request):
    authors = Author.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        authors = authors[:num]
    serializer = AuthorSerializer(authors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_publisher(request):
    id = int(request.GET['id'])
    try:
        publisher = Publisher.objects.get(id=id)
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublisherSerializer(publisher)
    return Response(serializer.data)

@api_view(['GET'])
def get_publishers(request):
    publishers = Publisher.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        publishers = publishers[:num]
    serializer = PublisherSerializer(publishers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_book(request):
    id = int(request.GET['id'])
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BookSerializer(book)
    return Response(serializer.data)

@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        books = books[:num]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_author(request):
    serializer = AuthorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_publisher(request):
    serializer = PublisherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_author(request):
    id = int(request.data['id'])
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = AuthorSerializer(author, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_publisher(request):
    id = int(request.data['id'])
    try:
        publisher = Publisher.objects.get(id=id)
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PublisherSerializer(publisher, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_book(request):
    id = request.data.get('id')  # Use `.get()` to avoid KeyError
    if not id:
        return Response({"error": "Book ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookSerializer(book, data=request.data)
    if serializer.is_valid():
        serializer.save()  # Calls the `update` method
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_author(request, id):
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    author.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_publisher(request, id):
    try:
        publisher = Publisher.objects.get(id=id)
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    publisher.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_book(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    book.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------- REST API ------------------- #

