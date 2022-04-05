import express from "express";
import { isAdmin, isAuth } from "../middleware/middleware.js";
import * as userController from '../controllers/userController.js'
import expressAsyncHandler from "express-async-handler";

const userRoute = express.Router();

// Get Request Section
userRoute.get('/:id',       isAuth,             expressAsyncHandler(userController.getUserByID));
userRoute.get('/',          isAuth, isAdmin,    expressAsyncHandler(userController.getUserList))


// Post Request Section
userRoute.post('/signin',                       expressAsyncHandler(userController.userSignin));
userRoute.post('/register',                     expressAsyncHandler(userController.userRegister));


// Put Request Section
userRoute.put('/profile',   isAuth,             expressAsyncHandler(userController.updateProfile));
userRoute.put('/:id',       isAuth, isAdmin,    expressAsyncHandler(userController.updateUser));


// Delete Request Section
userRoute.delete('/:id',    isAuth, isAdmin,    expressAsyncHandler(userController.deleteUser))

export default userRoute;