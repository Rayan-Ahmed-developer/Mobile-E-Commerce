const cartModel = require("../Models/cartModel"); 
const productModel = require("../Models/productModel")
const orderModel = require("../Models/orderModel");
const authModel = require("../Models/authModel");

// 1. Add to Cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cartProduct = await cartModel.findOne({ userId });

        if (!cartProduct) {
            cartProduct = await cartModel.create({
                userId,
                items: [{ productId }]
            });

            return res.send({
                message: "Product added to cart",
                cart: cartProduct
            });
        }

        const itemExists = cartProduct.items.find(
            item => item.productId.toString() === productId.toString()
        );

        if (itemExists) {
            return res.send({
                message: "Product already in cart"
            });
        }

        cartProduct.items.push({ productId });
        await cartProduct.save();

        return res.send({
            message: "Product added to cart",
            cart: cartProduct
        });

    } catch (error) {
        console.error("Add To Cart Error:", error);
        return res.send({
            message: error.message
        });
    }
};

// 2. Get Cart Items
const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartModel.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.send({
                message: "No items in cart",
                items: []
            });
        }

        const cartItems = [];
        for (const item of cart.items) {
            const product = await productModel.findById(item.productId);
            if (product) {
                cartItems.push(product);
            }
        }

        return res.send({
            message: "Cart items fetched successfully",
            items: cartItems
        });

    } catch (error) {
        console.error("Get Cart Items Error:", error);
        return res.send({
            message: error.message
        });
    }
};

// 3. Remove from Cart
const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.send({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();
        return res.send({
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        console.error("Remove Cart Error:", error);
        return res.send({
            message: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};