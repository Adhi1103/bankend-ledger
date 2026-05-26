const express = require('express');
const app = express();
const authRoute = require('./routes/auth.routes');
const accountRoute = require('./routes/account.routes');
const transactionRoute = require('./routes/transaction.routes');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/accounts", accountRoute); 
app.use("/api/transactions", transactionRoute);



app.get("/", (req, res) => {
    res.send("Welcome to the Bank API");
});

module.exports = app;