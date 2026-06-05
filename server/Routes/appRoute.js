const express = require('express');
const webRoutes = express.Router();
const { 
    insertProduct, viewProduct, deleteProduct, updateProduct, 
    updateProductStatus, categoryProduct, searchProduct, 
    getProductModel, productDetail , insertManyProducts
} = require('../Controllers/productController');


webRoutes.get('/phone-list', viewProduct);

webRoutes.post('/add-one', insertProduct);
webRoutes.post('/add-many', insertManyProducts);
webRoutes.put('/update-one/:id', updateProduct);
webRoutes.delete('/delete-one/:id', deleteProduct);
webRoutes.put('/toggle-status/:id', updateProductStatus);
webRoutes.get('/category/:category', categoryProduct);
webRoutes.get('/click-product/:id', productDetail);
webRoutes.get('/search/:name', searchProduct);
webRoutes.get('/product/:model', getProductModel); 

module.exports = webRoutes;