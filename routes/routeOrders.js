// 
// routeUsers
// sätter upp en router för att hantera anrop till Users
// 
// importerar express och kopplar på router
const express = require('express');
const router = express.Router();


// importerar en guard för anrop somska skyddas med token
const restricted = require('../authentication/auth');

// importerar metoder från controllerOrders
const { addOrder, getOneOrder, getOrders, getCustomerOrders, updateOrder, removeOrder} = require('../controllers/controllerOrders')


// här skapar vi koppling mellan anrop och metoder
// 
// kopplar ihop /api/v1/orders med metod i controllerOrders.js
//

// addOrder
// skapa en ny order
//   http://localhost:9999/api/v1/orders
router.route('/')
.post( restricted.checkToken, addOrder)


// hämta alla order
//  http://localhost:9999/api/v1/orders
router.route('/')
.get(restricted.checkToken, getOrders)

// hämta en order med :id
//  http://localhost:9999/api/v1/orders/ id
router.route('/:id')
.get(restricted.checkToken, getOneOrder)

// hämta all order som en kund  har med :id
//  http://localhost:9999/api/v1/orders/customer/ id
router.route('/customer/:id')
.get(restricted.checkToken, getCustomerOrders)



// uppdater en order med :id
//  //  http://localhost:9999/api/v1/orders/ id
router.route('/:id')
.patch(restricted.checkToken, restricted.checkRole,updateOrder)



// tar bort en order med :id
//  //  http://localhost:9999/api/v1/orders/ id
router.route('/:id')
.delete(restricted.checkToken,restricted.checkRoleForDelete, removeOrder)


// exporterar modulen
module.exports = router;

