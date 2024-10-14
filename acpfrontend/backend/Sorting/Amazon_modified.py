import requests

# Define the URL of the GraphQL endpoint
url = 'https://graphql.canopyapi.co/'

# GraphQL query to fetch search results for a specific page
search_query = """
query amazonProduct($searchTerm: String!) {
  amazonProductSearchResults(input: {searchTerm: $searchTerm, domain: US}) {
    productResults {
      results {
        title
        rating
        price {
          value  # Using 'value' directly to avoid string conversion
        }
        url
        mainImageUrl
      }
    }
  }
}
"""

# Conversion rate from USD to THB
conversion_rate_usd_to_thb = 36  # 1 USD = 36 THB

# Headers containing your API key
headers = {
    'Content-Type': 'application/json',
    'API-KEY': '1e79b09f-8bca-47bc-8503-79548fc8671b',  # Replace with your Canopy API key
}

def fetch_search_results(search_term):
    # Set the search term for the query
    variables = {'searchTerm': search_term}

    # Define the request payload for the search query
    payload = {'query': search_query, 'variables': variables}

    try:
        # Send the POST request to fetch search results for page 1
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad HTTP status codes

        # Parse the JSON response
        data = response.json()
        results = data.get('data', {}).get('amazonProductSearchResults', {}).get('productResults', {}).get('results', [])

        # Return results or empty list if no valid results are found
        return results if results else []
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []  # Return empty list on exception

def search_amazon(search_term):
    # Fetch search results from page 1 only
    results = fetch_search_results(search_term)

    if results:
        # Format the search results and convert price to THB using 'value' directly
        formatted_results = []
        for result in results:
            if result and isinstance(result, dict):  # Check if result is a valid dictionary
                # Safely check if 'price' and 'value' exist
                price_value = None
                if result.get('price') and 'value' in result['price']:
                    price_value = result['price']['value']  # Extract price value

                # Convert price to THB if price_value is available
                price_in_thb = round(price_value * conversion_rate_usd_to_thb, 2) if price_value else None

                formatted_results.append({
                    "Name": result.get('title', 'N/A'),
                    "Shop": "Amazon",
                    "Price (THB)": price_in_thb,
                    "Rating": result.get('rating', 0.0),  # Default to 0.0 if rating is missing
                    "URL": result.get('url', 'N/A'),
                    "Image URL": result.get('mainImageUrl', 'N/A')
                })

        # Return the formatted results as a list
        return formatted_results
    else:
        return []  # Return empty list if no products found

# Now you can call the `get_search_results` function to get the results as a list
# Example:
# search_term = "laptop"
# results = get_search_results(search_term)
# print(results)  # This will output the list of product details