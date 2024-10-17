from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List
from database import add_to_favorites, remove_from_favorites, get_user_favorites, remove_favorite_by_product_name
from routes.users import get_current_user  # Ensure users are authenticated

router = APIRouter()

# Define the product model that will be used in the favorites API
class FavoriteItem(BaseModel):
    product_name: str
    shop: str
    price_thb: float
    rating: float
    product_url: str
    image_url: str

# Define a model to handle the request body
class CartRemoveRequest(BaseModel):
    product_name: str

# Add item to favorites
@router.post("/add")
async def add_to_favorites_route(
    item: FavoriteItem, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    
    # Add the item to favorites
    try:
        await add_to_favorites(
            user_id=user_id,
            product_name=item.product_name,
            shop=item.shop,
            price_thb=item.price_thb,
            rating=item.rating,
            product_url=item.product_url,
            image_url=item.image_url
        )
        return {"detail": "Item added to wishlist successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding to favorites: {str(e)}")


# Remove item from favorites
@router.delete("/remove/{product_name}")
async def remove_from_favorites_route(
    product_name: str, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]

    try:
        await remove_from_favorites(user_id=user_id, product_name=product_name)
        return {"detail": "Item removed from wishlist successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error removing from favorites: {str(e)}")


@router.post("/add_to_cart_and_remove")
async def add_to_cart_and_remove_route(
    request_data: CartRemoveRequest, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    product_name = request_data.product_name  # Get the product name from the request body

    print(f"User {user_id} is adding {product_name} to cart and removing it from favorites")
    
    try:
        # Remove it from the favorites table
        await remove_favorite_by_product_name(user_id=user_id, product_name=product_name)
        return {"detail": "Item added to cart and removed from wishlist successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

# Get user's favorites
@router.get("/")
async def get_user_favorites_route(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]

    try:
        favorites = await get_user_favorites(user_id=user_id)
        return {"favorites": favorites}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving favorites: {str(e)}")