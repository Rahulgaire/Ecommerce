const Product = require('../models/Product.models.js')
const uploadToCloudinary =require('../config/cloudinary.js')
//Create Product
const createProduct = async (req,res) => {
    try {
        const {name,description,price,category,countInStock}=req.body
        
            const file = req.file
            if(!file){
                return res.status(401).json({
                    message:"Please upload a file"
                })
            }

        const image = await uploadToCloudinary(file)

        const newProduct = 
    } catch (error) {
        
    }
}