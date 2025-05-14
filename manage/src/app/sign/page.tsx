'use client'
import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    message,
} from 'antd';
import styles from './index.module.css'
import { userAdd } from '@/apis/user';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function Sign(){
    const [form] = Form.useForm();
    const router=useRouter()


    const onFinish = async (values: any) => {
        // console.log('Received values of form: ', values);
        values.nickName=values.name
        const res = await userAdd(values) as any
        if (res.success) {
            message.success('注册成功')
            router.push('/login')
        }
        
    };

    return (
        <div className={styles.container}> 
        <h1 className={styles.title}>商城用户注册</h1>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                name="name"
                label="账号"
                rules={[{ required: true, message: '请输入账号', whitespace: true }]}
                tooltip="账号由用户自定义，但不可重复"
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次密码不一致'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true, message: '请输入手机号' }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                    label="角色"
                    name="role"
                    rules={[{
                        required: true,
                        message: "请选择角色"
                    }]}>
                    <Radio.Group>
                        <Radio value="buyer">买家</Radio>
                        <Radio value="seller">商家</Radio>
                        <Radio value="admin">管理员</Radio>
                    </Radio.Group>
                </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form></div>
       
    );
};

