const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});