// 
// routeProducts
// sätter upp en router för att hantera anrop till Products
// 
// importerar express och kopplar på router
const express = require('express');
const router = express.Router();

// importerar metoder från controllerProducts
const {getAllProducts,
        getOneProduct,
        addProducts,
        updateProduct,
        deleteProduct,
        addProduct } =require('../controllers/controllerProducts');



// här skapar vi koppling mellan anrop och metoder
// 
// kopplar ihop /api/v1/products med metod i controllerProducts.js


// addProduct
// skapa produkt:er 
//   http://localhost:9999/api/v1/products
router.route('/')
.post(addProduct)


// skapa produkt:er 
//   http://localhost:9999/api/v1/products/import
router.route('/import')
.post(addProducts)

// hämta alla produkter
//    http://localhost:9999/api/v1/products
router.route('/')
.get(getAllProducts)

// hämta en produkt med :id
//  http://localhost:9999/api/v1/products/ id
router.route('/:id')
.get(getOneProduct)


// uppdater en produkt med :id
//  http://localhost:9999/api/v1/products/ id
router.route('/:id')
.put(updateProduct)


//   deleteProduct
// ta bort en produkt med :id
//  http://localhost:9999/api/v1/products/ id
router.route('/:id')
.delete(deleteProduct)


// skapa en default route om inget annat finns
// router.get('/',(req,res)=>{
//   res.send('Hello from default products')
// })
// exporterar modulen
module.exports = router;
