from tabnanny import verbose
from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Dish(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    nuts = models.BooleanField()
    image = models.URLField()
    vegeterian = models.BooleanField()
    spiciness = models.IntegerField()
    categoryId = models.IntegerField()

    def __str__(self):
        return f"{self.name} - ${self.price}"
    
    class Meta:
        verbose_name_plural = "Dishes"


class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="baskets") # if I will use models.OneToOneField 
    # instead of ForeignKey then user will only be able to have 1 basket.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Basket of {self.user.username} - {self.created_at}"
    
    def convert_to_order(self):
        if not self.items.exists():
            return None  # No items

        # Create the order
        order = Order.objects.create(user=self.user)

        # Move items from basket to order
        for item in self.items.all():
            OrderItem.objects.create(order=order, dish=item.dish, quantity=item.quantity)

        # Clear the basket
        self.items.all().delete()

        return order

    class Meta:
        verbose_name_plural = "Basket"

class BasketItem(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE, related_name="items")
    dish = models.ForeignKey('Dish', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.dish.name} (Basket: {self.basket.user.username})"
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[("pending", "Pending"), ("completed", "Completed")], default="pending")

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"
    
    class Meta:
        verbose_name_plural = "Orders"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.dish.name} (Order: {self.order.id})"