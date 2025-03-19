from rest_framework import viewsets
from .models import Dish, Basket, BasketItem
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from .serializers import DishSerializer, BasketSerializer, BasketItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import render
from django.shortcuts import get_object_or_404

# @api_view(['GET', 'POST'])
class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = [AllowAny]

class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return only the baskets belonging to the logged-in user."""
        user = self.request.user
        return Basket.objects.filter(user=user)

    def perform_create(self, serializer):
        """Create a new basket and link it to the user."""
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def my_basket(self, request):
        """Get the logged-in user's active basket."""
        basket, created = Basket.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(basket)
        return Response(serializer.data)
    
    def perform_destroy(self, instance):
        """Delete the basket and all related items."""
        instance.items.all().delete()
        super().perform_destroy(instance)

class BasketItemViewSet(viewsets.ModelViewSet):
    serializer_class = BasketItemSerializer
    queryset = BasketItem.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return basket items for the logged-in user's basket."""
        basket, created = Basket.objects.get_or_create(user=self.request.user)
        return BasketItem.objects.filter(basket=basket)

    def perform_create(self, serializer):
        """Add an item to the user's basket."""
        basket, created = Basket.objects.get_or_create(user=self.request.user)
        serializer.save(basket=basket)

    @action(detail=True, methods=['POST'])
    def update_quantity(self, request, pk=None):
        """Update the quantity of a basket item."""
        item = get_object_or_404(BasketItem, pk=pk, basket__user=request.user)
        new_quantity = request.data.get("quantity", 1)
        item.quantity = new_quantity
        item.save()
        return Response({"message": "Quantity updated", "new_quantity": item.quantity})

    @action(detail=True, methods=['DELETE'])
    def remove_item(self, request, pk=None):
        """Remove an item from the basket."""
        item = get_object_or_404(BasketItem, pk=pk, basket__user=request.user)
        item.delete()
        return Response({"message": "Item removed from basket"})