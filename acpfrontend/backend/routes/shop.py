from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *  # Ensure your database functions are imported

router = APIRouter()


# Pydantic model for user creation
class ShopCreate(BaseModel):
   shop_name: str
   website_url: str


# Pydantic model for user update
class ShopUpdate(BaseModel):
   shop_name: Optional[str]
   website_url: Optional[str]


# Pydantic model for user response
class shop(BaseModel):
   shop_id: int
   shop_name: str
   website_url: str


# Endpoint to create a new user
@router.post("/users/create", response_model=shop)
async def create_user(user: ShopCreate):
   # Check if the username already exists
   existing_user = await get_user(shop.shop_name)
   if existing_user:
      raise HTTPException(status_code=400, detail="Username already exists")
   
   result = await insert_user(user.username, user.password_hash, user.email)
   if result is None:
      raise HTTPException(status_code=400, detail="Error creating user")
   return result


# Endpoint to get a user by user_id
@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: int):
   result = await get_user(user_id)
   if result is None:
      raise HTTPException(status_code=404, detail="User not found")
   return result


# Endpoint to update a user
@router.put("/users/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate):
   result = await update_user(user_id, user.username, user.password_hash, user.email)
   if result is None:
      raise HTTPException(status_code=404, detail="User not found")
   return result


# Endpoint to delete a user
@router.delete("/users/{user_id}")
async def delete_user_endpoint(user_id: int):
   result = await delete_user(user_id)
   if result is None:
      raise HTTPException(status_code=404, detail="User not found")
   return {"detail": "User deleted"}




@router.post("/users/login")
async def login(user: UserLogin):
    # Fetch user from the database
    db_user = await get_user_by_username_or_email(user.identifier, user.password_hash)

    # If user not found, raise an exception
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username/email or password")

    # If login is successful, return user info (omit password hash)
    return {
        "user_id": db_user.user_id,
        "username": db_user.username,
        "email": db_user.email,
        "created_at": db_user.created_at
    }