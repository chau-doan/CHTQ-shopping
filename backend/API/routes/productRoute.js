import express from 'express';
import { isAdmin, isAuth } from '../middleware/middleware.js';
import * as productController from '../controllers/productController.js' ;
import {clearReview} from "../middleware/helper.js";
import expressAsyncHandler from "express-async-handler";

const productRoute = express.Router();

// Get Request Section
productRoute.get('/',                                             expressAsyncHandler(productController.getAllProduct));
productRoute.get('/categories',                                   expressAsyncHandler(productController.getAllCategories));
productRoute.get('/brands',                                       expressAsyncHandler(productController.getAllBrands));
productRoute.get('/:id',                                          expressAsyncHandler(productController.getProductByID));


// Post Request Section
productRoute.post('/',              isAuth, isAdmin,              expressAsyncHandler(productController.createProduct));
productRoute.post('/:id/reviews',   isAuth,                       expressAsyncHandler(productController.userReview));

// Put Request Section
productRoute.put('/:id',            isAuth, isAdmin,              expressAsyncHandler(productController.updateProduct));


// Delete Request Section
productRoute.delete('/:id',    isAuth, isAdmin, clearReview, expressAsyncHandler(productController.deleteProduct));


export default productRoute;