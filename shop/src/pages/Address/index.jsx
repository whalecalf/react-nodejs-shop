import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PubHeader from '../../components/PubHeader'
import { Button, Modal, message } from 'antd'
import styles from './index.module.less'
import api from '../../api'

export default function Address() {

  const userInfo = JSON.parse(localStorage.getItem("user")).info
  const [addressList, setAddressList] = useState([])
  const fetchData = async () => {
    var params = {}
    params.user = userInfo._id
    const res = await api.getAddressList(params)
    console.log(res);
    setAddressList(res.data.data)
  }

  useEffect(() => {

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "确定删除?",
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await api.deleteAddress(id)
        // console.log(id);
        message.success("删除成功")
        fetchData()
      },
      onCancel() {

      }
    })
  }

  return (
    <div className={styles.container}>
      <PubHeader title={'地址管理'} />
      <div >
        {addressList.map((element, index) => {
          return (
            <div className={styles.box}>
              <span>收货人姓名：{element.name}{element.isDefault?<label style={{float:'right', fontWeight:'bold'}}><i style={{color:'#fd9535'}} className='iconfont icon-morendizhi'></i>默认地址</label>:""}</span>
              <span>联系电话：{element.phone}</span>
              <span>详细地址：{element.area[0] + element.area[1] + element.detail}</span>
              <span> <a href='javascript:void(0);' onClick={() => handleDelete(element._id)} className='iconfont icon-shanchu-01'>删除</a>&nbsp;&nbsp;<Link to={`/address/edit/${element._id}`}><i className='iconfont icon-bianji'>编辑</i></Link> </span>
            </div>
          )
        })}
      </div>

      <Button
        className={styles.newButton}
        href='/#/address/add'
      >+ 新 建 地 址</Button>
    </div>
  )
}
