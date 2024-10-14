from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User

#turn model => json format
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'