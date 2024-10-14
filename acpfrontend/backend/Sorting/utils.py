import json
import os

# Utility to construct paths based on the current file location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'Data')

def save_combined_results(combined_results):
    """Saves combined results to Combine_result.json."""
    file_path = os.path.join(DATA_DIR, 'Combine_result.json')
    try:
        with open(file_path, 'w') as f:
            json.dump(combined_results, f, ensure_ascii=False, indent=4)
        print(f"Successfully saved combined results to {file_path}")
    except Exception as e:
        print(f"Error saving combined results to {file_path}: {e}")

def load_combined_results():
    """Loads combined results from Combine_result.json."""
    file_path = os.path.join(DATA_DIR, 'Combine_result.json')
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            print(f"Loaded {len(data)} products from {file_path}")  # Debugging log
            return data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from {file_path}: {e}")
        return []

def process_results(products):
    """Filters out invalid products (e.g., None values for price or rating)."""
    valid_products = [product for product in products if is_valid_product(product)]
    print(f"Filtered valid products: {len(valid_products)}")  # Debugging log
    return valid_products

def is_valid_product(product):
    """Validates if a product has valid price and rating."""
    return (
        product.get('Price (THB)') is not None and
        product.get('Rating') is not None and
        isinstance(product.get('Price (THB)'), (int, float)) and
        isinstance(product.get('Rating'), (int, float))
    )

def sort_by_criteria(products, criteria):
    """Sorts products based on the given criteria."""
    valid_products = process_results(products)

    if criteria == "price_desc":
        return sorted(valid_products, key=lambda x: x['Price (THB)'], reverse=True)
    elif criteria == "price_asc":
        return sorted(valid_products, key=lambda x: x['Price (THB)'])
    elif criteria == "rating_desc":
        return sorted(valid_products, key=lambda x: x['Rating'], reverse=True)
    elif criteria == "rating_asc":
        return sorted(valid_products, key=lambda x: x['Rating'])
    elif criteria == "name_asc":
        return sorted(valid_products, key=lambda x: x['Name'])
    elif criteria == "name_desc":
        return sorted(valid_products, key=lambda x: x['Name'], reverse=True)

    print(f"Unknown sorting criteria: {criteria}. Returning unsorted list.")
    return valid_products  # Return unsorted if criteria is invalid