const express = require('express')
const app = require('express')()
const port = 3000

app.use('/css', express.static('css'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// Den här raden gör att express servar alla filer i katalogen
// css så att webbläsaren kan hämta dem som "css/<filnamn>"
// app.use('/css', express.static('css'))

/*
app.get('/rick', function(req, res) {
  res.send(`<html><body>
  <iframe width="1120" height="630" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </body></head>`);
});
*/
/*
app.get('/log', function(req, res) {
  console.log('Loggar det här anropet')
  res.send('Ok')
});
*/