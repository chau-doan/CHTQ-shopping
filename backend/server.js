import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//mongoose.connect('mongodb://localhost/CHTQ');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:test123@rest-shoping-cart.ibse1.mongodb.net/CHTQ_SHOPPING'
);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 4000;
app.listen(4000,() => {
    console.log(`Server at http://localhost:${port}`);
});


