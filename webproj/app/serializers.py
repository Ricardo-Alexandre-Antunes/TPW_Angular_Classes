from app.models import Author, Publisher, Book
from rest_framework import serializers

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'email')

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('id', 'name', 'city', 'country', 'website')

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=True)
    publisher = PublisherSerializer(many=False)

    class Meta:
        model = Book
        fields = ('id', 'title', 'date', 'author', 'publisher')

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        publisher_data = validated_data.pop('publisher')
        book = Book.objects.create(**validated_data)
        for author in author_data:
            Author.objects.create(book=book, **author)
        Publisher.objects.create(book=book, **publisher_data)
        return book
    
    def update(self, instance, validated_data):
        # Update the publisher
        publisher_data = validated_data.pop('publisher', None)
        if publisher_data:
            publisher = instance.publisher  # Get the current publisher instance
            for attr, value in publisher_data.items():
                setattr(publisher, attr, value)  # Update each field
            publisher.save()  # Save the updated publisher

        # Update the authors
        author_data = validated_data.pop('author', None)
        if author_data:
            instance.author.clear()  # Clear existing relationships
            for author in author_data:
                author_instance, created = Author.objects.get_or_create(**author)
                instance.author.add(author_instance)  # Re-establish relationships

        # Update the book fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  # Update book attributes
        instance.save()  # Save the book instance

        return instance

