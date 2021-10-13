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

const jwt = require('jsonwebtoken')

const jwtSecret = 'jag skriver en lång secret som ingen kan gissa'

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
  res.send(`
  <html>
    <body>
      <h1>Dokumentation av det här APIet</h1>
      <h2>Routes</h2>
      <ul>
        <li>🔐<em>GET /users</em> - returnerar alla användare.</li>
        <li>🔐<em>GET /users/{id}</em> - returnerar en user med angivet id eller status 204 om användaren saknas.</li>
        <li>🔐<em>POST /users</em> - skapar en ny användare accepterar JSON objekt på formatet {"username": "unikt namn", "first_name": "", "last_name": ""}. <code>username</code> är obligatoriskt och ska var unikt.</li>
        <li><em>POST /login</em> - för inloggning. Returnerar en JWT som används som bearer token i anrop till routes skyddade med auth. Accepterar JSON objekt på formatet {"username": "", "password": ""}.</li>
      </ul>
      <p>
      🔐 = denna route kräver ett giltigt bearer token i authorization header.
      </p>
    </body>
  </html>`);
});


app.get('/users', function(req, res) {
  console.log(req.headers)

  let authHeader = req.headers.authorization
  let token = authHeader.slice(7)

  console.log('token', token)

  let decoded
  try {
    decoded = jwt.verify(token, jwtSecret)
  } catch (error) {
    console.error(error)
    res.status(401).send('Invalid token')
    return
  }
  console.log('decoded', decoded)

  var sql = "SELECT * FROM users"
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    res.json(result)
  });


});

app.get('/hash', function(req, res) {
  res.send(hash(req.query.str))
});

app.get('/users/:id', function(req, res) {

  var sql = `SELECT * FROM users WHERE id = '${req.params.id}' OR username='${req.params.id}'`

  console.log(sql)
  con.query(sql, function(err, result, fields) {
    if (err) {
      //console.log(err)
      throw err
    }
    //console.log(result)
    if (result && result.length > 0) {
      let user = result[0]
      user.hash = hash(JSON.stringify(user))
      res.json(user)
    } else {
      res.sendStatus(204)
    }
  });
});

app.post('/users', function(req, res) {



  if (isValidUserData(req.body)) {
    let sql = `INSERT INTO users (username, first_name, last_name, password) 
    VALUES ('${req.body.username}', 
    '${req.body.first_name}', 
    '${req.body.last_name}',
    '${hash(req.body.password)}')`

    try {
      con.query(sql, function(err, result, fields) {
        if (err) throw err
        let user = req.body
        user.id = result.insertId
        res.json(user)
      });
    } catch (exception) {
      console.log(exception)
      res.sendStatus(500)
    }

  } else {
    res.sendStatus(422)
  }
})


app.put('/users/:id', function(req, res) {
  console.log('Någon gör PUT på /users/id')
  var sql = `UPDATE users 
    SET last_name= '${req.body.last_name}'
    WHERE id = ${req.params.id}`
  con.query(sql, function(err, result, fields) {
    if (err) {
      console.log(err)
      throw err
    }

    res.sendStatus(200)

  });
});


app.post('/login', function(req, res) {

  var sql = `SELECT * FROM users WHERE username='${req.body.username}'`

  con.query(sql, function(err, result, fields) {
    if (err) throw err

    if (result && result.length > 0) {
      let user = result[0]
      let passwordHash = hash(req.body.password)

      if (user.password === passwordHash) {
        delete user.password
        let tokenPayload = {
          sub: user.id,
          name: user.first_name
        }

        let token = jwt.sign(tokenPayload, jwtSecret)

        res.send(token)

      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  });
});


function isValidUserData(data) {
  return data &&
    data.first_name &&
    data.username &&
    data.username.length > 0 &&
    data.last_name &&
    data.password &&
    data.password.length > 8
}


http.listen(port, function() {
  console.log('Server started. Listening on localhost:' + port);
});