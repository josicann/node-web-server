const hbs = require('hbs');
const express = require('express');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeText : "welcome home",
    }); 
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About page",
    });    
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request',
    });    
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});