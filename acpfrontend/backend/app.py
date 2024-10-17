import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.logger import logger
from routes.users import router as user_router
from routes.cart import router as cart_router
from routes.search import router as search_router
from routes.favorites import router as favorites_router 
from Sorting.search_both import search_both
from database import connect_db, disconnect_db
from starlette.middleware.sessions import SessionMiddleware
import secrets

app = FastAPI()

SECRET_KEY = secrets.token_hex(32)

# Add session middleware (This ensures that session cookies work)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY) 

# Add CORS middleware (Ensure credentials are allowed and origins match frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,  # Allow credentials (cookies, auth tokens)
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Authorization, Content-Type, etc.)
)

# Include routers
app.include_router(user_router, prefix="/api/users")
app.include_router(cart_router, prefix="/api/cart")
app.include_router(search_router, prefix="/api/search")
app.include_router(favorites_router, prefix="/api/favorites")

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

# Define the data directory path dynamically
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "Sorting", "Data")

def load_json(filepath):
    """Utility function to load JSON data safely."""
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found: {filepath}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format")

@app.get("/search")
def search_products(query: str, criteria: str = "price_desc"):
    """Search for products with the given query and criteria."""
    try:
        results = search_both(query, criteria)
        return JSONResponse(content=results)
    except Exception as e:
        logger.error(f"Error searching for products: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/sorted_results")
def get_sorted_results():
    """Retrieve raw JSON data from sorted_result.json."""
    filepath = os.path.join(DATA_DIR, "sorted_result.json")
    try:
        sorted_results = load_json(filepath)
        return JSONResponse(content=sorted_results)
    except HTTPException as e:
        logger.error(f"Error loading sorted results: {str(e.detail)}")
        raise e

@app.get("/combined_results")
def get_combined_results():
    """Retrieve raw JSON data from Combine_result.json."""
    filepath = os.path.join(DATA_DIR, "Combine_result.json")
    try:
        combined_results = load_json(filepath)
        return JSONResponse(content=combined_results)
    except HTTPException as e:
        logger.error(f"Error loading combined results: {str(e.detail)}")
        raise e
        