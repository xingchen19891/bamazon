var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
function displayAllItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
  });
}


// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "what to buy",
      type: "input",
      message: "Which one you want to buy",
      validate: validateInput,
      filter: Number
    })
    .then(function(input) {
      // console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);
  
      var item = input.item_id;
      var quantity = input.quantity;
  
      // Query db to confirm that the given item ID exists in the desired quantity
      var queryStr = 'SELECT * FROM products WHERE ?';
  
      connection.query(queryStr, {item_id: item}, function(err, data) {
        if (err) throw err;
  
        // If the user has selected an invalid item ID, data attay will be empty
        // console.log('data = ' + JSON.stringify(data));
  
        if (data.length === 0) {
          console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
          displayInventory();
  
        } else {
          var productData = data[0];
  
          // console.log('productData = ' + JSON.stringify(productData));
          // console.log('productData.stock_quantity = ' + productData.stock_quantity);
  
          // If the quantity requested by the user is in stock
          if (quantity <= productData.stock_quantity) {
            console.log('Congratulations, the product you requested is in stock! Placing order!');
  
            // Construct the updating query string
            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
            // console.log('updateQueryStr = ' + updateQueryStr);
  
            // Update the inventory
            connection.query(updateQueryStr, function(err, data) {
              if (err) throw err;
  
              console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
              console.log('Thank you for shopping with us!');
              console.log("\n---------------------------------------------------------------------\n");
  
              // End the database connection
              connection.end();
            })
          } else {
            console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
            console.log('Please modify your order.');
            console.log("\n---------------------------------------------------------------------\n");
  
            displayInventory();
          }
        }
      })
    })
  }
  
  // displayInventory will retrieve the current inventory from the database and output it to the console
  function displayInventory() {
    // console.log('___ENTER displayInventory___');
  
    // Construct the db query string
    queryStr = 'SELECT * FROM products';
  
    // Make the db query
    connection.query(queryStr, function(err, data) {
      if (err) throw err;
  
      console.log('Existing Inventory: ');
      console.log('...................\n');
  
      var strOut = '';
      for (var i = 0; i < data.length; i++) {
        strOut = '';
        strOut += 'Item ID: ' + data[i].item_id + '  //  ';
        strOut += 'Product Name: ' + data[i].product_name + '  //  ';
        strOut += 'Department: ' + data[i].department_name + '  //  ';
        strOut += 'Price: $' + data[i].price + '\n';
  
        console.log(strOut);
      }
  
        console.log("---------------------------------------------------------------------\n");
  
        //Prompt the user for item/quantity they would like to purchase
        promptUserPurchase();
    })
  }
  
  // runBamazon will execute the main application logic
  function runBamazon() {
    // console.log('___ENTER runBamazon___');
  
    // Display the available inventory
    displayAllItems();
  }
  
  // Run the application logic
  runBamazon();
  