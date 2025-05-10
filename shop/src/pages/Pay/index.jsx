import React, {useEffect} from 'react'
import PubHeader from '../../components/PubHeader'
import styles from './index.module.less'
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';

function Pay() {

    const {state} = useLocation();
    const {orderList} = state
    const {selectedList}=state
    const navigate = useNavigate()
    // console.log(state);

    useEffect(()=>{
      const clearCart=async()=>{
        for (let i = 0; i < selectedList.length; i++) {
        const id=selectedList[i]._id;
        await api.deleteCart(id)
      }
      }
      clearCart()
    },[selectedList])

    const handleCancel=()=>{
        navigate('/orderList')
    }

    const handlePay=async ()=>{
        for (let i = 0; i < orderList.length; i++) {
            const element = orderList[i];
            await api.updateOrder(element,{status:"paid"})
        }
        navigate('/orderList')
    }

  return (
    <div>
      <PubHeader title={'订单支付'}/>
      <span className={styles.total}>总计：￥{state.sum}</span>
      <div className={styles.confirm}><button onClick={handleCancel}>取消</button>&nbsp;<button onClick={handlePay}>支付</button></div>
    </div>
  )
}

export default Pay
