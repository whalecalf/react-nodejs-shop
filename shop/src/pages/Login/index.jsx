import React from 'react'
import LoginView from './LoginView'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as LoginAction from '../../redux/actions/login'
import md5 from 'js-md5'

function Login() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  function LoginHandle(user) {
    console.log(user);
    user.data.password = md5(user.data.password)
    // 写入redux
    dispatch(LoginAction.setLogin(user))
    // 写入本地
    
    localStorage.setItem("user",JSON.stringify({info:user.data, token: user.token}))
    navigate('/')
  }

  return (
    <div>
      <LoginView onLoginEvent={LoginHandle}/>
    </div>
  )
}

export default Login
