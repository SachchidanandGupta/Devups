const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log("request came");
    res.send("WORKING");
});

app.listen(3000, () => {
    console.log("SERVER STARTED");
});