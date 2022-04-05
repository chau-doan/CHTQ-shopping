import express   from 'express';
import {isAuth} from '../middleware/middleware.js';
import * as cartController from '../controllers/cartController.js'
import {updateProduct} from "../middleware/helper";

const cartRoute = express.Router();

// Get Request Section



// Post Request Section



// Put Request Section



// Delete Request Section


export default cartRoute;