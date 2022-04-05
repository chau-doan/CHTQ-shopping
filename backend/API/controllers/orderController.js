import Order from '../models/order.js'
import User from '../models/user.js'
import Product from "../models/product.js";
import { mailgun, payOrderEmailTemplate } from '../middleware/middleware.js';
import {PAGE_SIZE} from "../middleware/constant.js";
import { dateDifference } from "../middleware/helper.js"

/*---------------------------- Get Section ----------------------------*/

export const getAllOrders = async (req, res) => {
    const page          = Number(req.query.pageNumber) || 1;
    const count         = await Order.count({})
    const orders = await Order
                            .find({})
                            .populate('user', 'name')
                            .sort({createdAt: -1})
                            .skip(PAGE_SIZE * (page - 1))
                            .limit(PAGE_SIZE);
    res
        .status(200)
        .send({
        orders,
        page,
        pages: Math.ceil( count/ PAGE_SIZE )
    });
}

export const getSummary = async (req, res) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: {$sum: 1},
                totalSales: {$sum: '$totalPrice'},
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: {$sum:1},
            },
        },
    ]);
    const dailyOrders = await Order.aggregate([
        {
            $group: {
                _id: {$dateToString: {format:'%Y-%m-%d', date: '$createdAt'}},
                orders: {$sum:1},
                sales: {$sum: '$totalPrice'},
            },
        },
        { $sort: {_id:1}}
    ]);
    const productCategories = await Product.aggregate([
        {
            $group:{
                _id: '$category',
                count: {$sum:1},
            },
        },
    ]);
    res
        .status(200)
        .send({users, orders, dailyOrders, productCategories});
}

export const getPersonalOrder = async (req, res) => {
    try{

        const page   = Number(req.query.pageNumber) || 1;
        const count  = await Order.count({ user: req.user._id  });
        const orders = await Order
                                .find({ user: req.user._id })
                                .sort({createdAt: -1})
                                .skip(PAGE_SIZE * (page - 1))
                                .limit(PAGE_SIZE)
        res.send({
            orders,
            page,
            pages: Math.ceil( count/ PAGE_SIZE )
        });
    }
    catch (error){
        res.status(404).send(error);
    }
}

export const getUserOrder = async (req, res) => {
    try{
        const page   = Number(req.query.pageNumber) || 1;
        const orders = await Order.find({ user: req.params.id });
        const count  = await Order.count({ user: req.params.id });
        res
            .status(200)
            .send({
            count,
            orders
        });
    }
    catch (error){
        res.status(404).send(error);
    }
}

export const getOrderByID = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res
            .status(200)
            .send(order);
    }
    else{
        res
            .status(404)
            .send({
                message: 'Order Not Found'
            });
    }
}



/*---------------------------- Post Section ----------------------------*/

export const createOrder = async (req, res) => {
    try{
        const order = new Order({
            orderItems:         req.body.orderItems,
            shippingAddress:    req.body.shippingAddress,
            paymentMethod:      req.body.paymentMethod,
            itemsPrice:         req.body.itemsPrice,
            shippingPrice:      req.body.shippingPrice,
            taxPrice:           req.body.taxPrice,
            totalPrice:         req.body.totalPrice,
            user:               req.user._id,
            paymentResult:      req.body.paymentResult
        });
        const createdOrder = await order.save();
        const user = await User.findById(req.user._id);
        try{
            mailgun().messages().send({
                from:'Shopping_Cart <seniorproject195@gmail.com>',
                to:`${user.name} <${user.email}>`,
                subject:`New order ${order._id}`,
                html: payOrderEmailTemplate(order),
            }, (error, body) => {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(body);
                }
            });
        }
        catch(error){
            console.log(error)
        }
        res
            .status(201)
            .send({
                message: 'New Order Created',
                order: createdOrder,
            });
    }
    catch (error){
        res.status(404).send(error);
    }

}



/*---------------------------- Put Section ----------------------------*/

export const payForOrder = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'email name');
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        try{
            mailgun().messages().send({
                from:'Shopping_Cart <seniorproject195@gmail.com>',
                to:`${order.user.name} <${order.user.email}>`,
                subject:`New order ${order._id}`,
                html: payOrderEmailTemplate(order),
            }, (error, body) => {
                if(error){
                    console.log(error);
                }
                else{
                    console.log(body);
                }
            });
        }
        catch(error){
            console.log(error)
        }

        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}

export const orderDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res
            .status(200)
            .send({
            message: 'Order Deliverd',
            order: updatedOrder
        });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}

export const cancelRequest = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        if(order.isDelivered && dateDifference(new Date(Date.now()), order.deliveredAt) > 7){
            res
                .status(400)
                .send({
                    message: 'You have passed the day for cancel.'
                });
            return;
        }
        order.requestCancel = true;
        order.requestedAt = Date.now();
        order.reasonCancel = req.body.reason;
        const updatedOrder = await order.save();
        res.send({order:updatedOrder})
    }
    else{
        res.status(404).send({ message: 'Order Not Found' });
    }
}

export const cancelOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        if(!order.requestCancel){
            res
                .status(400)
                .send({
                    message: "This order didn't request to cancel."
                });
            return;
        }
        if(order.isCanceled){
            res
                .status(400)
                .send({
                    message: "This order already cancelled."
                });
            return;
        }
        order.isCanceled = true;
        order.canceledAt = Date.now();
        const updatedOrder = await order.save();
        res.send({order:updatedOrder}) 
    }
    else{
        res.status(404).send({ message: 'Order Not Found' });
    }
}



/*---------------------------- Delete Section ----------------------------*/

export const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        const deleteOrder = await order.remove();
        res
            .status(200)
            .send({
            message: 'Order Deleted',
            order: deleteOrder
        });
    }
    else{
        res
            .status(404)
            .send({
                message: 'Order Not Found'
            });
    }
}