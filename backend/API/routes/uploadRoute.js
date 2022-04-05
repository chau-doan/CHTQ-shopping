import multer from 'multer';
import express from 'express';
import { isAdmin, isAuth } from '../middleware/middleware.js';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const uploadRoute = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    },
})

const upload = multer({storage});

uploadRoute.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res
        .status(200)
        .send(`/${req.file.path}`);
})

aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-1',
});

const s3 = new aws.S3();
const storageS3 = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'shoppingcart-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    },
});

const uploadS3 = multer({storage: storageS3});


uploadRoute.post('/s3', uploadS3.single('image'), (req, res) => {
    res
        .status(200)
        .send(req.file.location);
});

export default uploadRoute;