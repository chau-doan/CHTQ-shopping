import mongoose from 'mongoose';
import Product from '../models/product.js';
import {PAGE_SIZE} from "../middleware/constant.js";

/*---------------------------- Get Section ----------------------------*/

export const getAllProduct = async (req, res) => {

    // Get query data from route
    const page              = Number(req.query.pageNumber)          || 1;
    const name              = req.query.name                        || '';
    const category          = req.query.category                    || '';
    const brand             = req.query.brand                       || '';
    const order             = req.query.order                       || '';
    const min               = req.query.min && Number(req.query.min) !== 0           ? Number(req.query.min)     : 0;
    const max               = req.query.max && Number(req.query.max) !== 0           ? Number(req.query.max)     : 0;
    const rating            = req.query.rating && Number(req.query.rating) !== 0     ? Number(req.query.rating)  : 0;

    // Creating filter
    const nameFilter        = name                  ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter    = category              ? { category }                              : {};
    const brandFilter       = brand                 ? { brand }                                 : {};
    const priceFilter       = min && max            ? {price: {$gte: min, $lte: max}}           : {};
    const ratingFilter      = rating                ? {rating: {$gte: rating}}                  : {};
    const sortOrder         = order === 'lowest'    ? {price: 1} :
        order === 'highest' ? {price: -1} :
            order === 'toprated' ? {rating: -1}:
                {_id: -1};

    // Count matching data
    const count = await Product.count({
        ...nameFilter,
        ...categoryFilter,
        ...brandFilter,
        ...priceFilter,
        ...ratingFilter,
    });

    // Get data
    const products = await Product.find({
                                            ...nameFilter,
                                            ...categoryFilter,
                                            ...brandFilter,
                                            ...priceFilter,
                                            ...ratingFilter,
                                    })
                                    .sort(sortOrder)
                                    .skip(PAGE_SIZE * (page - 1))
                                    .limit(PAGE_SIZE);

    // Response
    res
        .status(200)
        .send({
        products,
        page,
        pages: Math.ceil(count/ PAGE_SIZE)
    });
}

export const getAllCategories = async (req, res) => {
    //Find all distinct category
    const categories = await Product.find().distinct('category');
    res
        .status(200)
        .send(categories);
}

export const getAllBrands = async (req, res) => {
    //Find all distinct brand
    const brands = await Product.find().distinct('brand');
    res
        .status(200)
        .send(brands);
}

export const getProductByID = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res
            .status(200)
            .send(product);
    }
    else{
        res
            .status(404)
            .send({
                message: "Product Not Found"
            });
    }
}

export const userReview = async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        if(product.reviews.find((x) => x.name === req.user.name)){
            return res
                .status(400)
                .send({
                    message: 'You already submited a review. According to our policy, customer can only submit one review per product.'
                });
        }
        const review = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0)/ product.reviews.length;
        const updatedProduct = await product.save();
        res
            .status(201)
            .send({
                message:'Review Created',
                review:updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
    }
    else{
        res
            .status(404)
            .send({
                message:'Product Not Found'
            })
    }
}


/*---------------------------- Post Section ----------------------------*/

export const createProduct = async(req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        attribute: req.body.attribute,
        rating: 0,
        numReviews: 0,
        description: req.body.description,
    });
    console.log(req.body);
    const createdProduct = await product.save();
    res
        .status(200)
        .send({
        message: 'Product Created',
        product: createdProduct
    });
}



/*---------------------------- Put Section ----------------------------*/

export const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.attribute = req.body.attribute;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res
            .status(200)
            .send({
            message:'Product Updated',
            product:updatedProduct,
        });
    }
    else{
        res
            .status(404)
            .send({
                message:'Product Not Found'
            })
    }
}





/*---------------------------- Delete Section ----------------------------*/

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        const deleteProduct = await product.remove();
        res
            .status(200)
            .send({
            message: 'Product Deleted',
            product: deleteProduct,
        })
    }
    else{
        res
            .status(404)
            .send({
                message: 'Product Not Found',
            });
    }
}

