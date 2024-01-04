const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')


// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.send(error.message)
    }

}

// Create product -- admin
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.send(error.message)
    }
}

// get single product
const getProductDetails = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        next(new ErrorHandler('Product not found', 404))
    }
}

// Update product -- Admin
const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })

        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        next(new ErrorHandler("Product not found", 404))
    }
}


// Delete product -- Admin
const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    } catch (error) {
        next(new ErrorHandler("Product not found", 404))
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
}
