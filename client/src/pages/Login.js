import React, { useState } from 'react'
import { Stack, Typography, Box, Alert } from '@mui/material'
import BackButton from '../components/BackButton'
import { customInput } from '../styles/customInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { url } from '../constants/url'

const Login = () => {
  const navigate = useNavigate()
  const notifyError = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  })

  const notifySuccess = (message) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    axios.post(`${url}/api/auth/login`, {
      email: email,
      password: password
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('auth', true)
        navigate('/home')
        notifySuccess("Login Successful")
      }
      console.log(res)
    }).catch((err) => {
      console.log(err.response.data.message)
      notifyError(err.response.data.message || "Enter details correctly")
    })
  }

  return (
    <>
      <Stack sx={{ height: '100%' }}>
        <BackButton path='/' />

        <Stack sx={{ px: 2, py: 1, height: '100%' }} >
          <Stack sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 17, fontWeight: 600 }}>Login</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 600, mt: 0.5 }}>Please enter your</Typography>
            <Typography sx={{ fontSize: 32, fontWeight: 600, mt: -1 }}>details</Typography>
          </Stack>

          <Stack sx={{ mt: 3 }}>
            <Stack sx={{ mt: 2.3 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 600 }}>Email</Typography>
              <input onChange={(e) => setEmail(e.target.value)} autoComplete='false' placeholder='Type your email here' style={customInput}></input>
            </Stack>

            <Stack sx={{ mt: 2.3 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 600 }}>Password</Typography>
              <input onChange={(e) => setPassword(e.target.value)} autoComplete='false' type={"password"} placeholder='Type your password here' style={customInput}></input>
            </Stack>
          </Stack>

          <Stack sx={{ mt: 'auto' }}>
            <CustomButton onClick={handleLogin} path="#">Login</CustomButton>
          </Stack>
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  )
}

export default Login