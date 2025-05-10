"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collect = exports.Cart = exports.Address = exports.Comment = exports.Store = exports.Order = exports.Log = exports.Category = exports.Goods = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const goodsModel_1 = __importDefault(require("./goodsModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
const logModel_1 = __importDefault(require("./logModel"));
const orderModel_1 = __importDefault(require("./orderModel"));
const storeModel_1 = __importDefault(require("./storeModel"));
const commentModel_1 = __importDefault(require("./commentModel"));
const AddressModel_1 = __importDefault(require("./AddressModel"));
const cartsModel_1 = __importDefault(require("./cartsModel"));
const collectModel_1 = __importDefault(require("./collectModel"));
var uri = "mongodb://michi:michi@ac-usfl17y-shard-00-00.ttw55qy.mongodb.net:27017,ac-usfl17y-shard-00-01.ttw55qy.mongodb.net:27017,ac-usfl17y-shard-00-02.ttw55qy.mongodb.net:27017/?ssl=true&replicaSet=atlas-dh4sso-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(uri);
    });
}
main().then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});
const User = mongoose_1.default.model('User', userModel_1.default);
exports.User = User;
const Goods = mongoose_1.default.model('Goods', goodsModel_1.default);
exports.Goods = Goods;
const Category = mongoose_1.default.model('Category', categoryModel_1.default);
exports.Category = Category;
const Log = mongoose_1.default.model('Log', logModel_1.default);
exports.Log = Log;
const Order = mongoose_1.default.model('Order', orderModel_1.default);
exports.Order = Order;
const Store = mongoose_1.default.model('Store', storeModel_1.default);
exports.Store = Store;
const Comment = mongoose_1.default.model('Comment', commentModel_1.default);
exports.Comment = Comment;
const Address = mongoose_1.default.model('Address', AddressModel_1.default);
exports.Address = Address;
const Cart = mongoose_1.default.model('Cart', cartsModel_1.default);
exports.Cart = Cart;
const Collect = mongoose_1.default.model('Collect', collectModel_1.default);
exports.Collect = Collect;
