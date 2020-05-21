// 
// skapar en modell för hur en order ser ut / vilken data som ska finnas
// specifik för mongo db

// importerar mongoose
const mongoDb = require('mongoose');

// skapar ett schema för order
const OrderSchema = mongoDb.Schema({

  _id: mongoDb.Schema.Types.ObjectId,
  userId:{ type: String, required: [true, 'Please add user id'] },
  userData:{type:Object, required:[true, 'Please add user data']},
  shippingData:{type:Object, required:[true, 'Please add shippingdata']},
  orderItems:{type:Array, required:[true, 'Please add order item']},
  orderTotalAmount:{type:Number, required:[true, 'Please add order amount']},
  orderStatus:{type: String}

})


// exporterar "class" Order med modell OrderSchema
module.exports = mongoDb.model('Order',OrderSchema);







