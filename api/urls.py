from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import DishViewSet, BasketViewSet, BasketItemViewSet


router = DefaultRouter()
router.register(r'dishes', DishViewSet)
router.register(r'baskets', BasketViewSet)
router.register(r'basket-items', BasketItemViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # URL: /api/data/
]