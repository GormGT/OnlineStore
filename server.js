const express = require('express');
const { render } = require('ejs');
const app = express();
const port = 2007;

//register view engine
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/html'));

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname})
})

app.listen(port, 'localhost', () => {
    console.log(`checking requests on ${port}...`);
});

/*app.use((req, res) => {
    res.status(404).render('html/404', {title: '404'});
})*/