'use client'
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Upload,
    message,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import Content from '../Content';
import { LEVEL_OPTIONS } from '@/constant/category';
import { categoryAdd, categoryUpdate, getCategoryList } from '@/apis/category';
import { CategoryType } from '@/types/category';
import { Upload as imgUpload } from '@/apis/upload';
import type { GetProp, UploadProps } from 'antd';
import { BASE_URL } from '@/constant/qiniu';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


export default function CategoryForm({ title, data }: { title: string; data?: CategoryType }) {

    const router = useRouter()
    const [level, setLevel] = useState(1)
    const [levelOneList, setLevelOneList] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm()
    // 用来预览弹出预览图片的Modal框框
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    // 存储七牛返回的token值
    const [token, setToken] = useState("")
    // 存取上传七牛返回的值
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        console.log(data);
        if (data?._id) {
            form.setFieldsValue({
                ...data,
            })
        }

    }, [data, form])

    const handleFormFinished = async (values: CategoryType) => {
        console.log(values);
        values.icon=imageUrl
        if (data?._id) {
            await categoryUpdate(data?._id, values)
            message.success('更新成功')
            router.push("/category")
        } else {
            await categoryAdd(values)
            message.success('创建成功')
            router.push("/category")
        }



    }

    useEffect(() => {
        async function fetchData() {
            const res = await getCategoryList({ all: true, level: 1 })
            console.log(res);

            setLevelOneList(res.data.data)
        }
        fetchData()
    }, [])

    const levelOneOptions = useMemo(() => {
        return levelOneList.map((item) => ({
            value: item._id,
            label: item.name
        }))
    }, [levelOneList]);

    //获取七牛云token
    useEffect(() => {
        const fetchToken = async () => {
            await imgUpload().then(res => {
                console.log('token', res.data.token);
                setToken(res.data.token)
            })

        }
        fetchToken()
    }, [])

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
            url: BASE_URL + (response.hash || "")
        };
        setImageUrl(fileItem.url||fileItem.thumbUrl)
        fileList.pop();
        fileList.push(fileItem);
        // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
        console.log(fileList);
        setFileList([...fileList as never]);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </button>
    );

    const handleRemove=(info:any)=>{
        console.log(info);
        let index = fileList.indexOf(info as never);
        if (index !== -1) {
          fileList.splice(index, 1);
        }
        setFileList([...fileList])
      }


    return (
        <Content title={title}>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                onFinish={handleFormFinished}
                form={form}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{
                        required: true,
                        message: "请输入名称"
                    }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item
                    label="级别"
                    name="level"
                    rules={[{
                        required: true,
                        message: "请选择级别"
                    }]}>
                    <Select onChange={(value) => {
                        setLevel(value)
                    }}
                        options={LEVEL_OPTIONS}
                        placeholder='请选择'
                        disabled={!!data?._id}>

                    </Select>
                </Form.Item>

                {(level == 2 || data?.level === 2) && <Form.Item
                    label="所属级别"
                    name="parent"
                    rules={[{
                        required: true,
                        message: "请选择级别"
                    }]}>
                    <Select options={levelOneOptions} placeholder='请选择'>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>}
                {
                    (level == 2 || data?.level === 2) && <Form.Item
                    label="分类图标"
                    name="icon"
                    rules={[{
                        required: true,
                        message: "请选择图片"
                    }]}>
                        <Upload
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
                            maxCount={1}
                        >
                            {(fileList.length>=1||data?.icon) ? (data?.icon?<img src={data?.icon} alt="" />:"") : uploadButton}
                        </Upload>
                    </Form.Item>
                }

                <Form.Item>
                    <Modal
                        open={previewVisible}
                        title="预览"
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>
                <Form.Item colon={false}>
                    <Button size='large' htmlType='submit' className={styles.btn} >{data?._id ? "更新" : "创建"}</Button>
                </Form.Item>
            </Form>
        </Content>
    )
}
