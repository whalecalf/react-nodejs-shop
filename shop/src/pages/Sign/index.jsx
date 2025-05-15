import React, { useState } from 'react'
import Header from '../../components/PubHeader'
import classnames from 'classnames'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import validator from '../../utils/validator'
import './index.less'




export default function Sign() {

    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    function changeHandle(e) {
        if (e.target.name === 'name') {
            setUsername(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
    }


    async function SubmitHandler(e) {
        e.preventDefault()
        // console.log(name,password);
        var { isValid, errors } = validator({
            name,
            password
        })

        // console.log(isValid,errors);
        

        if (isValid) {
            await api.sign({
                nickName: name,
                name,
                password,
                status: 'on',
                role:'buyer',
                phone
            }).then((res) => {
                    console.log(res);
                    
                    alert('注册成功，请前往登录页面登录')
                    navigate('/login')
                }).catch(err => {
                    console.log(err);

                })
        } else {
            setErrors(errors)
        }

    }


    return (
        <div>
            <Header title={'注册页'} />
            <form className='sign-form' onSubmit={SubmitHandler}>
                <span>用户注册</span>
                <div className={classnames('input-container phone-container', { 'input-container-error': errors.username })}>
                    <i className='icon-tablet'></i>
                    <input
                        name='name'
                        type="text"
                        placeholder='用户名'
                        onChange={changeHandle}
                    />
                </div>
                <div className={classnames('input-container password-container', { 'input-container-error': errors.password })}>
                    <i className='icon-key'></i>
                    <input
                        name='password'
                        type="password"
                        placeholder='输入密码'
                        onChange={changeHandle} />
                </div>
                <div className={classnames('input-container password-container', { 'input-container-error': errors.password })}>
                    <i className='icon-key'></i>
                    <input
                        name='password'
                        type="password"
                        placeholder='请确认密码'
                        onChange={changeHandle} />
                </div>
                <div className={classnames('input-container password-container', { 'input-container-error': errors.password })}>
                    <i className='icon-key'></i>
                    <input
                        name='phone'
                        type="text"
                        placeholder='输入手机号'
                        onChange={changeHandle} />
                </div>
                <div className='btn-group'><button type='submit' className='btn-login'>注册</button></div>
            </form>
        </div>
    )
}
