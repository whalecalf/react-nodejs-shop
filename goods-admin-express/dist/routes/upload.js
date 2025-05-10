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
const qiniu_1 = __importDefault(require("qiniu"));
var router = express_1.default.Router();
const Qiniu = {
    AK: '',
    SK: ''
};
qiniu_1.default.conf.ACCESS_KEY = Qiniu.AK;
qiniu_1.default.conf.SECRET_KEY = Qiniu.SK;
// 七牛那边的对应的bucket名称
const bucket = ' ';
const getToken = () => {
    const putPolicy = new qiniu_1.default.rs.PutPolicy({
        scope: bucket
    });
    const token = putPolicy.uploadToken();
    console.log(token);
    return token;
};
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getToken();
    console.log(token);
    return res.status(200).json({ token: token });
}));
exports.default = router;
