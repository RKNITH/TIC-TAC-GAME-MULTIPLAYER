import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import BackButton from '../components/BackButton'
import { customInput } from '../styles/customInput'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { url } from '../constants/url'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const notifyError = (message) => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  })

  const notifySuccess = (message) => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  })

  const handleRegister = () => {
    axios.post(`${url}/api/auth/register`, {
      email: email,
      password: password,
      name: name,
      username: username
    }, {
      withCredentials: true
    }).then((res) => {
      notifySuccess("Account created")
      navigate('/login')
    }).catch((err) => {
      notifyError(err.response.data.message)
    })
  }

  return (
    <>
    <Stack sx={{height: '100%'}}>
      <BackButton path='/'/>

      <Stack sx={{px: 2, py: 1, height: '100%'}} >
        <Stack sx={{mt: 2}}>
          <Typography sx={{fontSize: 17, fontWeight: 600}}>Create Account</Typography>
          <Typography sx={{fontSize: 32, fontWeight: 600, mt: 0.5}}>Let's get to know</Typography>
          <Typography sx={{fontSize: 32, fontWeight: 600, mt: -1}}>you better!</Typography>
        </Stack>

        <Stack sx={{mt: 3}}>
          <Stack>
            <Typography sx={{fontSize: 17, fontWeight: 600}}>Your name</Typography>
            <input onChange={(e) => setName(e.target.value)} autoComplete='false' placeholder='Type your name here' style={customInput}></input>
          </Stack>

          <Stack sx={{mt: 2.3}}>
            <Typography sx={{fontSize: 17, fontWeight: 600}}>Username</Typography>
            <input onChange={(e) => setUsername(e.target.value)} autoComplete='false' placeholder='Type your username here' style={customInput}></input>
          </Stack>

          <Stack sx={{mt: 2.3}}>
            <Typography sx={{fontSize: 17, fontWeight: 600}}>Email</Typography>
            <input onChange={(e) => setEmail(e.target.value)} autoComplete='false' type={"email"} placeholder='Type your email here' style={customInput}></input>
          </Stack>

          <Stack sx={{mt: 2.3}}>
            <Typography sx={{fontSize: 17, fontWeight: 600}}>Password</Typography>
            <input onChange={(e) => setPassword(e.target.value)} autoComplete='false' type={"password"} placeholder='Type your password here' style={customInput}></input>
          </Stack>
        </Stack>

        <Stack sx={{mt: 'auto'}}>
          <CustomButton onClick={handleRegister}>Register</CustomButton>
        </Stack>
      </Stack>
    </Stack>
    <ToastContainer />
    </>
  )
}

export default Register