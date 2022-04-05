import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user: {
        type:       mongoose.Types.ObjectId,
        required:   true
    },
    itemList: [{
        product: {
            type:       mongoose.Schema.Types.ObjectId,
            ref:        'Product',
        },
        qty: {
            type:       Number,
            default:    1
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;