from databases import Database


POSTGRES_USER = "temp"
POSTGRES_PASSWORD = "temp"
POSTGRES_DB = "Pickmai"
POSTGRES_HOST = "db"


DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'


database = Database(DATABASE_URL)


async def connect_db():
   await database.connect()
   print("Database connected")


async def disconnect_db():
   await database.disconnect()
   print("Database disconnected")


# Function to insert a new user into the users table
async def insert_user(username: str, password_hash: str, email: str):
   query = """
   INSERT INTO users (username, password_hash, email)
   VALUES (:username, :password_hash, :email)
   RETURNING user_id, username, password_hash, email, created_at
   """
   values = {"username": username, "password_hash": password_hash, "email": email}
   return await database.fetch_one(query=query, values=values)


# Function to select a user by user_id from the users table
async def get_user(username: str):
   query = "SELECT * FROM users WHERE username = :username"
   return await database.fetch_one(query=query, values={"username": username})


async def get_user_by_username_or_email(identifier: str, password_hash: str):
    query = """
    SELECT * FROM users 
    WHERE (email = :identifier OR username = :identifier) 
    AND password_hash = :password_hash
    """
    return await database.fetch_one(query=query, values={"identifier": identifier, "password_hash": password_hash})



# Function to update a user in the users table
async def update_user(user_id: int, username: str, password_hash: str, email: str):
   query = """
   UPDATE users
   SET username = :username, password_hash = :password_hash, email = :email
   WHERE user_id = :user_id
   RETURNING user_id, username, password_hash, email, created_at
   """
   values = {"user_id": user_id, "username": username, "password_hash": password_hash, "email": email}
   return await database.fetch_one(query=query, values=values)


# Function to delete a user from the users table
async def delete_user(user_id: int):
   query = "DELETE FROM users WHERE user_id = :user_id RETURNING *"
   return await database.fetch_one(query=query, values={"user_id": user_id})


# Function to insert a new shop into the shops table
async def insert_shop(shop_name: str, website_url: str):
   query = """
   INSERT INTO shops (shop_name, website_url)
   VALUES (:shop_name, :website_url)
   RETURNING shop_id, shop_name, website_url
   """
   values = {"shop_name": shop_name, "website_url": website_url}
   return await database.fetch_one(query=query, values=values)


# Function to select a shop by shop_id from the shops table
async def get_shop(shop_name: str):
   query = "SELECT * FROM shops WHERE shop_name = :shop_name"
   return await database.fetch_one(query=query, values={"shop_name": shop_name})

# Function to delete a user from the users table
async def delete_shop(user_id: int):
   query = "DELETE FROM shops WHERE shop_id = :shop_id RETURNING *"
   return await database.fetch_one(query=query, values={"user_id": user_id})