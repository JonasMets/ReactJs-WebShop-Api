// 
// 
// Här startar vi servern för api genom att sätta upp express
// och starta "lyssning" på en port
// 
//  importerar bibliotek så att de kan användas
// 
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser')

// sätter sökväg till dotenv varibler
dotenv.config({path:'./config/config.env'})


// om det finns en port på produktionserver eller använd 9999
const PORT = process.env.PORT || 9999;

// text som visas i console
const serverUri = 'http://localhost:'+PORT;


// importerar modulen routeProducts som innehåller router för produkter
const routeProducts = require('./routes/routeProducts');

// importerar modulen routeUsers som innehåller router för users
const routeUsers = require('./routes/routeUsers');

// importerar modulen routeOrders som innehåller router för orders
const routeOrders = require('./routes/routeOrders');


const mongodb = require('./database/mongodbWebShop')

// initierar express()
const app = express();


// CORS
app.use((req, res, next)=>{

  // console.log(req)

  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE")
    return res.status(200).json({})
  }
  // går vidare till nästa middleware del
  next();

})

// BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// startar morgan logger om vi är i dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



// kopplar ihop routeProducts route med server app
// så att man  kan anropa http://localhost:9999/api/v1/products
app.use('/api/v1/products',routeProducts );


// kopplar ihop routeUsers route med server app
// så att man  kan anropa http://localhost:9999/api/v1/users
app.use('/api/v1/users',routeUsers );


// kopplar ihop routeUsers route med server app
// så att man  kan anropa http://localhost:9999/api/v1/orders
app.use('/api/v1/orders',routeOrders );


//default testroute anrop om inget annat skickas in
app.get('/',(req,res)=>{
  res.send('Hello from Webshop server')
})




// starta lyssning av anrop till server från klient
app.listen(PORT,()=>{
  console.log(`Server running in ${process.env.NODE_ENV} on port ${serverUri}`.yellow.bold)
})

// startar uppkoppling mot mongodb server
mongodb.startMongoServer;



