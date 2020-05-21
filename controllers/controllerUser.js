// 
//  här finns alla metoder/funktioner för att utföra anropen från routeUsers
//

// importerar funktioner från mongoose
const mongodb = require('mongoose')


// här importerar vi Schema/model för Users
const User = require('../models/user/schemaForUser');
// här importerar vi modul för autentisering
const auth = require('../authentication/auth')
// 
const encrypt = require('bcrypt')


exports.registerUser = (req, res) => {

  try {
    console.log(1)
    
    User.find({ email: req.body.email })
    .then(exists => {
      console.log(2)
      console.log(exists)

      if (exists.length > 0) {
        console.log(3)
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'User with same email address already exists.'
        })
      }

      // console.log(req.body)

      encrypt.hash(req.body.passWord, encrypt.genSaltSync(10), (error, hash) => {
        console.log(4)
        if (error) {
          console.log(5)
          console.log(error)
          return res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Error: Failed to create user password hash.'
          })
        }

        const user = new User(
          {
            _id: new mongodb.Types.ObjectId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passWordHash: hash,
            // userRole är default 'customer'
            userRole:'customer'
          }
        )

        user.save()
          .then(() => {
            res.status(201).json({
              statusCode: 201,
              status: true,
              message: 'User was successfully created.'
            })
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({
              statusCode: 500,
              status: false,
              message: 'Unable to create user. Please contact the System Administrator.'
            })
          })
      })
    })
    console.log(5)


  } catch (error) {
    console.log(6)

    console.log(error.name)

    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Unable to create user. Please contact the System Administrator.'
    })
  }


  
}


exports.loginUser = (req, res) => {

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        console.log(user)
        return res.status(401).json({
          statusCode: 401,
          status: false,
          message: 'Incorrect email address or password'
        })
      }

      try {
        encrypt.compare(req.body.password, user.passWordHash, (error, result) => {
          if (result) {
            return res.status(200).json({
              statusCode: 200,
              status: true,
              message: 'Authentication was successful.',
              token: auth.genToken(user._id),
              user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userRole: user.userRole !='' ? user.userRole : 'customer'
              }
            })
          }
          console.log(error)

          return res.status(401).json({
            
            statusCode: 401,
            status: false,
            message: 'Incorrect email address or password'
          })

        })
      }
      catch {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Unable to authenticate user. Please contact the System Administrator'
        })
      }
    })
}






// @desc Hämta alla användare
// @route GET http://localhost:9999/api/v1/users/getall
exports.getAllUsers = (req, res, next) => {

  try {

    User.find()
      .then((data) => {
        res.status(200).json({

          statusCode: 200,
          status: true,
          message: 'Data was retrieved',
          count: data.length,
          data
        })
      })
      .catch((error) => {
        res.status(400).json(error)
      })

  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Unable to get data',
      error: error.message
    })
  }

  // res.send('GET all products')

};


// @desc Hämta en användare med id
// @route GET http://localhost:9999/api/v1/users/getone
exports.getOneUser = (req, res, next) => {

  try {

    User.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json(error)
    })

  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Unable to get data',
      error: error.message
    })
  }

  // res.send('GET all products')

};

// @desc Uppdatera en användare med id
// @route GET http://localhost:9999/api/v1/users/update/:id
exports.updateUser= (req, res, next) =>{

  console.log(req.params.id)
  // res.send('Update one user')
  
  User.updateOne({ _id: req.params.id }, req.body.data)
  .then(() => {

    res.status(200).json({
      statusCode: 200,
      status: true,
      message: `User with id:${req.params.id} was updated`
    })
  
  })
  .catch(error => {
    res.status(500).json(error)
  })


}



// remove user
// @desc ta bort en användare med _id
// @route GET http://localhost:9999/api/v1/users/delete/:id
// 
exports.removeUser = (req, res)=>{

  // res.send(`DELETE delete user with id ${req.params.id}`)

  try {

    User.findById(req.params.id)
      .then((userToDelete) => {

        userToDelete.remove()
          .then(() => {
            res.status(200).json({
              statusCode: 200,
              status: true,
              message: `User deleted with id:${req.params.id}`
            })
          })
      })
      .catch(() => {
        res.status(400).json({
          statusCode: 400,
          status: false,
          message: `Could not delete user with id:${req.params.id}`
        })
      })
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message)
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: messages
      })
    } else {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: error
      })
    }
  }


}

