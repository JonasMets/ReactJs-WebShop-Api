// 
// routeUsers
// sätter upp en router för att hantera anrop till Users
// 
// importerar express och kopplar på router
const express = require('express');
const router = express.Router();


// importerar metoder från controllerUsers
const { loginUser, registerUser, getAllUsers, getOneUser, updateUser, removeUser} = require('../controllers/controllerUser')

// importerar en guard för anrop somska skyddas med token
const restricted = require('../authentication/auth');


// här skapar vi koppling mellan anrop och metoder
// 
// kopplar ihop /api/v1/users med metod i controllerUser.js
//

// registerUser
// skapa användare
//   http://localhost:9999/api/v1/users/register
router.route('/register')
.post(registerUser)

// loginUser
// loggar in användare
//   http://localhost:9999/api/v1/users/login
router.route('/login')
.post(loginUser)


// hämta alla users
//    http://localhost:9999/api/v1/users/getall
router.route('/getall')
.post(restricted.checkToken, restricted.checkRole, getAllUsers)


// hämta en användare
//    http://localhost:9999/api/v1/users/getone/:id
router.route('/getone/:id')
.post(restricted.checkToken, restricted.checkRole, getOneUser)


// uppdatera användare
//    http://localhost:9999/api/v1/users/getone/:id
//     restricted.checkToken, restricted.checkRole,
router.route('/update/:id')
.patch(restricted.checkToken, restricted.checkRole,updateUser)




// uppdatera användare
//    http://localhost:9999/api/v1/users/delete/:id
//     restricted.checkToken, restricted.checkRole,
router.route('/delete/:id')
.delete(restricted.checkToken,restricted.checkRoleForDelete,removeUser)




// skapa en default route om inget annat finns
router.get('/',(req,res)=>{
  res.send('Hello from default user')
})

// exporterar modulen
module.exports = router;
