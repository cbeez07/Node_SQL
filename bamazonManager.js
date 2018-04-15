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

let managerMenu = () => {
    console.log('Manager Menu \n1: View Products for Sale \n2: View Low Inventory \n3: Add to Inventory \n4: Add New Product \n5: Exit');
    prompt.get(['userPick'], (err1, resA) => {
        
        if (resA.userPick == 1) {
            viewProducts();
        } else if (resA.userPick == 2) {
            viewLowProducts();
        } else if (resA.userPick == 3) {
            addInventory();
        } else if (resA.userPick == 4) {
            addNewProduct();
        } else if (resA.userPick == 5) {
            connection.end()
        } else {
            console.log('Please choose one of the listed numbers.');
            managerMenu(); 
        }
    });
}

let viewProducts = () => {
    console.log('View Products for Sale:');
    connection.query("SELECT * FROM products", function(err, resB) {
        if (err) throw err;
        resB.forEach(function(item, index){
            console.log(`Item ID - ${item.item_id} : Product Name - ${item.product_name} : Department Name - ${item.department_name} : Price - $${item.price} : Stock Quantity - ${item.stock_quantity}`);
            
        });
        
    })
    setTimeout(managerMenu, 200); 
}

let viewLowProducts = () => {
    console.log("View Low Inventory");
    connection.query("SELECT * FROM products", function(err, resC) {
        if (err) throw err;

        resC.forEach(function(item, index){
            let count = 0;
            if (item.stock_quantity < 5) {
                console.log(`Item ID - ${item.item_id} : Product Name - ${item.product_name} : Department Name - ${item.department_name} : Price - $${item.price} : Stock Quantity - ${item.stock_quantity}`);  
            } else {
                count++;
                if (count === index.length) {
                    console.log('You do not have any low inventory');
                    
                }
            }
                
            
                
            
        });
            
        
    })
    setTimeout(managerMenu, 200); 
    }

let addInventory = () => {
    displayInventory();
    setTimeout(addToInventory, 200);
}

let displayInventory = () => {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, resD) {
        if (err) throw err;
        resD.forEach(function(item, index){
            console.log(`Item ID: ${item.item_id} | Product Name: ${item.product_name} | Quantity: ${item.stock_quantity}`);
        })
    });
}
let addToInventory = () => {
    console.log("Please select the ID number and the Amount you would like to add to the inventory!\n");
    prompt.get(["itemID", "amount"], (err1, resE) => {
        
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
        [
            resE.amount, resE.itemID
        ],
        function(err, resF) {
            displayInventory();
            setTimeout(questionAddInventory, 200);
        })
    });
}
let questionAddInventory = () => {
    console.log("Would you like to add more inventory?");
    prompt.get(["YesOrNo"], (err1, resG) => {
        if (resG.YesOrNo == 'yes') {
            addToInventory();
        } else {
            setTimeout(managerMenu, 200); 
        }
    });
}

let addNewProduct = () => {
    console.log('Add a new product...');
    prompt.get(['productName', 'department', 'price', 'quantity'], (err1, resH) => {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
            [
                resH.productName, resH.department, resH.price, resH.quantity
            ],
            function(err, resI) {
                console.log("Would you like to add more products?");
                prompt.get(["YesOrNo"], (err1, resJ) => {
                    if (resJ.YesOrNo == 'yes') {
                        addNewProduct();
                    } else {
                        setTimeout(managerMenu, 200); 
                    }
                });
            }
        )
    })
}
managerMenu();