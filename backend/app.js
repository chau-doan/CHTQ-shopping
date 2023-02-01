// Import package
import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect database
//const url = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@senior-project-chtq.wtz24.mongodb.net/seniorproject`
const url = "mongodb://mongodb:27017/shopping-cart"
mongoose.connect(url);

// Import routes
import productRoute from './API/routes/productRoute.js'
import orderRoute from './API/routes/orderRoute.js';
import uploadRoute from "./API/routes/uploadRoute.js";
import userRoute from "./API/routes/userRoute.js";
import reviewRoute from "./API/routes/reviewRoute.js";

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested_With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Swagger documentation

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info:{
            title: "Shopping Cart API",
            version: "1.0.0"
        }
    },
    host: 'https://shopping-cart-api-195.herokuapp.com',
    basePath: '/',
    apis:[
        './API/docs/config.yaml',
        './API/docs/user.yaml',
        './API/docs/product.yaml',
        './API/docs/order.yaml',
        './API/docs/review.yaml',
        './API/docs/upload.yaml'
    ],
};

const swaggerConfigure = {
    swaggerOptions: {
        tryItOutEnabled: false,
        supportedSubmitMethods: [''],
        defaultModelsExpandDepth: -1
    },
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);


// Assign route
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerConfigure));
app.use('/api/users',       userRoute);
app.use('/api/products',    productRoute);
app.use('/api/orders',      orderRoute);
app.use('/api/uploads',     uploadRoute);
app.use('/api/reviews',     reviewRoute);



app.get('/api/config/paypal', (req, res) => {
    res
        .status(200)
        .send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
    res
        .status(200)
        .send(process.env.GOOGLE_API_KEY || '');
});



app.get('/', (req, res) => {
    res.send('Server is ready')
})

// Error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;