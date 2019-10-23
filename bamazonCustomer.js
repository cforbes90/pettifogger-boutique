var mysql = require("mysql");

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
    checkInventory();
});

function checkInventory() {
    console.log("Checking current inventory...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}

//needs to ask for id of product and how many units they would like to buy
inquirer.prompt([
    {
        name: "charGuessed",
        message: "Pick a letter!"
    }
]).then(function (answer) {
    computerWord.subtractGuesses();
    userGuess = answer.charGuessed;
    
});

//Run a check against SQL database for sufficent quantity. If not, display a message