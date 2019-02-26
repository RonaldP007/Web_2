const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");


app.use(cors());


//User signin route - create a token and return to user
app.post('/api/signin', (req, res) => {
  const user = {
      id: 1,
      username: "admin",

  }
  jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
      res.json({token});
  });
});


  /* Creae API route */
app.get('/api', (req, res) => {
  res.json({

      msg: "NodeJS JWT Authentication"

  });

});

/** Create posts protected route */

app.post('/api/posts', verifyToken, (req, res) => {

  jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{

      if(err){

        res.status(401);
        res.send({
          error: "Token incorrecto"
        });

      }else{

          res.json({

              msg: "Ha iniciado",

              //authData

          });
      }

  });

});

/** verifyToken method - this method verifies token */
function verifyToken(req, res, next){
  
  //Request header with authorization key
  const Header = req.headers['authorization'];
  
  //Check if there is  a header
  if(typeof Header !== 'undefined'){

      const resp = Header.split(' ');
      
      //Get Token arrray by spliting
      const Token = resp[1];

      req.token = Token;

      //call next middleware
      next();

  }else{

    res.sendStatus(403);

  }


}


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

