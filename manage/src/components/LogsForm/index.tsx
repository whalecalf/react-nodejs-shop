'use client'
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    message,
} from 'antd';
import { LogsType, UserType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs from 'dayjs';
import Content from '../Content';
import { logsAdd, logsUpdate } from '@/apis/log';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function LogsForm({ title, data }: { title: string; data?: LogsType }) {

    const router = useRouter()
    const [form]=Form.useForm()

    const handleFormFinished = async (values: LogsType) => {
        if (values.time) {
            values.time = dayjs(values.time).valueOf()
        }
        const userStorage = localStorage.getItem("user");
        console.log();
        
        if (userStorage) {
            values.user=JSON.parse(userStorage).info
            console.log(values.user);
            
            await logsAdd(values)
            message.success('创建成功')
            router.push("/log")
        }
        

        
        // router.push("/logs")
    }


    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={handleFormFinished}
                form={form}
            >
                <Form.Item
                    label="操作名称"
                    name="name"
                    rules={[{
                        required: true,
                        message: "请输入名称"
                    }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item
                    label="操作类型"
                    name="type"
                    rules={[{
                        required: true,
                        message: "请选择类型"
                    }]}>
                    <Select placeholder='请选择' 
                        options={[
                            {
                              value: '新增',
                              label: '新增',
                            },
                            {
                              value: '修改',
                              label: '修改',
                            },
                            {
                              value: '删除',
                              label: '删除',
                            },
                          ]}>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="ip地址"
                    name="address"
                    rules={[{
                        required: true,
                        message: "请输入ip地址"
                    }]}>
                    <Input placeholder='请输入ip地址' />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                    rules={[{
                        required: true,
                        message: "请输入描述"
                    }]}>
                    <TextArea className={styles.ta} placeholder='请输入' rows={4} cols={5} />
                </Form.Item>

                
                <Form.Item colon={false}>
                    <Button size='large' htmlType='submit' className={styles.btn} >创建</Button>
                </Form.Item>
            </Form>
        </Content>
    )
}
