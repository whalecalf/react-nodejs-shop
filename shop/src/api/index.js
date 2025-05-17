import axios from "../utils/request";
import qs from "querystring"

const api={

    // 注册
    sign(params){
        return axios.post('/api/users',params)
    },

    // 登录
    login(params){        
        return axios.post('/api/users/login',params)
    },

    // 获取分类
    category(params){
        return axios.get(`/api/categories?${qs.stringify(params)}`)
    },

    // 获取七牛云token
    getToken(){
        return axios.post('/api/upload')
    },

    // 更改用户信息
    updateUser(id,params){
        return axios.put(`/api/users/${id}`,params)
    },

    //新增收货地址
    addAddress(params){
        return axios.post('/api/address',params)
    },

    // 获取收货地址列表
    getAddressList(params){
        return axios.get('/api/address',params)
    },

    // 删除地址
    deleteAddress(id){
        return axios.delete(`/api/address/${id}`)
    },
    // 设置所有收货地址不为默认地址
    setNotDefault(){
        return axios.put('/api/address')
    },
    // 查找地址
    getAddressById(id){
        return axios.get(`/api/address/${id}`)
    },
    // 更新地址
    updateAddress(id,params){
        return axios.put(`/api/address/${id}`,params)
    },

    // 获取商品详情
    getGoods(id){
        return axios.get(`/api/goods/${id}`)
    },

    // 加入购物车
    AddCart(params){
        return axios.post('/api/cart',params)
    },
    // 获取用户购物车
    getCart(params){
        return axios.get('/api/cart',params)
    },
    // 更新用户购物车
    updateCart(id,params){
        return axios.put(`/api/cart/${id}`,params)
    },
    // 删除购物车
    deleteCart(id){
        return axios.delete(`/api/cart/${id}`)
    },
    // 设置商品购买
    setBuyCart(id,params){
        return axios.put(`/api/cart/buy/${id}`,params)
    },

    // 获取用户收藏列表
    getCollect(params){
        return axios.get('/api/collect',params)
    },
    // 设置商品收藏
    setCollect(params){
        return axios.post('/api/collect',params)
    },
    // 取消收藏
    deleteCollect(id){
        return axios.delete(`/api/collect/${id}`)
    },
    // 新增订单
    addOrder(params){
        return axios.post('/api/orders',params)
    },
    // 修改订单
    updateOrder(id,params){
        return axios.put(`/api/orders/${id}`,params)
    },
    // 获取订单列表
    getOrderList(params){
        return axios.get('/api/orders',params)
    },
    // 删除订单
    deleteOrder(id){
        return axios.delete(`/api/orders/${id}`)
    },
    // 获取评论
    getComment(params){
        return axios.get('/api/comment',params)
    },
    // 新增评论
    AddComment(params){
        return axios.post('/api/comment',params)
    },
    // 获取评论
    getCommentDetails(id){
        return axios.get(`/api/comment/${id}`)
    },
    // 获取用户详情
    getUserDetails(id){
        return axios.get(`/api/users/${id}`)
    },
    // 搜索商品
    search(keywords){
        return axios.get(`api/goods`,{name:keywords})
    },
    //  获取商品列表
    getGoodsList(params){
        return axios.get(`api/goods`,params)
    }
}

export default api;