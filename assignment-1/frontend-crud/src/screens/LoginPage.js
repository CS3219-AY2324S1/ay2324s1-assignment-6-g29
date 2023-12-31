// TODO: check if commented out code is needed

import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogActions
} from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setShowError, setErrorMessage } from '../redux/ErrorSlice.js'
import {
  setUserid,
  setLoginStatus,
  setIdToken,
  setRole
} from '../redux/UserSlice.js'
import { useNavigate } from 'react-router-dom'
import LoginPageBanner from '../components/FrontPageBanner.js'
import axios from 'axios'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [LoginError, setLoginError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const tokenCredential = await axios.post('http://localhost:5000/login', {
        username,
        password
      })
      dispatch(setUserid(username))
      dispatch(setIdToken(tokenCredential.data.token))
      dispatch(setRole(tokenCredential.data.role))
      console.log(tokenCredential)
      console.log('Login successful')
      dispatch(setLoginStatus(true))
      navigate('/questions')
    } catch (error) {
      setLoginError(true)
      setIsDialogOpen(true)
      dispatch(setErrorMessage(error.message))
      dispatch(setShowError(true))
    }
  }

  const routeChangeSignup = () => {
    const path = '/signup'
    navigate(path)
  }

  return (
    <Box display='flex' flexDirection='row' height='100vh'>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        justifyContent='center'
      >
        <Box display='flex' flexDirection='column' padding='25%'>
          <Typography variant='h4' marginBottom='1rem' fontWeight='bold'>
            Welcome Back
          </Typography>
          <Typography variant='body2' marginBottom='2rem'>
            <b>Please enter your details</b>
          </Typography>
          <form
            onSubmit={handleLogin}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <TextField
              label='Username'
              variant='standard'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              autoFocus
              fullWidth
            />
            <TextField
              label='Password'
              variant='standard'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              error={LoginError}
              fullWidth
            />
            <Button variant='contained' type='submit' fullWidth>
              <b>Login</b>
            </Button>
          </form>

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogContent>
              <Typography variant='body1'>
                Incorrect Password or email. Please try again.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>OK</Button>
            </DialogActions>
          </Dialog>

          <Box
            display='flex'
            flexDirection='row'
            justifyContent='flex-end'
            marginTop='0.5rem'
          />
          <Typography variant='body2' marginTop='1rem'>
            Don't have an account?
            <a
              style={{
                marginLeft: '0.5em',
                fontWeight: 'bolder',
                textDecoration: 'none',
                color: '#1976d2'
              }}
              href=''
              onClick={routeChangeSignup}
            >
              Sign up
            </a>
          </Typography>
        </Box>
      </Box>

      <LoginPageBanner />
    </Box>
  )
}

export default LoginPage
