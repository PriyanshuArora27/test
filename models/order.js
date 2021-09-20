import mongoose from 'mongoose';
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

const ProductCartSchema= new Schema({

    product:{
        type:ObjectId,
        ref:"Product",
    },
    name:String,
    count:Number,
    price:Number
});

export const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

const OrderSchema = new Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address: String,
    updated:Date,
    user:{
        type:{ObjectId},
        ref:"User"
    }
},{timestamps:true})

export const Order = mongoose.model("Order",OrderSchema);

