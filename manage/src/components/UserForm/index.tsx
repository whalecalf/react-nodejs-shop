'use client'
import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Radio,
    message,
    Upload as AntdUpload,
} from 'antd';
import { UserType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs from 'dayjs';
import Content from '../Content';
import { userAdd, userUpdate } from '@/apis/user';
import { USER_ROLE, USER_SEX, USER_STATUS } from '@/constant/user';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload as imgUpload } from '@/apis/upload';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


export default function UserForm({ title,
    editData = {
        sex: USER_SEX.MALE,
        status: USER_STATUS.ON,
        role: USER_ROLE.BUYER,
        _id: "",
    }, }: {
        title: string;
        editData?: Partial<UserType>
    }) {

    const router = useRouter()
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // 用来预览弹出预览图片的Modal框框
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    // 存储七牛返回的token值
    const [token, setToken] = useState("")
    // 存取上传七牛返回的值
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        console.log(editData);
        if (editData._id) {
            // console.log("editData._id");
            form.setFieldsValue(editData)
        }
    }, [editData, form])


    const handleFormFinished = async (values: UserType) => {
        console.log(values);
        if (editData._id) {
            values.avatar=imageUrl || ""
            await userUpdate(editData._id, values)
            message.success('更新成功')
            router.push("/user")
        } else {
            values.avatar=imageUrl || ""
            await userAdd(values);
            message.success('创建成功')
            router.push("/user")
        }

    }

    useEffect(()=>{
        const fetchToken=async ()=>{
          await imgUpload().then(res=>{
            console.log('token',res.data.token);
            setToken(res.data.token)
          })
          
        }
        fetchToken()
      },[])
    
      const beforeUpload = (file: FileType) => {   
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }    
        return isJpgOrPng;
      };
    
      // 预览
      const handlePreview = (file: any) => {
        console.log(file);
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
      };
    
      const handleCancel = () => {
        setPreviewVisible(false);
        setPreviewImage("")
      };
    
    
      const handleChange = (info: any) => {
        const file = info.file;
        // console.log(file);
        // console.log('Token',token);
        const fileList = info.fileList
        console.log('fileList', info.fileList);
        
        const { uid, name, type, thumbUrl, status, response = {} } = file;
        const fileItem = {
          uid,
          name,
          type,
          thumbUrl,
          status,
          url: "http://sbwwsba9t.hn-bkt.clouddn.com/" + (response.hash || "")
        };
        fileList.pop();
        fileList.push(fileItem);
        setImageUrl(fileItem.url)
        // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
        console.log(fileList);
        setFileList([...fileList as never]);
      };
    
      const handleRemove=(info:any)=>{
        console.log(info);
        let index = fileList.indexOf(info as never);
        console.log(index);
        
        if (index !== -1) {
          fileList.splice(index, 1);
          setPreviewImage("")
        }
        
        setFileList(fileList)
      }
    
      const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传</div>
        </button>
      );


    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={handleFormFinished}
                initialValues={editData}
                form={form}
            >
                <Form.Item
                    label="账号"
                    name="name"
                    rules={[{
                        required: true,
                        message: "请输入账号"
                    }]}>
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="名称"
                    name="nickName"
                    rules={[{
                        required: true,
                        message: "请输入名称"
                    }]}>
                    <Input placeholder='请输入' />
                </Form.Item>


                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[{
                        required: true,
                        message: "请选择性别"
                    }]}>
                    <Radio.Group
                    >
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{
                        required: true,
                        message: "请输入密码"
                    }]}>
                    <Input.Password placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="状态"
                    name="status"
                    rules={[{
                        required: true,
                        message: "请选择状态"
                    }]}>
                    <Radio.Group>
                        <Radio value="on">正常</Radio>
                        <Radio value="off">禁用</Radio>
                    </Radio.Group>
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
                <Form.Item
                    label='手机号'
                    name="phone"
                    rules={[{
                        required: true,
                        message: "请输入手机号"
                    }]}>
                    <Input placeholder='请输入手机号'></Input>
                </Form.Item>
                <Form.Item
                    label='头像'
                    name='avatar'>
                    <AntdUpload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        action={'http://upload-z2.qiniup.com'}
                        data={{ token }}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        onRemove={handleRemove}
                    >
                        {(fileList.length >= 1 || editData?.avatar) ? (editData?.avatar ? <img src={editData?.avatar} alt="" /> : "") : uploadButton}
                    </AntdUpload>
                </Form.Item>
                <Form.Item colon={false}>
                    <Button size='large' htmlType='submit' className={styles.btn} >{editData?._id ? "更新" : "创建"}</Button>
                </Form.Item>

            </Form>
        </Content>
    )
}
