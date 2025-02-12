# Sales Data Fetch and Store Script

This script fetches sales data from an API and stores it in an SQLite database.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [SQLite3](https://www.sqlite.org/)

## Installation

1. Clone this repository or download the script.
2. Open a terminal and navigate to the project directory.
3. Install the required dependencies:
   ```sh
   npm install axios sqlite3
   ```

## Configuration

This script fetches data from an API. Ensure the `API_URL` in the script is correctly set with valid credentials:
```javascript
const API_URL = "http://api.petpooja.com/V1/orders/get_sales_data/?app_key=your_app_key&app_secret=your_app_secret&access_token=your_access_token&restID=your_restaurant_id&from_date=YYYY-MM-DD 00:00:00&to_date=YYYY-MM-DD 23:59:59";
```
Replace `your_app_key`, `your_app_secret`, `your_access_token`, and `your_restaurant_id` with your actual credentials.

## Execution

Run the script using Node.js:
```sh
node script.js
```

## Expected Output
- The script will fetch sales data from the API.
- It will create a database `sales_data.db` if it does not exist.
- It will insert sales data into the `sales_data` table.
- The terminal will display messages indicating whether data insertion was successful or if any errors occurred.

## Database Verification
To verify the data inserted into SQLite, you can use the SQLite command-line tool:

1. Open SQLite in the terminal:
   ```sh
   sqlite3 sales_data.db
   ```
2. View the inserted records:
   ```sh
   SELECT * FROM sales_data;
   ```


