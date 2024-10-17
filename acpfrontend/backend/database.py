from databases import Database
import bcrypt

# PostgreSQL connection environment variables
POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "Pickmai"
POSTGRES_HOST = "db"  # Service hostname in Docker Compose

# Construct the PostgreSQL URL for asyncpg
DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

# Create the database object
database = Database(DATABASE_URL)

async def connect_db():
    try:
        await database.connect()
        print("Database connected successfully!")
    except Exception as e:
        print(f"Error connecting to the database: {e}")

async def disconnect_db():
    try:
        await database.disconnect()
        print("Database disconnected successfully!")
    except Exception as e:
        print(f"Error disconnecting from the database: {e}")

# ========================== USERS ==========================

# Function to insert a new user into the users table
async def insert_user(username: str, password_hash: str, email: str):
    query = """
    INSERT INTO users (username, password_hash, email)
    VALUES (:username, :password_hash, :email)
    RETURNING user_id, username, email, created_at
    """
    values = {"username": username, "password_hash": password_hash, "email": email}
    return await database.fetch_one(query=query, values=values)

# Function to get a user by username or email
async def get_user_by_username_or_email(identifier: str):
    query = """
    SELECT * FROM users 
    WHERE (email = :identifier OR username = :identifier)
    """
    return await database.fetch_one(query=query, values={"identifier": identifier})

# Function to get a user by user_id
async def get_user_by_id(user_id: int):
    query = "SELECT * FROM users WHERE user_id = :user_id"
    return await database.fetch_one(query=query, values={"user_id": user_id})

# Function to update a user in the users table
async def update_user(user_id: int, username: str, password_hash: str, email: str):
    query = """
    UPDATE users
    SET username = :username, password_hash = :password_hash, email = :email
    WHERE user_id = :user_id
    RETURNING user_id, username, email, created_at
    """
    values = {"user_id": user_id, "username": username, "password_hash": password_hash, "email": email}
    return await database.fetch_one(query=query, values=values)

# Function to delete a user from the users table
async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE user_id = :user_id RETURNING *"
    return await database.fetch_one(query=query, values={"user_id": user_id})

# ========================== CART ==========================

# Function to insert an item into the cart
async def add_to_cart(user_id: int, product_name: str, shop: str, price_thb: float, rating: float, product_url: str, image_url: str):
    query = """
    INSERT INTO cart (user_id, product_name, shop, price_thb, rating, product_url, image_url)
    VALUES (:user_id, :product_name, :shop, :price_thb, :rating, :product_url, :image_url)
    RETURNING id, user_id, product_name, shop, price_thb, rating, product_url, image_url
    """
    values = {
        "user_id": user_id,
        "product_name": product_name,
        "shop": shop,
        "price_thb": price_thb,
        "rating": rating,
        "product_url": product_url,
        "image_url": image_url
    }
    return await database.fetch_one(query=query, values=values)

# Function to check if an item already exists in the user's cart
async def check_cart_item_exists(user_id: int, product_name: str) -> bool:
    query = """
    SELECT COUNT(1)
    FROM cart
    WHERE user_id = :user_id AND product_name = :product_name
    """
    result = await database.fetch_one(query=query, values={"user_id": user_id, "product_name": product_name})
    
    # Return True if the item exists, False otherwise
    return result and result[0] > 0

# ========================== SHOPS ==========================

# Function to update the shops table with counts of eBay and Amazon products
async def update_shops():
    query = """
    SELECT 
        SUM(CASE WHEN LOWER(shop) = 'ebay' THEN 1 ELSE 0 END) AS ebay_count,
        SUM(CASE WHEN LOWER(shop) = 'amazon' THEN 1 ELSE 0 END) AS amazon_count
    FROM cart;
    """
    
    result = await database.fetch_one(query=query)
    
    if result is None:
        raise Exception("Failed to retrieve counts from the cart table")

    ebay_count = result["ebay_count"] if result["ebay_count"] is not None else 0
    amazon_count = result["amazon_count"] if result["amazon_count"] is not None else 0

    print(f"eBay Count: {ebay_count}, Amazon Count: {amazon_count}")

    insert_query = """
    INSERT INTO shops (ebay_count, amazon_count, last_updated)
    VALUES (:ebay_count, :amazon_count, NOW())
    """
    values = {"ebay_count": ebay_count, "amazon_count": amazon_count}
    
    try:
        await database.execute(query=insert_query, values=values)
        print(f"Shops table updated with ebay_count: {ebay_count}, amazon_count: {amazon_count}")
    except Exception as e:
        print(f"Failed to update shops table: {e}")

async def get_shops_comparison():
    query = """
    SELECT ebay_count, amazon_count, last_updated
    FROM shops
    ORDER BY id DESC
    LIMIT 1
    """
    return await database.fetch_one(query=query)

# ========================== SEARCH TERMS ==========================

# Function to log a search term
async def log_search_term(user_id: int, search_term: str):
    query = """
    INSERT INTO search_terms (user_id, search_term)
    VALUES (:user_id, :search_term)
    """
    values = {"user_id": user_id, "search_term": search_term}

    try:
        await database.execute(query=query, values=values)
        print(f"Logged search term '{search_term}' for user_id: {user_id}")
    except Exception as e:
        print(f"Failed to log search term: {e}")

# Function to get the general search rankings
async def get_general_search_ranking():
    query = """
    SELECT search_term, COUNT(*) AS search_count
    FROM search_terms
    GROUP BY search_term
    ORDER BY search_count DESC;
    """
    return await database.fetch_all(query=query)

# Function to get user-specific search rankings
async def get_user_search_ranking(user_id: int):
    query = """
    SELECT search_term, COUNT(*) AS search_count
    FROM search_terms
    WHERE user_id = :user_id
    GROUP BY search_term
    ORDER BY search_count DESC;
    """
    return await database.fetch_all(query=query, values={"user_id": user_id})

# Function to retrieve a user's search history
async def get_search_history(user_id: int):
    query = """
    SELECT search_term, searched_at
    FROM search_history
    WHERE user_id = :user_id
    ORDER BY searched_at DESC
    """
    return await database.fetch_all(query=query, values={"user_id": user_id})

# ========================== FAVORITES ==========================

# Add a product to favorites
async def add_to_favorites(user_id: int, product_name: str, shop: str, price_thb: float, rating: float, product_url: str, image_url: str):
    query = """
    INSERT INTO favorites (user_id, product_name, shop, price_thb, rating, product_url, image_url)
    VALUES (:user_id, :product_name, :shop, :price_thb, :rating, :product_url, :image_url)
    """
    values = {
        "user_id": user_id,
        "product_name": product_name,
        "shop": shop,
        "price_thb": price_thb,
        "rating": rating,
        "product_url": product_url,
        "image_url": image_url
    }
    await database.execute(query=query, values=values)

async def remove_favorite_by_product_name(user_id: int, product_name: str):
    print(f"Attempting to remove product: '{product_name.strip()}' for user_id {user_id}")

    query = """
    DELETE FROM favorites 
    WHERE user_id = :user_id 
    AND TRIM(BOTH FROM LOWER(product_name)) = TRIM(BOTH FROM LOWER(:product_name))
    """
    values = {"user_id": user_id, "product_name": product_name.strip()}  # Trim spaces

    try:
        await database.execute(query=query, values=values)
        print(f"Product '{product_name}' removed from favorites.")
    except Exception as e:
        print(f"Error while removing product from favorites: {e}")

# Remove a product from favorites
async def remove_from_favorites(user_id: int, product_name: str):
    query = """
    DELETE FROM favorites WHERE user_id = :user_id AND product_name = :product_name
    """
    values = {"user_id": user_id, "product_name": product_name}
    await database.execute(query=query, values=values)

# Get all favorite products for a user
async def get_user_favorites(user_id: int):
    query = """
    SELECT product_name, shop, price_thb, rating, product_url, image_url 
    FROM favorites 
    WHERE user_id = :user_id
    """
    return await database.fetch_all(query=query, values={"user_id": user_id})