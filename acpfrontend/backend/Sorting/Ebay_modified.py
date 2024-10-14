import re
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def clean_price(price_text):
    """Extracts and converts price text to a float, ignoring non-numeric symbols."""
    price = re.sub(r'[^\d.]+', '', price_text)  # Remove non-numeric characters
    try:
        return float(price)
    except ValueError:
        return 0.0

def extract_rating(seller_info_text):
    """Extracts the rating from the seller info text and converts it to a float with 1 decimal."""
    try:
        rating_match = re.search(r'(\d+\.\d+|\d+)%', seller_info_text)  # Find percentage rating
        if rating_match:
            rating_percentage = float(rating_match.group(1))
            star_rating = round(rating_percentage / 20, 1)  # Convert to 5-star scale
        else:
            star_rating = 0.0
        return star_rating
    except Exception as e:
        print(f"Error extracting rating: {e}")
        return 0.0

def search_ebay(search_term):
    """Searches eBay for the given search term and returns product results."""

    # Set up Selenium WebDriver options for Chromium
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--no-sandbox")  # Required for Docker
    chrome_options.add_argument("--disable-dev-shm-usage")  # Handle shared memory issues
    chrome_options.add_argument("--disable-gpu")  # Disable GPU in headless mode
    chrome_options.add_argument("--log-level=3")  # Reduce logging noise

    # Disable image loading to speed up scraping
    prefs = {"profile.managed_default_content_settings.images": 2}
    chrome_options.add_experimental_option("prefs", prefs)

    # Set explicit path for Chromium
    chrome_options.binary_location = "/usr/bin/chromium"

    # Initialize ChromeDriver using Chromium's path
    driver = webdriver.Chrome(
        service=Service("/usr/bin/chromedriver"),
        options=chrome_options
    )

    search_url = f"https://www.ebay.com/sch/i.html?_nkw={search_term}"
    driver.get(search_url)

    try:
        # Wait for product elements to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".s-item"))
        )
    except TimeoutException:
        print("Timeout waiting for page to load or no results.")
        driver.quit()
        return []

    product_data = []
    products = driver.find_elements(By.CSS_SELECTOR, ".s-item")

    for product in products:
        try:
            product_name = product.find_element(By.CSS_SELECTOR, "span[role='heading']").text
            if not product_name:
                continue  # Skip if the product name is not found
        except NoSuchElementException:
            continue

        try:
            price_tag = product.find_element(By.CSS_SELECTOR, "span.s-item__price")
            product_price = clean_price(price_tag.text)  # Clean price text
        except NoSuchElementException:
            product_price = 0.0  # Default to 0 if price is not found

        try:
            shipping_price_tag = product.find_element(By.XPATH, ".//span[contains(text(),'shipping')]")
            shipping_price = clean_price(shipping_price_tag.text)  # Clean shipping price
        except NoSuchElementException:
            shipping_price = 0.0  # Default to 0 if shipping price is not found

        total_price = product_price + shipping_price  # Calculate total price

        try:
            seller_info_tag = product.find_element(By.CSS_SELECTOR, ".s-item__seller-info-text")
            product_rating = extract_rating(seller_info_tag.text)  # Extract rating
        except NoSuchElementException:
            product_rating = 0.0  # Default to 0 if rating is not found

        try:
            product_url = product.find_element(By.CSS_SELECTOR, "a.s-item__link").get_attribute("href")
            if not product_url:
                continue  # Skip if product URL is not found
        except NoSuchElementException:
            continue

        try:
            image_url = product.find_element(By.CSS_SELECTOR, "img").get_attribute("src")
        except NoSuchElementException:
            image_url = "No image available"  # Default if image is not found

        # Store product information in a dictionary
        product_data.append({
            "Name": product_name,
            "Shop": "eBay",
            "Price (THB)": total_price,
            "Rating": product_rating,
            "URL": product_url,
            "Image URL": image_url
        })

    driver.quit()  # Close the browser
    return product_data

# Example usage:
# products = search_ebay("laptop")
# print(json.dumps(products, indent=4))