import React from 'react'
import PubHeader from '../../components/PubHeader'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import api from '../../api'
import Input from 'antd/es/input/Input'

function Refund() {

  const navigate = useNavigate()
  const { state } = useLocation()
  const { order } = state
  var ems

  // console.log(state)


  const handleCancel = async () => {
    navigate('/orderList')
  }

  const handleRefund =async() => {
    await api.updateOrder(order._id,{ems:ems,status:"waitRefund"})
    navigate('/orderList')
  }

  return (
    <div>
      <PubHeader title={'订单退款'} />
      <span className={styles.title}>订单详情：</span>
      <div className={styles.main}>
        <ul>
          <div >
            <li className={styles.list} key={1}>
              <img src={order.goods.pics[0].url} alt="" />
              <div>
                <Link to={`/details/${order.goods._id}`}><span>{order.goods.name}</span></Link>
                <span>￥{order.goods.price}</span>
                <span>数量：{order.num}</span>
              </div>

            </li>
          </div>
        </ul>
      </div>
      <div className={styles.total}>总计：￥{order.goods.price*order.num}元</div>
      <Input
      className={styles.input}
       onChange={(e)=>{
            ems=e.target.value
           }} placeholder="请输入退货物流单号"></Input>
      <div className={styles.confirm}><button onClick={handleCancel}>取消</button>&nbsp;<button onClick={handleRefund}>确认退款</button></div>
    </div>
  )
}

export default Refund
