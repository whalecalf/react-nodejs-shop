import mongoose from "mongoose"
import userSchema from "./userModel";
import goodsSchema from "./goodsModel";
import categorySchema from "./categoryModel";
import logsSchema from "./logModel";
import orderSchema from "./orderModel";
import storeSchema from "./storeModel";
import commentSchema from "./commentModel";
import addressSchema from "./AddressModel";
import cartsSchema from "./cartsModel";
import collectSchema from "./collectModel";

var uri = "mongodb://michi:michi@ac-usfl17y-shard-00-00.ttw55qy.mongodb.net:27017,ac-usfl17y-shard-00-01.ttw55qy.mongodb.net:27017,ac-usfl17y-shard-00-02.ttw55qy.mongodb.net:27017/?ssl=true&replicaSet=atlas-dh4sso-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

async function main() {
    mongoose.connect(uri)
}

main().then(()=>{
    console.log("MongoDB Connected");
    
}).catch((err)=>{
    console.log(err);
    
})

const User=mongoose.model('User',userSchema);
const Goods=mongoose.model('Goods',goodsSchema);
const Category=mongoose.model('Category',categorySchema)
const Log=mongoose.model('Log',logsSchema)
const Order=mongoose.model('Order',orderSchema)
const Store = mongoose.model('Store',storeSchema)
const Comment = mongoose.model('Comment',commentSchema)
const Address = mongoose.model('Address',addressSchema)
const Cart = mongoose.model('Cart',cartsSchema)
const Collect = mongoose.model('Collect',collectSchema)

export {User, Goods, Category, Log, Order, Store, Comment, Address, Cart, Collect}