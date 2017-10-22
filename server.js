const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      throw err;
    }
  });
  next();
})

app.get('/', (req, res) => {
  res.render('index', {
    name: "Sajid",
    currentYear: new Date().getFullYear(),
    likes: [
      'Gaming',
      'Watching Training videos'
    ]
  });
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.get('/bad', (req, res) => {
  res.send({
    error: "Page not found"
  })
})

app.listen(port, () => {
  console.log("Server is up on port 3000");
});