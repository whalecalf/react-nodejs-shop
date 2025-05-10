import React, {useState,useEffect} from 'react'
import PubHeader from '../../components/PubHeader'
import { useLocation } from 'react-router-dom'
import { Form, Rate, Button, Upload, Modal,message } from 'antd'
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import api from '../../api'
import styles from './index.module.less'

function Comment() {

    const { state } = useLocation()
    const { orderid } = state
    const userinfo = JSON.parse(localStorage.getItem("user")).info
    const [form] = useForm()
    const CommentData=state.comment

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    // 用来预览弹出预览图片的Modal框框
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    // 存储七牛返回的token值
    const [token, setToken] = useState("")
    // 存取上传七牛返回的值
    const [fileList, setFileList] = useState([]);

    useEffect(()=>{
        const fetchData=async()=>{
            if (CommentData) {
                setFileList(CommentData.pics)
                // console.log(CommentData);
                form.setFieldsValue({...CommentData})
            }
        }
        fetchData()
    },[])

    useEffect(() => {
        const fetchToken = async () => {
            await api.getToken().then(res => {
                console.log('token', res.data.token);
                setToken(res.data.token)
            })

        }
        if (!CommentData) {
            fetchToken()
        }
        
    }, [])

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    // 预览
    const handlePreview = (file) => {
        console.log(file);
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
    };

    const handleCancel = () => {
        setPreviewVisible(false);
        setPreviewImage("")
    };


    const handleChange = (info) => {
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
            url: "http://s8vxww55i.hn-bkt.clouddn.com/" + (response.hash || "")
        };
        fileList.pop();
        fileList.push(fileItem);
        setImageUrl(fileItem.url)
        // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
        console.log(fileList);
        setFileList([...fileList]);
    };

    const handleRemove = (info) => {
        console.log(info);
        let index = fileList.indexOf(info);
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

    const handleFinished=async(values)=>{
        values.user=userinfo._id;
        values.pics=fileList;
        // console.log(values);
        var comid
        await api.AddComment(values).then(res=>{
            comid=res.data.id
        })
        await api.updateOrder(orderid,{comment:comid})
        message.success('评价成功')
    }


    return (
        <div>
            <PubHeader title={'订单评价'} />
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                layout="horizontal"
                form={form}
                className={styles.main}
                onFinish={handleFinished}
            >
                <Form.Item
                    label='评分'
                    name="star"
                    required={true}
                >
                    <Rate></Rate>
                </Form.Item>

                <Form.Item
                    label="评价内容"
                    name="description"
                    required={true}>
                    <TextArea ></TextArea>
                    {/* <div>{data?.description}</div> */}
                </Form.Item>
                <Form.Item
                    label="图片"
                    tooltip="图片数量不能超过9张"
                    name="fileList"
                >
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
                        {fileList.length >= 9 ? "" : (CommentData?"":uploadButton)}
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
                <Form.Item
                    colon={false}
                    label=' '>
                    {CommentData?"":<Button className={styles.tj} type='primary' htmlType='submit'>提交</Button>}
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment
