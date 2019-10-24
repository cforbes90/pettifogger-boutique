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
    password: "Mohabir24",
    database: "bamazon_db"
});
var userItemID = 0;
var userQuantity = 0;
//var query = ";"
var SQLTableData = {};
var SQLTableDataName = ""
var newTableDataQuantity = 0;

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
        x = 1;
        // Log all results of the SELECT statement
        SQLTableData = res;
        console.log(SQLTableData);
        // console.log('SQLTableData 0:', SQLTableData[0]);
        console.log("Getting id of  first one")
        console.log(SQLTableData[0].id);

        console.log("Above should be id of first one")
        if (x == SQLTableData[0].id) {
            console.log("the data is an integer");
        } else {
            console.log("It must be a string");
        }
        // console.log(SQLTableData[0].quantity);
        // console.log(SQLTableData[0].product_name);
        // SQLTableDataName=SQLTableData[0].product_name;
        // console.log('SQLTableDataName:', SQLTableDataName)
        // console.log("Hopefully there is a response above!!");
        // console.log('SQLTableData 1:', SQLTableData[1]);
        buyBuyBuy();
        // connection.end();
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
        //console.log(answer);
        userItemID = answer.itemID;
        userQuantity = answer.quantity;
        console.log('itemID:', userItemID)
        console.log("Below is the object belonging to that ID")
        console.log(SQLTableData[userItemID]);
       // console.log('SQLTableData length:', SQLTableData.length);
        console.log("Above should be the item you selected");
        console.log('itemID before loop:', userItemID);

        for (i = 0; i < SQLTableData.length; i++) {
            //var b = i + 1;
            if (userItemID == SQLTableData[i].id) {
                //console.log('SQLTableData inside the if statement of the loop:', SQLTableData);
                userItemID = i;
                // itemID=SQLTableData[i].id;
                // console.log("Where are we now? We used 1");
                //userItemID = placeholder;
                console.log("We are right above the table data being targed with itemID");
                console.log(SQLTableData[userItemID]);
                console.log("We are right below the table data being targed with itemID");

            }
            //console.log('This should be a countup', SQLTableData[i].id);

        }
        console.log('itemID after loop', userItemID);
        //console.log('quantity:', userQuantity)

        //console.log('itemID:', itemID);
        itemName = SQLTableData[userItemID].product_name;
        console.log('itemName:', itemName);
        newTableDataQuantity = SQLTableData[userItemID].quantity - userQuantity;
        console.log('newTableDataQuantity:', newTableDataQuantity);

    });


};
//needs to ask for id of product and how many units they would like to buy
// function askAskAsk() {

//     inquirer.prompt([
//         {
//             name: "itemID",
//             message: "What is the ID of the product you want to buy? ",

//             name: "quantity",
//             message: "How many would you like?"
//         }
//     ]).then(function (answer) {
//         console.log(answer);
//         quantity = answer.quantity;
//         itemID = answer.itemID;
//     });

// }

// function updateProduct() {
//     console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 quantity: 100
//             },
//             {
//                 flavor: "Rocky Road"
//             }
//         ],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products updated!\n");
//             // Call deleteProduct AFTER the UPDATE completes
//             deleteProduct();
//         }
//     );
// }
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