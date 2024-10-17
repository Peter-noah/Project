from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from database import log_search_term, get_general_search_ranking, get_user_search_ranking
from routes.users import get_current_user

router = APIRouter()

# Model for search term input
class SearchTermModel(BaseModel):
    search_term: str

# search.py
@router.post("/log_search")
async def log_search(search_data: SearchTermModel, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['user_id']
        await log_search_term(user_id, search_data.search_term)
        return {"message": "Search term logged successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging search term: {str(e)}")

# Endpoint to get general search ranking
@router.get("/general_ranking")
async def get_general_ranking():
    try:
        rankings = await get_general_search_ranking()
        if not rankings:
            raise HTTPException(status_code=404, detail="No search rankings found")
        return {"rankings": rankings}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching general search rankings: {str(e)}")

# Endpoint to get user-specific search ranking
@router.get("/user_ranking")
async def get_specific_user_ranking(user_id: int = None, current_user: dict = Depends(get_current_user)):
    """
    Fetch the search term ranking for a specific user (if `user_id` is provided).
    Otherwise, it defaults to the current authenticated user's rankings.
    """
    try:
        # If no user_id is provided, use the currently authenticated user's ID
        if not user_id:
            user_id = current_user["user_id"]
        
        rankings = await get_user_search_ranking(user_id)

        if not rankings:
            raise HTTPException(status_code=404, detail="No search data found for the user")

        return {"rankings": rankings}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user ranking: {str(e)}")
