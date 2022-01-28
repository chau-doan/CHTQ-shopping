import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import path from 'path';
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//mongoose.connect('mongodb://localhost/CHTQ');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:test123@rest-shoping-cart.ibse1.mongodb.net/CHTQ_SHOPPING'
);

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_CLIENT_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
/*app.get('/', (req, res) => {
    res.send('Server is ready');
});*/

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 4000;
app.listen(port,() => {
    console.log(`Server at http://localhost:${port}`);
});


