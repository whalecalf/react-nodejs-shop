'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    message,
} from 'antd';
import { StoreType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs, { locale } from 'dayjs';
import Content from '../Content';
import { storeAdd, storeUpdate } from '@/apis/store';

export default function StoreForm({ title,
    editData = {
        _id: "",
    }, }: {
        title: string;
        editData?: Partial<StoreType>
    }) {

    const router = useRouter()
    const [form] = Form.useForm()

    useEffect(() => {
        console.log(editData);
        if (editData._id) {
            // console.log("editData._id");
            form.setFieldsValue({
                ...editData,
                createdAt: dayjs(editData.createdAt),
            })
        }
    }, [editData, form])


    const handleFormFinished = async (values: StoreType) => {
        // console.log(values);
        if (editData._id) {
            values.createdAt = dayjs(values.createdAt).valueOf()
            await storeUpdate(editData._id,values)
            message.success('更新成功')
            router.push("/store")
        }else {
            values.createdAt = dayjs(values.createdAt).valueOf()
            values.owner=  JSON.parse(localStorage.getItem('user')||'').info._id
            await storeAdd(values);
            message.success('创建成功')
            router.push("/store")
        }
        
    }


    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={handleFormFinished}
                initialValues={editData}
                form={form}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="注册资金"
                    name="capital"
                    >
                    {editData._id?<InputNumber disabled placeholder='请输入' />:<InputNumber placeholder='请输入' />}
                </Form.Item>


                

            

                <Form.Item
                    label="状态"
                    name="status"
                    >
                    <Radio.Group>
                        <Radio value="on">正常</Radio>
                        <Radio value="off">关闭</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item 
                label="创建日期"
                name="createdAt"
                initialValue={dayjs(editData?editData.createdAt:undefined)}>
                    <DatePicker 
                    ></DatePicker>
                </Form.Item>
               
                <Form.Item colon={false}>
                    <Button size='large' htmlType='submit' className={styles.btn} >{editData?._id?"更新":"创建"}</Button>
                </Form.Item>

            </Form>
        </Content>
    )
}
