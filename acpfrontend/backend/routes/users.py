from fastapi import APIRouter, HTTPException, Depends, Request, Response
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import insert_user, get_user_by_username_or_email, update_user, delete_user, get_user_by_id
import bcrypt  # Ensure bcrypt is imported
import logging

router = APIRouter()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password_hash: str
    email: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    password_hash: Optional[str] = None
    email: Optional[str] = None

class UserResponse(BaseModel):
    user_id: int
    username: str
    email: str
    created_at: datetime

class UserLogin(BaseModel):
    identifier: str  # Could be username or email
    password_hash: str

async def get_current_user(request: Request):
    user_id = request.session.get("user_id")
    
    if not user_id:
        print("Session does not contain user_id")  # Add this for debugging
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    print(f"Authenticated User ID from session: {user_id}")  # Add logging to check session
    return {"user_id": user_id}

@router.post("/login", response_model=UserResponse)
async def login(user: UserLogin, request: Request, response: Response):
    # Authenticate user based on username/email and password
    db_user = await get_user_by_username_or_email(user.identifier)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username/email or password")

    # Compare the password entered by the user with the hashed password stored in the database
    if not bcrypt.checkpw(user.password_hash.encode('utf-8'), db_user["password_hash"].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid username/email or password")

    # Store the user ID in the session
    request.session["user_id"] = db_user["user_id"]  # Store the user_id in the session

    # DEBUG: Print session contents to verify it's working
    print("Session after login:", request.session)

    return UserResponse(
        user_id=db_user["user_id"],
        username=db_user["username"],
        email=db_user["email"],
        created_at=db_user["created_at"]
    )

# User registration route
@router.post("/create", response_model=UserResponse)
async def create_user(user: UserCreate):
    # Hash the password before saving it to the database
    hashed_password = bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt())

    # Insert the user into the database with the hashed password
    new_user = await insert_user(user.username, hashed_password.decode('utf-8'), user.email)
    if not new_user:
        raise HTTPException(status_code=400, detail="User creation failed")
    
    return UserResponse(
        user_id=new_user["user_id"],
        username=new_user["username"],
        email=new_user["email"],
        created_at=new_user["created_at"]
    )

# Endpoint to update the user's information
@router.put("/{user_id}", response_model=UserResponse)
async def update_user_endpoint(user_id: int, user: UserUpdate):
    # Optionally hash the password if it's being updated
    if user.password_hash:
        user.password_hash = bcrypt.hashpw(user.password_hash.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    updated_user = await update_user(user_id, user.username, user.password_hash, user.email)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return updated_user

# Endpoint to delete the user account
@router.delete("/{user_id}")
async def delete_user_endpoint(user_id: int):
    deleted_user = await delete_user(user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"detail": "User deleted"}