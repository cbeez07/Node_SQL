const mysql = require("mysql");
const prompt = require("prompt");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

let startProducts = () => {
    console.log("Welcome to Bamazon\n");
    connection.query("SELECT item_id, product_name, price FROM products", function(err, resA) {
        if (err) throw err;
        resA.forEach(function(item, index){
            console.log(`Item ID: ${item.item_id} | Product Name: ${item.product_name} | Price: $${item.price}`);
            
        });
        console.log("Select an Item by ID(ex 1) you would like to buy.");
        prompt.get(["itemID", "amount"], (err1, resB) => {
            quantityCheck(resB.itemID, resB.amount);
        })
        
    });
}

let quantityCheck = (itemID, amount) => {
    
    connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        {
            item_id: itemID
        },
        function(err, resC) {
                        
            if (parseInt(amount) > resC[0].stock_quantity) {
                console.log("Insufficient quantity!");
                startProducts();
            } else {
                customerOrder(itemID, amount);
            }
        }
    );    
}

let customerOrder = (itemID, amount) => {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [
            amount, itemID
        ],
        function(err, resD) {
            totalCost(itemID, amount);
            
        }
    );
}

let totalCost = (itemID, amount) => {
    connection.query(
        "SELECT price FROM products WHERE item_id = ?", 
        [
            itemID
        ],
        function(err, resE) {

            let cost = resE[0].price * amount;
            console.log(`Your total cost is $${cost} \nThank you for shopping at Bamazon!`);
            
            connection.end();
        }
    )
}
startProducts();