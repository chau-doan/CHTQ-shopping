import express from 'express';
import { isAdmin, isAuth, isValid } from '../middleware/middleware.js';
import * as reviewController from '../controllers/reviewController.js'
import {calculateRating, isReviewValid} from "../middleware/helper.js";
import expressAsyncHandler from "express-async-handler";

const reviewRoute = express.Router();

// Get Request Section
reviewRoute.get('/user',           isAuth,                  expressAsyncHandler(reviewController.getReviewFromUser));
reviewRoute.get('/product/:id',                             expressAsyncHandler(reviewController.getReviewFromProduct));
reviewRoute.get('/user/:id',       isAuth, isValid,         expressAsyncHandler(reviewController.getUserReview));

// Post Request Section
reviewRoute.post('/:id',      isAuth, isReviewValid,   expressAsyncHandler(reviewController.createReview),  calculateRating);

// Put Request Section
reviewRoute.put('/:id',       isAuth,                   expressAsyncHandler(reviewController.updateReview), calculateRating);

// Delete Request Section
reviewRoute.delete('/:id',    isAuth,                   expressAsyncHandler(reviewController.deleteReview), calculateRating);

export default reviewRoute;