const express = require('express');
const Router = express.Router();
const checkToken = require('../Middleware/authMiddleware');

const { registerUser, authUser, viewUsers, updStatus, deleteUser } = require('../Controllers/authController');
const { addToCart, getCartItems, removeCartItem } = require('../Controllers/cartController');
const { placeOrder, viewOrders, updateStatus } = require('../Controllers/orderController');
const dashboardStats = require('../Controllers/dashboardController');

// Auth
Router.post('/register', registerUser);
Router.post('/login', authUser);

// Cart
Router.post('/add-to-cart', checkToken, addToCart);
Router.get('/get-cart-items', checkToken, getCartItems);
Router.delete('/remove-from-cart/:productId', checkToken, removeCartItem);

// Orders & Dashboard
Router.post('/place-order', checkToken, placeOrder);
Router.get('/view-orders', checkToken, viewOrders);
Router.put('/update-order-status/:id', checkToken, updateStatus);
Router.get('/dashboard-stats', checkToken, dashboardStats);

// Admin Users
Router.get('/view-users', checkToken, viewUsers);
Router.put('/update-user-status/:id', checkToken, updStatus);
Router.delete('/delete-user/:id', checkToken, deleteUser);

module.exports = Router;