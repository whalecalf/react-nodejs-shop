import React,{useEffect,useState} from "react";
import api from '../../../api'
import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.less'
import PubHeader from "../../../components/PubHeader";
import { Button, Tag } from "antd";

const OrderList=()=>{

    const userinfo=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).info : {}
    const [orderList,setOrderList]=useState([])
    const navigate=useNavigate()

    const fetchData=async()=>{
            await api.getOrderList({buyer:userinfo._id}).then(res=>{
                setOrderList(res.data.data||[])
            })
        }

    useEffect(()=>{
        
        fetchData()
    },[userinfo._id])

    const handleDelete=async (id)=>{
        await api.deleteCart(id)
        fetchData()
    }

    const handlePay=async (element)=>{
        const sum = element.goods.price * element.num
        navigate('/pay',{state:{orderList:[element._id],sum:sum,selectedList:[]}})
    }

    const handleConfirm=async (element)=>{
        await api.updateOrder(element._id,{status:"received",confirmedAt:Date.now()})
        fetchData()
    }

    const handleComment=async(element)=>{
        if (element.comment) {
            navigate('/comment',{state:{comment:element.comment}})
        }else{
            navigate('/comment',{state:{orderid:element._id}})
        }
        
    }

    const handleRefund=(element)=>{
        navigate('/refund',{state:{order:element}})
    }

    return(
        <div>
            <PubHeader title={'订单列表'} ishidden={true}/>
           <div className={styles.main}>
                <ul>
                    {
                        orderList.map((element, index) => {
                            var status;
                            switch (element.status) {
                                case "unpaid":
                                  status = <Tag color="purple">待付款</Tag>
                                  break;
                                case "paid":
                                  status = <Tag color="gold">已付款</Tag>;
                                  break;
                                case "delivered":
                                  status = <Tag color="green">已发货</Tag>;
                                  break;
                                case "received":
                                  status = <Tag color="blue">已收货</Tag>;
                                  break;
                                case "waitRefund":
                                  status = <Tag color="red">待退款</Tag>;
                                  break;
                                case "refunded":
                                  status = <Tag>已退款</Tag>;
                                  break;
                                default:
                                  status = <Tag>{element.status}</Tag>;
                                  break;
                              }
                            return (
                                <div >
                                    <li className={styles.list} key={index}>
                                        <img src={element.goods.pics[0].url} alt="" />
                                        <div>
                                            <Link to={`/details/${element.goods._id}`}><span>{element.goods.name}</span></Link>
                                            <span>￥{element.goods.price}</span>
                                            <span>数量：{element.num}</span>
                                            <div className={styles.tag}>状态：{status}
                                            {element.status==="unpaid"?<button onClick={()=>handlePay(element)}>去支付</button>:""}
                                            {element.status==="delivered"?<span>物流号：{element.ems}<button onClick={()=>handleConfirm(element)}>确认收货</button></span>:""}
                                            </div>
                                            <span><i onClick={() => handleDelete(element._id)} className="iconfont icon-shanchu-01">删除&nbsp;</i>
                                            {element.status==="received"?(element.comment?<Button type="link" onClick={()=>handleComment(element)}>查看评价</Button>:<button onClick={()=>handleComment(element)}>去评价</button>):""}
                                            {element.status!=="waitRefund"&&element.status!=="refunded"&&element.status!=="unpaid"?<button onClick={()=>handleRefund(element)}>退款</button>:""}
                                            </span>
                                        </div>

                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default OrderList;