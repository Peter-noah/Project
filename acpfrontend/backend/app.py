import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routes.users import router as user_router  # Import user routes
#from routes.shop import router as shop_router  # Import shop routes
from Sorting.search_both import search_both
from database import connect_db, disconnect_db

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware (optional: allows frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include user and shop routes
app.include_router(user_router, prefix="/api/users")
#app.include_router(shop_router, prefix="/api/shops")

# Database connection events
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
    """Utility to load JSON data safely."""
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found: {filepath}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Invalid JSON in {filepath}")

@app.get("/search")
def search_products(query: str, criteria: str = "price_desc"):
    """Search for products with the given query and criteria."""
    try:
        results = search_both(query, criteria)
        return JSONResponse(content=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@app.get("/sorted_results")
def get_sorted_results():
    """Retrieve raw JSON data from sorted_result.json."""
    filepath = os.path.join(DATA_DIR, "sorted_result.json")
    sorted_results = load_json(filepath)
    return JSONResponse(content=sorted_results)

@app.get("/combined_results")
def get_combined_results():
    """Retrieve raw JSON data from Combine_result.json."""
    filepath = os.path.join(DATA_DIR, "Combine_result.json")
    combined_results = load_json(filepath)
    return JSONResponse(content=combined_results)