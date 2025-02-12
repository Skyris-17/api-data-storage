const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

// API Endpoint
const API_URL = "http://api.petpooja.com/V1/orders/get_sales_data/?app_key=srd2neaq1xg7bzc6uyk5jmwv98o4tpfh&app_secret=fd08934c5224af4c975015e599d60a74bf857b4a&access_token=0442e1ee9899bc3806f1a40be490af4ec5c6602a&restID=51wok2zxnsad&from_date=2025-01-20 00:00:00&to_date=2025-01-20 23:59:59";
// Connect to SQLite Database
const db = new sqlite3.Database("sales_data.db", (err) => {
  if (err) console.error("Error opening database:", err);
  else console.log("Connected to SQLite database");
});

// Create Table if it doesn't exist
db.run(
    `CREATE TABLE IF NOT EXISTS sales_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      receipt_number TEXT,
      sale_date TEXT,
      transaction_time TEXT,
      sale_amount REAL,
      tax_amount REAL,
      discount_amount REAL,
      round_off REAL,
      net_sale REAL,
      payment_mode TEXT,
      order_type TEXT,
      transaction_status TEXT
    )`,
    (err) => {
      if (err) console.error("Error creating table:", err);
    }
  );

// Function to Fetch and Store Sales Data
const fetchAndStoreSalesData = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log(response);
    // const salesData = response.data; // Assuming the API returns an array of objects
    const salesData = response.data?.Records || [];
    console.log(salesData);
    if (!Array.isArray(salesData)) {
      console.error("Invalid data format");
      return;
    }

    // Prepare insert statement
    const insertStmt = db.prepare(
        `INSERT INTO sales_data 
          (receipt_number, sale_date, transaction_time, sale_amount, tax_amount, discount_amount, round_off, net_sale, payment_mode, order_type, transaction_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      
      salesData.forEach((sale) => {
        insertStmt.run(
          sale["Receipt number"], // Match the exact key names from salesData
          sale["Receipt Date"],
          sale["Transaction Time"],
          parseFloat(sale["Invoice amount"]), // Ensure proper number format
          parseFloat(sale["Tax amount"]),
          parseFloat(sale["Discount amount"]),
          parseFloat(sale["Round Off"] || 0), // Default to 0 if missing
          parseFloat(sale["Net sale"]),
          sale["Payment Mode"],
          sale["Order Type"],
          sale["Transaction status"]
        );
      });
      
      insertStmt.finalize();
    console.log("Sales data inserted successfully");

  } catch (error) {
    console.error("Error fetching sales data:", error.message);
  } finally {
    db.close();
  }
};

// Run the function
fetchAndStoreSalesData();