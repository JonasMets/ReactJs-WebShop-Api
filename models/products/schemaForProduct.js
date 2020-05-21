// 
// skapar en modell för hur en produkt ser ut / vilken data som ska finnas
// specifik för mongo db

// importerar mongoose
const mongoDb = require('mongoose');

// skapa ett sk. schema för en produkt
const ProductSchema = new mongoDb.Schema({

  _id: mongoDb.Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add text']
  },
  shortdesc:{
    type: String,
    trim: true,
    required: [true, 'Please add text']
  },
  description:{
    type: String,
    trim: true,
    required: [true, 'Please add text']
  },
  price:{
    type: Number,
    required:[true,'Please add a price']
  },
  image:{
    type: String,
    required:[true, 'Please add a imagepath']
  },
  otherinfo:{
    type: String,
    required:false
  },
  inStockquantity:{type: Number, required: true},
  created: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}

})

// exporterar "class" Product med modell ProductSchema
module.exports = mongoDb.model('Product',ProductSchema);






