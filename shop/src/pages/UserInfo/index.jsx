import { React, useState, useEffect } from 'react'
import PubHeader from '../../components/PubHeader'
import { Button, Upload, message, Radio } from 'antd'
import api from '../../api';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate, useParams, useRoutes } from 'react-router-dom';
import { BASE_URL } from '../../constant/qiniu'

export default function UserInfo() {

    const id = useParams().id
    var data = JSON.parse(localStorage.getItem("user")).info.user

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(data.avatar);
    // 用来预览弹出预览图片的Modal框框
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    // 存储七牛返回的token值
    const [token, setToken] = useState("")
    // 存取上传七牛返回的值
    const [fileList, setFileList] = useState([]);

    const [changePwd, setChangePwd] = useState(true)
    const [update, setUpdate] = useState(true)
    const [sex, setSex] = useState('female')

    const router = useNavigate()


    //获取七牛云token
    useEffect(() => {
        const fetchToken = async () => {
            await api.getToken().then(res => {
                console.log(res);
                console.log('token', res.data.data.token);
                setToken(res.data.data.token)
            })
        }
        fetchToken()
    }, [])

    const beforeUpload = (file) => {
        setImageUrl("")
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
    };


    const handleChange = (info) => {
        const file = info.file;
        // console.log(file);
        // console.log('Token',token);
        const fileList = info.fileList
        console.log('fileList', info.fileList);
        if (file.status === 'uploading') {
            setImageUrl("")
        }

        const { uid, name, type, thumbUrl, status, response = {} } = file;
        const fileItem = {
            uid,
            name,
            type,
            thumbUrl,
            status,
            url: BASE_URL + (response.hash || "")
        };
        setImageUrl(fileItem.url || fileItem.thumbUrl)
        fileList.pop();
        fileList.push(fileItem);
        // 这里必须要用展开运算符，否则会有error，具体可以参考antd文档
        console.log(fileList);
        setFileList([...fileList]);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </button>
    );

    const handleChangePwd = () => {
        setChangePwd(!changePwd)
    }

    const handleUpdate = () => {
        setUpdate(!update)
    }

    const handleRemove = (info) => {
        console.log(info);
        let index = fileList.indexOf(info);
        if (index !== -1) {
            fileList.splice(index, 1);
            setPreviewImage("")
        }
        setFileList(fileList)
    }

    const handlSubmit = async () => {
        var values = {}
        values.avatar = imageUrl;
        values.name = document.getElementsByName('name')[0].value;
        values.nickName = document.getElementsByName('nickName')[0].value;
        values.sex = sex;
        values.phone = document.getElementsByName('phone')[0].value
        values.password = document.getElementsByName('password')[0].value
        console.log(values);
        await api.updateUser(id, values)
        data = values
        var temp = {
            info: {
                user: values
            },
            token: JSON.parse(localStorage.getItem('user')).token
        }


        localStorage.setItem('user', JSON.stringify(temp))
        message.success('修改成功')
        window.location.reload()
    }

    const handleSexChange = (e) => {
        setSex(e.target.value)
    }


    return (
        <div className={styles.all}>
            <PubHeader title={'账号信息'} />
            <div className={styles.avatar}>
                <div className={styles.left}>&nbsp;头像：</div>
                <div className={styles.right}>
                    <Upload
                        disabled={update}
                        name="file"
                        listType="picture-card"
                        className={"avatar-uploader " + styles.select}
                        action={'http://upload-z2.qiniup.com'}
                        data={{ token }}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        onRemove={handleRemove}
                        maxCount={1}>
                        {fileList.length >= 1 ? "" : (imageUrl ? <img style={{ width: '100%' }} src={imageUrl} alt="" /> : uploadButton)}
                    </Upload>
                </div>

            </div>
            <div className={styles.list}>
                <div className={styles.left}>账号：<input name='name' disabled={update} value={data.name} type="text" /></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.list}>
                <div className={styles.left}>昵称：<input name='nickName' disabled={update} value={data.nickName} type="text" /></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.list}>
                <div className={styles.left}>性别：
                    <Radio.Group
                        className={styles.sex}
                        name='sex'
                        onChange={handleSexChange}
                        disabled={update}
                        defaultValue={data.sex || sex}
                    >
                        <Radio value='male'>男</Radio>
                        <Radio value='female'>女</Radio>
                    </Radio.Group>
                </div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.list}>
                <div className={styles.left}>手机号：<input name='phone' disabled={update} value={data.phone} type="text" /></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.list}>
                <div className={styles.left}>密码：<input name='password' value={data.password} hidden={changePwd} type="password" /></div>
                <div className={styles.right}>
                    <Button
                        type='primary'
                        onClick={handleChangePwd}
                    >修改密码</Button>
                </div>
            </div>
            <div className={styles.button}>
                <center>{update ? <Button
                    type='primary'
                    onClick={handleUpdate}
                >修改资料</Button> : <Button
                    type='primary'
                    onClick={handlSubmit}
                >提交</Button>}</center>


            </div>
        </div>
    )
}
