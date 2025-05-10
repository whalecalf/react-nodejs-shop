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
    const { current = 1, pageSize = 20, user } = req.query;
    const data = yield model_1.Address.find(Object.assign({}, (user && { user })))
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize))
        .populate({ path: 'user' });
    // console.log("goodsdata",data);
    return res.status(200).json({ data });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addressModel = new model_1.Address(Object.assign({}, req.body));
    addressModel.save();
    return res.json({ success: true, code: 200 });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield model_1.Address.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield model_1.Address.findById(id);
    // console.log(goods);
    if (category) {
        res.status(200).json({ data: category, success: true });
    }
    else {
        res.status(500).json({ message: '该地址不存在' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    yield model_1.Address.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: 'true' });
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.Address.updateMany({}, { $set: { isDefault: false } });
    return res.status(200).json({ success: 'true' });
}));
exports.default = router;
