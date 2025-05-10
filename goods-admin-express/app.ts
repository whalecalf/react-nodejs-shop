import GoodsRouter from './routes/goods'
import CategoryRouter from './routes/category'
import UserRouter from './routes/user'
import LogRouter from './routes/logs'
import OrderRouter from './routes/order'
import StoreRouter from './routes/store'
import CommentRouter from './routes/comment'
import UploadRouter from './routes/upload'
import AddressRouter from './routes/address'
import CartRouter from './routes/cart'
import CollectRouter from './routes/collect'

import express, {Response,Request,NextFunction} from 'express'
import { SECRET_KEY } from "./constant";
import { expressjwt } from "express-jwt";
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// var express = require('express');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var mongoClient = require('./model/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(expressjwt({ secret: SECRET_KEY, algorithms:['HS256']}).unless({
  path:['/api/users/login','/api/users'],
}))

app.use('/api/goods',GoodsRouter)
app.use('/api/categories',CategoryRouter)
app.use('/api/users',UserRouter)
app.use('/api/logs',LogRouter)
app.use('/api/orders',OrderRouter)
app.use('/api/store',StoreRouter)
app.use('/api/comment',CommentRouter)
app.use('/api/upload',UploadRouter)
app.use('/api/address',AddressRouter)
app.use('/api/cart',CartRouter)
app.use('/api/collect',CollectRouter)


// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});


// 配置端口
var ServerConf=require('../public/config/serverConf');

process.env.PORT=ServerConf.ServicePort;

app.listen('3005',()=>{
  console.log('server started at 3005');
})



module.exports = app;
