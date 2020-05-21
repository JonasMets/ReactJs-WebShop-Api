// 
// här konfigurerar vi uppkoppling mot databas
// 
// skapar en ny instans av mongoose
const db = require('mongoose');
const colors = require('colors');

// sätter upp serveraddress mongo server
const mongoUri = "mongodb+srv://JM_Shop_1234:JM_Shop_1234@cluster0-9et03.mongodb.net/WebshopApi?retryWrites=true&w=majority"

// starta mongo database
// sätter up connection mot mongodb servern och exporterar startMongoServer
// 
exports.startMongoServer = db
.set('useCreateIndex', true)
.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then((result) => {
  console.log('Mongo db running'.magenta)
}).catch((err) => {
  console.log(err.reason)
});


// module.exports = db


