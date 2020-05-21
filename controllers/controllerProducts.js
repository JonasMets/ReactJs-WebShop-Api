// 
//  här finns alla metoder/funktioner för att utföra anropen från routeProducts
//

// importerar funktioner från mongoose
const mongodb = require('mongoose')

// här importerar vi Schema/model för Produkter
const Product = require('../models/products/schemaForProduct');
// 


// @desc Hämta alla produkter
// @route GET /api/v1/products
exports.getAllProducts = (req, res, next) => {

  try {

    Product.find()
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



// @desc Hämta en produkt med :id
// @route GET /api/v1/products/id 
exports.getOneProduct = (req, res, next) => {
  console.log(req.params)

  Product.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  // res.send('GET one product with id:'+req.params.id)
};


// @desc Lägger till produkt
// @route POST /api/v1/products
//  lägger till en produkt från ett json objekt
exports.addProduct = (req, res) => {

  try {

    let newProduct = new Product({
      _id: new mongodb.Types.ObjectId,
      name: req.body.name,
      shortdesc: req.body.shortdesc,
      description: req.body.description,
      inStockquantity: req.body.inStockquantity,
      price: req.body.price,
      image: req.body.image
    })
    newProduct.save()
      .then(() => {
        return res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Data imported'
        })
      })
      .catch((error) => {
        console.log(error)
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'Unable to import data',
          error: error
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



// @desc Lägger till produkter
// @route POST /api/v1/products/import
//  lägger till produkter från ett json objekt
exports.addProducts = (req, res) => {

  try {
    // loopar igenom req.body för att läsa ut data
    // för varje produkt som skickas in req.body skapas en ny produkt
    // i datababsen
    for (product of req.body) {
      console.log(product)

      let newProduct = new Product({
        _id: new mongodb.Types.ObjectId,
        name: product.name,
        shortdesc: product.shortdesc,
        description: product.description,
        inStockquantity: product.inStockquantity,
        price: product.price,
        image: product.image
      })

      newProduct.save()
        .then(() => {
          return res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'Data imported'
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'Unable to import data',
            error: error
          })
        })


    }
    // 
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: false,
      message: 'Unable to import data',
      error: error
    })
  }
}




// @desc Uppdatera produkt
// @route PUT /api/v1/products
//  uppdatera produkt
exports.updateProduct = (req, res) => {
  // res.send('PUT / Update one product with id:' + req.params.id)

  Product.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      Product.findOne({ _id: req.params.id })
        .then(productToUppdate => res.status(200).json({
          statusCode: 200,
          status: true,
          message: `Product with id:${req.params.id} was updated`,
          productToUppdate
        }))
        .catch(error => {
          res.status(500).json(error)
        })
    })

    // .then( user => res.status(200).json(user))
    .catch(error => {
      res.status(500).json(error)
    })

}




// @desc Ta bort en produkt med id
// @route DELETE /api/v1/products/id
//  ta bort en produkt med id
exports.deleteProduct = (req, res) => {
  try {
    // 
    Product.findById(req.params.id)
      .then((productToDelete) => {

        productToDelete.remove()
          .then(() => {
            res.status(200).json({
              statusCode: 200,
              status: true,
              message: `product deleted with id:${req.params.id}`
            })
          })
      })
      .catch(() => {
        res.status(400).json({
          statusCode: 400,
          status: false,
          message: `Could not delete product with id:${req.params.id}`
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
  // res.send('DELETE / Delete one product with id:' + req.params.id)
}





