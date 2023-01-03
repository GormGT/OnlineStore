const express = require('express');
const app = express();
const port = 2007;


//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

app.listen(port, 'localhost', () => {
    console.log(`checking requests on ${port}...`);
});