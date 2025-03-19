from rest_framework import serializers
from .models import Dish, Basket, BasketItem
from django.contrib.auth.models import User

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class BasketItemSerializer(serializers.ModelSerializer):
    dish_name = serializers.ReadOnlyField(source="dish.name")
    dish_price = serializers.ReadOnlyField(source="dish.price")
    image = serializers.ReadOnlyField(source="dish.image")
    class Meta:
        model = BasketItem
        fields = ['id', 'dish', 'dish_name', 'dish_price', 'quantity', 'image']

class BasketSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    items = BasketItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Basket
        fields = ['id', 'user', 'created_at', 'items', 'total_price']

    def get_total_price(self, obj):
        """Calculate total price of all items in the basket"""
        return sum(item.dish.price * item.quantity for item in obj.items.all())