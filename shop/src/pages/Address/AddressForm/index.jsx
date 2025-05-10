import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Switch, Cascader, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import PubHeader from '../../../components/PubHeader'
import styles from './index.module.less'
import { cityOptions } from '../../../data/city'
import api from '../../../api'
import { useParams } from 'react-router-dom'

export default function AddressForm() {

    const [isDefault, setDefault] = useState(false)
    const [form] = Form.useForm()
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const id = useParams().id

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.getAddressById(id)
            // console.log(res);
            form.setFieldsValue(res.data.data)
            setDefault(res.data.data.isDefault)
        }
        if (id) {
            fetchData(id)

        }
    }, [])

    const handleDefault = (e) => {
        setDefault(e)
    }

    const handleFormFinished = async (values) => {
        values.user = userInfo.info._id
        if (isDefault) {
            await api.setNotDefault()
        }
        values.isDefault = isDefault
        console.log(values);
        if (id) {
            await api.updateAddress(id,values)
            message.success('修改成功')
        } else {
            await api.addAddress(values)
            message.success('新建成功')
        }

    }

    const handleArea = (e) => [
        console.log(e)
    ]

    return (
        <div>
            <PubHeader title={id ? '编辑地址' : '新增地址'} />
            <Form
                style={{ marginTop: '30px' }}
                layout="horizontal"
                onFinish={handleFormFinished}
                form={form}>
                <Form.Item
                    label='收货人'
                    name='name'
                    rules={[{
                        required: true,
                        message: "请输入收货人姓名"
                    }]}>
                    <Input placeholder='请输入收货人姓名'></Input>
                </Form.Item>
                <Form.Item
                    label='联系电话'
                    name='phone'
                    rules={[{
                        required: true,
                        message: "请输入联系电话"
                    }]}>
                    <Input placeholder='请输入联系电话'></Input>
                </Form.Item>
                <Form.Item
                    label='所在地区'
                    name='area'
                    rules={[{
                        required: true,
                        message: "请选择所在地区"
                    }]}>
                    <Cascader
                        options={cityOptions}
                        showSearch
                        onChange={handleArea} />
                </Form.Item>
                <Form.Item
                    label='详细地址'
                    name='detail'
                    rules={[{
                        required: true,
                        message: "请输入详细地址"
                    }]}>
                    <TextArea placeholder='请输入详细地址 区、街道、小区、写字楼、门牌号等'></TextArea>
                </Form.Item>
                <Form.Item
                    label='设为默认地址'
                    name={'isDefault'}
                    colon={false}>
                    <Switch
                        onChange={handleDefault} />
                </Form.Item>
                <Form.Item
                    colon={false}>
                    <Button
                        className={styles.saveButton}
                        htmlType='submit'
                    >保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
