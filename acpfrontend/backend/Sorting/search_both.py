import json
import os
from .utils import sort_by_criteria
from .Amazon_modified import search_amazon
from .Ebay_modified import search_ebay

# Path configuration to avoid hardcoding
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'Data')

def filter_results(products):
    """Filter out products with null price, null rating, or price = 0."""
    return [
        product for product in products
        if product.get('Price (THB)') not in [None, 0] and product.get('Rating') is not None
    ]

def save_to_json(data, filename):
    """Save data to JSON file."""
    try:
        file_path = os.path.join(DATA_DIR, filename)
        with open(file_path, "w") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Saved data to {filename}")
    except Exception as e:
        print(f"Error saving {filename}: {str(e)}")

def search_both(search_term, criteria="price_desc"):
    """Searches both Amazon and eBay for products and returns the sorted results."""
    try:
        print(f"Searching for: {search_term}")  # Debugging

        # Call both search functions
        amazon_results = search_amazon(search_term)
        ebay_results = search_ebay(search_term)

        print(f"Amazon results: {len(amazon_results)}, eBay results: {len(ebay_results)}")  # Debugging

        # Combine and filter results
        combined_results = amazon_results + ebay_results
        filtered_results = filter_results(combined_results)

        if not filtered_results:
            print("No valid products found after filtering.")  # Debugging

        # Sort the filtered results based on the given criteria
        sorted_results = sort_by_criteria(filtered_results, criteria)

        # Save both combined and sorted results to JSON
        save_to_json(filtered_results, 'Combine_result.json')
        save_to_json(sorted_results, 'sorted_result.json')

        return sorted_results

    except Exception as e:
        print(f"Error in search_both: {str(e)}")  # Debugging
        raise

# Example function call for testing
# result = search_both("Bayern", "price_desc")