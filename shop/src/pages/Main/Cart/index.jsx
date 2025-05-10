import React, { useEffect, useState } from "react";
import api from "../../../api";
import PubHeader from "../../../components/PubHeader";
import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.less'
import { message } from "antd";

const Cart = () => {

    const navigate = useNavigate()
    const [goodsList, setGoodsList] = useState([])
    const [sum, setSum] = useState(0)
    const userinfo=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).info : {}
    var selectedList = [];
    var orderList=[]

    const fetchData = async () => {
        await api.getCart().then(res => {
            console.log(res);
            setGoodsList([]||res.data.data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const jia = async (element) => {
        console.log(element);
        var num = document.getElementById(element._id).value
        num++
        element.num = num
        await api.updateCart(element._id, element)
        // console.log(num);
        document.getElementById(element._id).value = num;
    }
    const jian = async (element) => {
        console.log(element);
        var num = document.getElementById(element._id).value
        if (num <= 0) {
            handleDelete(element._id)
        } else {
            num--
            document.getElementById(element._id).value = num;
        }
        element.num = num
        await api.updateCart(element._id, element)
    }

    const handleAllselect = () => {
        var list = document.getElementsByName("tick")
        var k = document.getElementsByName("all")
        var sum = 0;
        if (k[0].checked) {
            for (var i = 0; i < list.length; i++) {
                list[i].checked = true;
                sum += (goodsList[i].goods.price * goodsList[i].num)
            }

        } else {
            for (i = 0; i < list.length; i++) {
                list[i].checked = false;
            }
        }
        setSum(sum)
    }

    const handleSingleSelect = () => {
        var k = document.getElementsByName("all")
        var list = document.getElementsByName("tick")
        console.log(list);
        var flag = false;
        var sum = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                // console.log(goodsList[i]);
                sum += (goodsList[i].goods.price * goodsList[i].num)
            } else {
                flag = true;
            }

        }
        setSum(sum)

        if (flag) {
            k[0].checked = false;
        } else {
            k[0].checked = true;
        }
    }

    const handleDelete = async (id) => {
        await api.deleteCart(id)
        fetchData()
    }

    const handleBuy = async () => {
        if (sum === 0) {
            message.warning("您还未选择商品")
        } else {
            var list = document.getElementsByName("tick")
            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    selectedList.push(goodsList[i])
                    var order = {}
                    order.status = "unpaid";
                    order.buyer = userinfo._id;
                    order.seller = goodsList[i].goods.seller;
                    order.goods = goodsList[i].goods;
                    order.num = goodsList[i].num;
                    // console.log(order);
                    await api.addOrder(order).then(res=>{
                        // console.log(res);
                        orderList.push(res.data.id)
                    })
                }
            }

            navigate('/order', { state: { selectedList, sum, orderList } })
        }

    }

    return (
        <div>
            <PubHeader title={'购物车'} ishidden={true} />
            <span className={styles.all}><input type="checkbox" onClick={handleAllselect} name="all" id="" />  &nbsp;全选</span>
            <div className={styles.main}>
                <ul>
                    {
                        goodsList.map((element, index) => {
                            return (
                                <div >
                                    <li className={styles.list} key={index}>
                                        <input onClick={() => handleSingleSelect()} className={styles.tick} type="checkbox" name="tick" />
                                        <img src={element.goods.pics[0].url} alt="" />
                                        <div>
                                            <Link to={`/details/${element.goods._id}`}><span>{element.goods.name}</span></Link>
                                            <span>￥{element.goods.price}</span>
                                            <span><i onClick={() => handleDelete(element._id)} className="iconfont icon-shanchu-01">删除&nbsp;</i><button onClick={() => jia(element)}>+</button>
                                                <input id={element._id} value={element.num} />
                                                <button onClick={() => jian(element)}>-</button></span>
                                        </div>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={styles.buy}>总计：￥{sum}<button onClick={handleBuy}>购买</button></div>
        </div>
    )
}

export default Cart;