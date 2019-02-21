const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')
const {
  base64decode
} = require('nodejs-base64');


const cors = require("cors");


app.use(cors());

// custom basic authentication
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authBase64 = req.headers['authorization'].split(' ');
    const userPass = base64decode(authBase64[1]);
    const user = userPass.split(':')[0];
    const pass = userPass.split(':')[1];

    //
    if (user === 'ronald' && pass == '123') {
      next();
      return;
    }

    res.status(401);
    res.send({
      error: "Sin permiso "
    });
    return;
  }
});


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/students'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

