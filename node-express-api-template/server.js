/*
Denna kod kommer vi används lite längre fram.
*/
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "192.168.64.3",
  user: "username",
  password: "password",
  database: "restapi"
});

con.connect(function(err) { // anslut till databasen
  if (err) throw err;
  console.log("Connected");
});


var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 5000

const crypto = require('crypto'); //använder NodeJS inbyggda krypteringsfunktioner.
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

/*
 Funktion som tar någon form av indata, t.ex. ett lösenord i klartext,
 hashar det och returnerar hashvärdet som en sträng.
*/
function hash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex')
}


app.use(express.json())

app.get('/', function(req, res) {
  //Metoden res.send() skickar ett response och försöker lista ut vad det innehåller. 
  //Du kan använda res.sendFile() istället om du vill skicka en HTML-sida
  res.send(`<html><body><h1>Dokumentation av det här APIet</h1></body></html>`);
});

/*
  Det här definerar en route /hello och vad som ska göras om den anropas med GET.

  Om någon anropar den med query-parametrar så hamnar de i req.query
*/
app.get('/hello', function(req, res) {
  //Metoden res.json() skickar ett svar som JSON.
  res.send(req.query)
});

app.get('/users', function(req, res) {
  var sql = "SELECT * FROM users"
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    res.json(result)
  });
});

app.get('/users/:id', function(req, res) {
  var sql = `SELECT * FROM users WHERE id = '${req.params.id}' OR username='${req.params.id}'`
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    if (result && result.length > 0) {
      delete result[0].password
      res.json(result[0])
    } else {
      res.sendStatus(204) // No content
    }
  });
});

app.post('/users', function(req, res) {

  var sql = `INSERT INTO users (username, first_name, last_name, password) 
  VALUES ('${req.body.username}', 
  '${req.body.first_name}', 
  '${req.body.last_name}',
  '${hash(req.body.password)}')`

  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    let user = req.body
    user.id = result.insertId
    res.json(user)
  })
})


app.post('/login', function(req, res) {
  var sql = `SELECT * FROM users WHERE username='${req.body.username}'`
  con.query(sql, function(err, result, fields) {
    if (err) throw err;

    if (result && result.length > 0) {
      let user = result[0]
      let passwordHash = hash(req.body.password)
      if (passwordHash === user.password) {
        //Denna kod skapar en token att returnera till anroparen.
        let payload = {
          sub: user.id,
          name: user.first_name
        }
        let token = jwt.sign(payload, 'secret of secrets')
        res.send(token)
      } else {
        //Användaren hittades men felaktigt lösenord, returnera 401 Unauthorized
        res.sendStatus(401)
      }
    } else {
      //Användaren hittades inte, returnera 401 Unauthorized
      res.sendStatus(401)
    }
  });
});

app.get('/auth', function(req, res) {

  let authHeader = req.headers['authorization']
  if (authHeader === undefined) {
    res.status(401).send('Authorization header required.')
  }
  let token = authHeader.slice(7) // tar bort "BEARER " från headern.
  let decoded
  try {
    decoded = jwt.verify(token, 'secret of secrets')
  } catch (err) {
    console.log(err)
    res.status(401).send('Invalid auth token')
  }

  //Gör något bra med decoded.


})

app.put('/users/:id', function(req, res) {
  let sql = `UPDATE users
  SET last_name = '${req.body.last_name}',
    first_name = '${req.body.first_name}',
    username = '${req.body.username}'
  WHERE id = ${req.params.id}`

  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    res.sendStatus(200) //All OK
  })
})

/*
con.query(sql, function(err, result, fields) {
    if (err) throw err;
    console.log(result)
    if (result) {
      res.json(result)
    } else {
      res.json([])
    }
  });
*/

http.listen(port, function() {
  console.log('Server started. Listening on localhost:' + port);
});