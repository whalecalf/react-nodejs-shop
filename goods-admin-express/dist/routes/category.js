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
    const { current = 1, pageSize = 20, name, level, parent } = req.query;
    const data = yield model_1.Category.find(Object.assign(Object.assign(Object.assign({}, (name && { name })), (level && { level })), (parent && { parent })))
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize))
        .populate({ path: 'parent' });
    const total = yield model_1.Category.countDocuments(Object.assign(Object.assign({}, (name && { name })), (level && { level })));
    console.log("goodsdata", data);
    return res.status(200).json({ data: { data, total } });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const oldCategory = yield model_1.Category.findOne({ name });
    if (oldCategory) {
        return res.status(500).json({ message: '该分类已存在' });
    }
    else {
        const categoryModel = new model_1.Category(Object.assign({}, req.body));
        categoryModel.save();
        return res.json({ success: true, code: 200 });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield model_1.Category.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield model_1.Category.findById(id);
    // console.log(goods);
    if (category) {
        res.status(200).json({ data: category, success: true });
    }
    else {
        res.status(500).json({ message: '该分类不存在' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    yield model_1.Category.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: 'true' });
}));
exports.default = router;
