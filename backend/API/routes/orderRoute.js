import express              from 'express';
import { isAdmin, isAuth, isValid }  from '../middleware/middleware.js';
import * as orderController from '../controllers/orderController.js'
import { updateProduct }    from "../middleware/helper.js";
import expressAsyncHandler from "express-async-handler";

const orderRoute = express.Router();

// Get Request Section
orderRoute.get('/',                     isAuth,     isAdmin,        expressAsyncHandler(orderController.getAllOrders));
orderRoute.get('/summary',              isAuth,     isAdmin,        expressAsyncHandler(orderController.getSummary));
orderRoute.get('/mine',                 isAuth,                     expressAsyncHandler(orderController.getPersonalOrder));
orderRoute.get('/:id',                  isAuth,                     expressAsyncHandler(orderController.getOrderByID));
orderRoute.get('/user/:id',             isAuth,     isValid,        expressAsyncHandler(orderController.getUserOrder));



// Post Request Section
orderRoute.post('/',               isAuth,     updateProduct,  expressAsyncHandler(orderController.createOrder));


// Put Request Section
orderRoute.put('/:id/pay',              isAuth,                     expressAsyncHandler(orderController.payForOrder));
orderRoute.put('/:id/deliver',          isAuth,                     expressAsyncHandler(orderController.orderDelivered));
orderRoute.put('/:id/cancelrequest',    isAuth,                     expressAsyncHandler(orderController.cancelRequest));
orderRoute.put('/:id/canceled',         isAuth,     isAdmin,        expressAsyncHandler(orderController.cancelOrder))


// Delete Request Section
orderRoute.delete('/:id',               isAuth,     isAdmin,        expressAsyncHandler(orderController.deleteOrder));

export default orderRoute;