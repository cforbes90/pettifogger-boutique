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
var itemName = "";
var lowInventoryArr = [];

function choiceMenu() {
    inquirer
        .prompt({
            name: "pathDecider",
            type: "list",
            message: "You want to see.....?",
            choices: ["1. View Products for Sale",
                "2. View Low Inventory",
                "3. Add to Inventory",
                "4. Add New Product",
                "5. Delete A Product"
            ]
        })
        .then(function (answer) {
            //console.log('answer:', answer)
            //console.log('answer path decider is:', answer.pathDecider);
            var userPick = answer.pathDecider;
            switch (userPick) {
                case "1. View Products for Sale":
                    console.log("\n");
                    //console.log("You made it to the first option!");
                    itemsForSale();
                    break;
                case "2. View Low Inventory":
                    //console.log("You made it to the second option!");
                    lowInventory();
                    break;
                case "3. Add to Inventory":
                    console.log("\n");
                    addToInventory();
                    break;
                case "4. Add New Product":
                    console.log("\n");
                    //console.log("You made it to the fourth option!");
                    addNewProduct();
                    break;
                case "5. Delete A Product":
                    console.log("\n");
                    deleteProduct();
                    break;
                default:
                    console.log("The switch statement is broken!");
            }
        });
};
function itemsForSale() {
    console.log("Checking current inventory...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        console.log(SQLTableData);
        console.log("\n");
        console.log("Done!");
        //connection.end();

    });
}
function lowInventory() {
    console.log("Checking current inventory...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        // console.log('SQLTableData:', SQLTableData)
        for (i = 0; i < SQLTableData.length; i++) {
            //console.log('SQLTableData[' + i + ']', SQLTableData[i])
            if (parseInt(SQLTableData[i].quantity) < 5) {
                lowInventoryArr.push(SQLTableData[i]);
                // console.log("The following are the product names")
                // console.log(SQLTableData[i].product_name);
            }
        }
        //console.log(SQLTableData);
        console.log("\n");
        console.log("The following items need more Inventory");
        console.log(lowInventoryArr);
    });
}
function addToInventory() {
    itemsForSaleWithBuy();
}

function buyBuyBuy() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "What is the ID of the product that needs more inventory?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much needs to be added?"
        }
    ]).then(function (answer) {
        userItemID = answer.itemID;
        userQuantity = answer.quantity;
        console.log('userQuantity:', userQuantity)
        for (i = 0; i < SQLTableData.length; i++) {
            if (userItemID == SQLTableData[i].id) {
                userItemID = i;
                console.log(SQLTableData[userItemID]);
            }
        }
        itemName = SQLTableData[userItemID].product_name;
        console.log("\n");
        console.log('Item Name:', itemName, "\n");
        var placeHolder = SQLTableData[userItemID].quantity
        //console.log('placeHolder:', placeHolder)

        newTableDataQuantity = parseInt(placeHolder) + parseInt(userQuantity);
        //console.log('newTableDataQuantity:', newTableDataQuantity)
        console.log("\n");
        console.log('Ordered quantity: ', userQuantity, "\n");
        itemPrice = SQLTableData[userItemID].price;
        totalCost = itemPrice * userQuantity;
        updateProduct();
    });
};

function updateProduct() {
    console.log("\n");
    console.log("Updating " + itemName + " quantities...\n");
    console.log("This order costs a total of $" + totalCost + "!", "\n");
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
            //console.log(res.affectedRows + " products updated!\n");
            //console.log("The following shows your quantity change");
            //console.log(SQLTableData[userItemID])
            //connection.end();
        }
    );
    checkInventory();
}
function itemsForSaleWithBuy() {
    console.log("Checking current inventory(fromitemssalebuy)...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        console.log(SQLTableData);
        buyBuyBuy();
    });
}

function checkInventory() {
    //console.log("Checking current inventory(fromsql)...", "\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        SQLTableData = res;
        console.log("The new amounts are reflected below.");
        console.log(SQLTableData[userItemID]);
    });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "itemName",
                type: "input",
                message: "What is the name of the item you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "In which department does this item belong?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the selling price of this item?",
                // validate: function (value) {
                //     if (!isNaN(value) === true) {
                //         return true;
                //     }
                //     return false;
                // }
            },
            {
                name: "stock",
                type: "input",
                message: "What is the starting inventory amount?"
            },
        ])
        .then(function (answer) {
            console.log('answer:', answer)
            var price = parseInt(answer.price);
            var stock = parseInt(answer.stock);
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.itemName,
                    departmnet_name: answer.department,
                    price: price,
                    quantity: stock
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was added successfully!");
                    // re-prompt the user for if they want to bid or post

                }
            );
        });
}
function deleteProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the product that you wish to COMPLETELY delete?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What is its current quantity?"
        }
    ]).then(function (answer) {
        console.log("Deleting all " + answer.name + "...", "\n");

        connection.query(
            //This is difficult to do on purpose.
            "DELETE FROM products WHERE ?",
            {
                product_name: answer.name,
                quantity: answer.quantity
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products deleted!\n");
            }
        );
    })
}