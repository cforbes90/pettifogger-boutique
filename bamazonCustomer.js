var mysql = require("mysql");
// var config = require("./config");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: config,
    database: "bamazon_db"
});
var userItemID = 0;
var userQuantity = 0;
//var query = ";"
var SQLTableData = {};
var SQLTableDataName = ""
var newTableDataQuantity = 0;
var itemName="";
itemPrice=0;
totalCost=0;

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    checkInventory();
    //buyBuyBuy();
    // connection.end();
});
function checkInventory() {
    console.log("Checking current inventory...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        console.log(SQLTableData);
        buyBuyBuy();
    });
}
function buyBuyBuy() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "What is the ID of the product you want to buy? "
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        }
    ]).then(function (answer) {
        userItemID = answer.itemID;
        userQuantity = answer.quantity;
        for (i = 0; i < SQLTableData.length; i++) {
            if (userItemID == SQLTableData[i].id) {
                userItemID = i;
                console.log(SQLTableData[userItemID]);
            }
        }
        itemName = SQLTableData[userItemID].product_name;
        console.log('Item Name:', itemName,"\n");
        newTableDataQuantity = SQLTableData[userItemID].quantity - userQuantity;
        console.log('Ordered quantity: ', userQuantity,"\n");
        itemPrice=SQLTableData[userItemID].price;
        totalCost=itemPrice*userQuantity;
        if (0>newTableDataQuantity){
            console.log("\n","Sorry! Insufficient quantity of reserves! Your order needs to be reduced!"); 
        }else updateProduct();
    });
};
function updateProduct() {
    console.log("Updating "+ itemName + " quantities...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: newTableDataQuantity
            },
            {
                product_name: itemName
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("This order costs a total of $"+totalCost+". Will that be cash or credit?","\n");
            //console.log(res.affectedRows + " products updated!\n");
            connection.end();
            
        }
    );
}

//userItemID+1
    // function checkCheckCheck() {
    //    // var query = "SELECT * FROM products top5000 WHERE ?";
    //    // connection.query(query, { artist: answer.artist }
    //      console.log("Checking current inventory...", "\n");
    //     connection.query("SELECT * FROM products", function (err, res) {
    //         if (err) throw err;
    //         // Log all results of the SELECT statement
    //         console.log(res);
    //         connection.end();
    //     });
    // };

    // function buyBuyBuy() {

    // };
//Run a check against SQL database for sufficent quantity. If not, display a message