'use client'
import React, { useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    GetProp,
    Input,
    InputNumber,
    Modal,
    Select,
    Tooltip,
    Upload,
    UploadProps,
    message,
} from 'antd';
import { goodsAdd, goodsUpdate } from '@/apis/goods';
import { GoodsType } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import dayjs from 'dayjs';
import Content from '../Content';
import { Upload as imgUpload } from '@/apis/upload';
import { CategoryType } from '@/types/category';
import { getCategoryList } from '@/apis/category';
import { BASE_URL } from '@/constant/qiniu';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function GoodsForm({ title, data }: { title: string; data?: GoodsType }) {

    const router = useRouter()
    const [categoryList, setCategoryList] = useState<CategoryType[]>([])
    const [form] = Form.useForm()

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const userinfo=JSON.parse(localStorage.getItem("user")||"").info
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
                createdAt: dayjs(data.createdAt),
                category: data?.category?._id,
            })
            setFileList(data.pics)

        }

    }, [data, form])

    useEffect(() => {
        getCategoryList({ all: true }).then((res: any) => {
            // console.log(res);
            setCategoryList(res.data.data)
        })

    }, [])

    const handleFormFinished = async (values: GoodsType) => {
        if (values.createdAt) {
            values.createdAt = dayjs(values.createdAt).valueOf()
        }
        values.pics = fileList
        values.seller = userinfo._id

        if (data?._id) {
            await goodsUpdate(data?._id, values)
            message.success('更新成功')
            router.push("/goods")
        } else {
            console.log('values', values);
            await goodsAdd(values)
            message.success('创建成功')
            router.push("/goods")
        }


        // router.push("/goods")
    }

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
            url: BASE_URL + (response.hash || "")
        };
        fileList.pop();
        fileList.push(fileItem);
        setImageUrl(fileItem.url)
        // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
        console.log(fileList);
        setFileList([...fileList as never]);
    };

    const handleRemove = (info: any) => {
        console.log(info);
        setImageUrl("")
        let index = fileList.indexOf(info as never);
        // console.log(index);
        if (index !== -1) {
            fileList.splice(index, 1);
        //    setPreviewImage("")            
            
            setFileList(fileList)
        }
        
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
                    label="分类"
                    name="category"
                    rules={[{
                        required: true,
                        message: "请选择分类"
                    }]}>
                    <Select placeholder='请选择' options={categoryList.map((item) => ({
                        label: item.name,
                        value: item._id
                    }))}>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="上架时间"
                    name="createdAt">
                    <DatePicker placeholder='请选择' />
                </Form.Item>

                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{
                        required: true,
                        message: "请输入价格"
                    }]}>
                    <InputNumber placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="库存"
                    name="stock"
                    rules={[{
                        required: true,
                        message: "请输入库存"
                    }]}>
                    <InputNumber placeholder='请输入' />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                    rules={[{
                        required: true,
                        message: "请输入描述"
                    }]}>
                    <TextArea placeholder='请输入' rows={4} />
                </Form.Item>

                <Form.Item
                    label="图片"
                    name='pics'
                    tooltip={'图片数量不超过10张'}>
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
                    >
                        {fileList.length > 9 ? "" : uploadButton}
                    </Upload>
                </Form.Item>
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
