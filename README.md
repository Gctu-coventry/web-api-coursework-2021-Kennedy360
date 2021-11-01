Firsttly Unzip node_modules.zip into the node_modules folder
node_modules.zip loctated in the node_modules folder

## Fras
A Payment Gateway built with Vanilla Node.js and MongoDB as a School Coursework

To use, please create a database called "MagPay".
Then, to have user login, please a collection called "users" need to be created in the database.
And a "username" field needs to contain "Saviour" and "password" field with data as "Fras".

```
use MagPay;
db.createCollection("users);
db.users.insertOne({"username":"Saviour", "password":"Fras"});
```
db.createCollection("banks");
db.banks.insertOne({"bin" : 24242, "bank_name" : "GCB" });

Use http://localhost:5000/fras/school/home as the address. this is for home page

that should get you started. Admin dashboard link is in index file. its http://localhost:5000/fras/login 

Enter the details in the box and use card number.
4242424242424243
Exp.... 5
Exp.Year.....22
Cvv......345
