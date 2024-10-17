Dbeaver code:

drop table if exists favorites;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),  -- Links the cart item to the user
    product_name TEXT NOT NULL,
    shop TEXT NOT NULL,
    price_thb DECIMAL(10, 2) NOT NULL,  -- Price of the product in THB
    rating DECIMAL(2, 1),  -- Rating of the product
    product_url TEXT NOT NULL,  -- Product's URL
    image_url TEXT NOT NULL,  -- Product's image URL
    checked_out BOOLEAN DEFAULT FALSE  -- Mark items as checked out when the user purchases them
);

CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    ebay_count INTEGER NOT NULL,
    amazon_count INTEGER NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE search_terms (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    search_term TEXT NOT NULL,
    search_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    product_name VARCHAR(255) NOT NULL,
    shop VARCHAR(50),
    price_thb FLOAT,
    rating FLOAT,
    product_url VARCHAR(1000),
    image_url VARCHAR(1000),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
