from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List
from database import add_to_cart, update_shops, get_shops_comparison
from routes.users import get_current_user  # Import session-based authentication


router = APIRouter()

# Define the product model that will be received during checkout
class CartItem(BaseModel):
    product_name: str
    shop: str
    price_thb: float
    rating: float
    product_url: str
    image_url: str

# Checkout endpoint that accepts a list of cart items
@router.post("/checkout")
async def checkout_cart_route(
    items: List[CartItem], 
    request: Request,  # Use Request to access session
    current_user: dict = Depends(get_current_user)
):
    """
    Handles checkout using session-based authentication.
    """
    user_id = current_user["user_id"]  # Extract user ID from session

    if not items:
        raise HTTPException(status_code=400, detail="No items to checkout")

    # Loop over items and add to cart
    for item in items:
        cart_item = await add_to_cart(
            user_id=user_id,
            product_name=item.product_name,
            shop=item.shop,
            price_thb=item.price_thb,
            rating=item.rating,
            product_url=item.product_url,
            image_url=item.image_url
        )
        if not cart_item:
            raise HTTPException(status_code=500, detail=f"Failed to add {item.product_name} to cart")

    # Update the shops table with new counts of eBay and Amazon products
    await update_shops()

    return {"detail": "Checkout successful", "items": items}

# Route to get shop comparison data
@router.get("/shops")
async def get_shops_data():
    try:
        shops_data = await get_shops_comparison()
        if not shops_data:
            raise HTTPException(status_code=404, detail="No shop data found")
        return {"shops": shops_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching shops data: {str(e)}")