import React from 'react'
import PubHeader from '../../components/PubHeader'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import api from '../../api'

function Order() {

  const navigate=useNavigate()
  const {state} = useLocation()
  const {selectedList}=state
  const {orderList}=state

  // console.log(state)
  

  const handleCancel=async()=>{
    for (let i = 0; i < orderList.length; i++) {
      const element = orderList[i];
      await api.deleteOrder(element)
    }
    window.history.back()
  }

  const handlePay=()=>{
    navigate('/pay',{state:{...state}})
  }

  return (
    <div>
      <PubHeader title={'新增订单'} />
      <span className={styles.title}>订单详情：</span>
      <div className={styles.main}>
                <ul>
                    {
                        selectedList.map((element, index) => {
                            return (
                                <div >
                                    <li className={styles.list} key={index}>
                                        <img src={element.goods.pics[0].url} alt="" />
                                        <div>
                                            <Link to={`/details/${element.goods._id}`}><span>{element.goods.name}</span></Link>
                                            <span>￥{element.goods.price}</span>
                                            <span>数量：{element.num}</span>
                                        </div>

                                    </li>
                                </div>

                            )
                        })
                    }
                </ul>
      </div>
      <div className={styles.total}>总计：￥{state.sum}元</div>
      <div className={styles.confirm}><button onClick={handleCancel}>取消</button>&nbsp;<button onClick={handlePay}>去支付</button></div>
    </div>
  )
}

export default Order
