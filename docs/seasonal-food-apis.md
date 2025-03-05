# Seasonal Food APIs

## Free Public APIs

1. **Open Food Facts API**
   - URL: https://world.openfoodfacts.org/data
   - Documentation: https://openfoodfacts.github.io/api-documentation/
   - Features: Comprehensive food database with nutritional information
   - Notes: Not specifically seasonal, but can be filtered by region/country

2. **USDA FoodData Central API**
   - URL: https://fdc.nal.usda.gov/api-guide.html
   - Features: Nutritional information for foods
   - Authentication: Requires free API key
   - Notes: Can be combined with seasonal information from other sources

3. **The Meal DB API**
   - URL: https://www.themealdb.com/api.php
   - Features: Recipe database that can be filtered by ingredients
   - Pricing: Free tier available

4. **Spoonacular API**
   - URL: https://spoonacular.com/food-api
   - Features: Food information, recipes, ingredient analysis
   - Authentication: Requires API key
   - Pricing: Free tier with 150 requests/day

5. **Edamam Food Database API**
   - URL: https://developer.edamam.com/food-database-api
   - Features: Food database with nutritional information
   - Pricing: Free tier available with limited requests

## Specialized Seasonal Food APIs

1. **Seasonal Food Guide API**
   - URL: https://www.seasonalfoodguide.org/api-documentation
   - Features: Specifically designed for seasonal food information by region
   - Notes: Contact for access

2. **Local Harvest API**
   - URL: https://www.localharvest.org/api/
   - Features: Information on local farms, farmers markets, and CSAs

## Alternative Approaches

1. **Create a Custom Dataset**:
   - Compile seasonal food information from agriculture departments
   - Store in a structured JSON format
   - Host in a public GitHub repository or JSON server

2. **Web Scraping with Permission**:
   - Scrape seasonal food information from sites like Seasonal Food Guide
   - Store data on your server and refresh periodically
   - Always get permission before scraping

3. **Use Google Sheets as API**:
   - Create a collaborative spreadsheet with seasonal food data
   - Publish as CSV or use the Google Sheets API
   - Example: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv`

4. **Create a Supabase Backend**:
   - Use Supabase (https://supabase.com/) for a free PostgreSQL database
   - Store seasonal food data with region information
   - Access via their REST API

## Implementation Notes

When integrating any of these APIs:

1. **Caching**: Seasonal food data doesn't change frequently, so implement aggressive caching (days or weeks)
2. **Fallback**: Always maintain a local copy of data for offline functionality
3. **Data Transformation**: Create adapter functions to normalize different API formats to your application structure
4. **Rate Limiting**: Implement rate limiting to avoid exceeding API quotas
5. **Error Handling**: Add robust error handling for API downtime