// 
// skapar en modell för hur en användare ser ut / vilken data som ska finnas
// specifik för mongo db

// importerar mongoose
const mongoDb = require('mongoose');


const UserSchema = mongoDb.Schema({

  _id: mongoDb.Schema.Types.ObjectId,
  firstName: { type: String, required: [true, 'Please add firstname'] },
  lastName: { type: String, required: [true, 'Please add lastname'] },
  email: { type: String, required: [true, 'Please add email'], unique: true },
  passWordHash: { type: String, required: true },
  // passWordSalt: {type: String, required: true},
  userRole:{ type: String},
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }

})


// exporterar class User med modell UserSchema
module.exports = mongoDb.model('User', UserSchema);






