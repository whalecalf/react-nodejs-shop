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
    const { current = 1, pageSize = 20, user, goods } = req.query;
    const data = yield model_1.Comment.find(Object.assign(Object.assign({}, (user && { user })), (goods && { goods })))
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize))
        .populate('user')
        .populate('response');
    const total = yield model_1.Comment.countDocuments(Object.assign({}, (user && { user })));
    // console.comment("commentsdata",data);
    return res.status(200).json({ data, total });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const commentModel = new model_1.Comment(Object.assign({}, body));
    let comId;
    yield commentModel.save().then((res) => [
        console.log(res._id),
        comId = res._id,
    ]);
    //  console.log('id',comId);
    return res.json({ data: { id: comId }, success: true, code: 200 });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield model_1.Comment.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const comment = yield model_1.Comment.findById(id).populate('user').populate('response');
    // console.comment(goods);
    if (comment) {
        res.status(200).json({ data: comment, success: true });
    }
    else {
        res.status(500).json({ message: '该评论不存在' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    yield model_1.Comment.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: 'true' });
}));
exports.default = router;
