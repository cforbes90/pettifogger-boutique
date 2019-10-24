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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    choiceMenu();
    // connection.end();
});
var userItemID = 0;
var userQuantity = 0;
//var query = ";"
var SQLTableData = {};
var SQLTableDataName = ""
var newTableDataQuantity = 0;
var itemName="";

function choiceMenu() {
    inquirer
        .prompt({
            name: "pathDecider",
            type: "list",
            message: "You want to see.....?",
            choices: ["1. View Products for Sale",
                "2. View Low Inventory",
                "3. Add to Inventory",
                "4. Add New Product"]
        })
        .then(function (answer) {
            console.log('answer:', answer)
            console.log('answer path decider is:', answer.pathDecider);
            var userPick = answer.pathDecider;
            switch (userPick) {
                case "1. View Products for Sale":
                    console.log("You made it to the first option!");
                    itemsForSale();
                    break;
                case "2. View Low Inventory":
                    console.log("You made it to the first option!");
                    break;
                case "3. Add to Inventory":
                    console.log("You made it to the first option!");
                    break;
                case "4. Add New Product":
                    console.log("You made it to the first option!");
                    break;
                default:
                    console.log("The switch state ment is broken!");

            }


            // if (userPick == '1. View Products for Sale') {
            //     console.log("You made it to the first option!");
            //     console.log("In like Flynn!")
            //     getSongsFromOneArtist();
            // } if (userPick == '2. View Low Inventory') {
            //     console.log("You made it to the second option!");
            // }
            // if (userPick == '3. Add to Inventory') {
            //     console.log("You made it to the third option!");
            // }
            // if (userPick == '4. Add New Product') {
            //     console.log("You made it to the fourth option!");
            // }

            // based on their answer, either call the bid or the post functions
            // if (answer.postOrBid === "POST") {
            //   postAuction();
            // }
            // else if(answer.postOrBid === "BID") {
            //   bidAuction();
            // } else{
            //   connection.end();
            // }
        });
};
function itemsForSale() {
    console.log("Checking current inventory...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        console.log(SQLTableData);
    });
}