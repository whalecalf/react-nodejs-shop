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
const express_1 = __importDefault(require("express"));
const model_1 = require("../model");
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current = 1, pageSize = 20, buyer, seller, status } = req.query;
    const data = yield model_1.Order.find(Object.assign(Object.assign(Object.assign({}, (buyer && { buyer })), (status && { status })), (seller && { seller })))
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize))
        .populate('buyer')
        .populate('comment')
        .populate('goods');
    const total = yield model_1.Order.countDocuments(Object.assign(Object.assign({}, (status && { status })), (seller && { seller })));
    // console.log("orderdata",data);
    return res.status(200).json({ data, total });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderModel = new model_1.Order(Object.assign({}, req.body));
    var id;
    yield orderModel.save().then(res => {
        id = res._id;
    });
    return res.json({ success: true, code: 200, id: id });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield model_1.Order.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield model_1.Order.findById(id).populate('goods').populate('buyer').populate('comment');
    // console.log(goods);
    if (category) {
        res.status(200).json({ data: category, success: true });
    }
    else {
        res.status(500).json({ message: '该订单不存在' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    yield model_1.Order.findOneAndUpdate({ _id: id }, { $set: Object.assign({}, body) });
    return res.status(200).json({ success: 'true' });
}));
exports.default = router;
