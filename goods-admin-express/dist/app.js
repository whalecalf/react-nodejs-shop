"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const goods_1 = __importDefault(require("./routes/goods"));
const category_1 = __importDefault(require("./routes/category"));
const user_1 = __importDefault(require("./routes/user"));
const logs_1 = __importDefault(require("./routes/logs"));
const order_1 = __importDefault(require("./routes/order"));
const store_1 = __importDefault(require("./routes/store"));
const comment_1 = __importDefault(require("./routes/comment"));
const upload_1 = __importDefault(require("./routes/upload"));
const address_1 = __importDefault(require("./routes/address"));
const cart_1 = __importDefault(require("./routes/cart"));
const collect_1 = __importDefault(require("./routes/collect"));
const express_1 = __importDefault(require("express"));
const constant_1 = require("./constant");
const express_jwt_1 = require("express-jwt");
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// var express = require('express');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var mongoClient = require('./model/index')
var app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_jwt_1.expressjwt)({ secret: constant_1.SECRET_KEY, algorithms: ['HS256'] }).unless({
    path: ['/api/users/login', '/api/users'],
}));
app.use('/api/goods', goods_1.default);
app.use('/api/categories', category_1.default);
app.use('/api/users', user_1.default);
app.use('/api/logs', logs_1.default);
app.use('/api/orders', order_1.default);
app.use('/api/store', store_1.default);
app.use('/api/comment', comment_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/address', address_1.default);
app.use('/api/cart', cart_1.default);
app.use('/api/collect', collect_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// 配置端口
var ServerConf = require('../public/config/serverConf');
process.env.PORT = ServerConf.ServicePort;
app.listen('3005', () => {
    console.log('server started at 3005');
});
module.exports = app;
