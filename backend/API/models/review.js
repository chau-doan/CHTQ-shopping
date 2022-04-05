import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    comment:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    }
},{
    timestamps: true,
});

export default reviewSchema;