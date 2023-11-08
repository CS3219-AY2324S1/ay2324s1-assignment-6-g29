// TODO: check if commented out code is needed

import React, { useState } from 'react'
import { Box, Button, Typography, TextField } from '@mui/material'
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

function SignupPage () {
  const [name, setName] = useState('')

  const [username, setUsername] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const requireAllNonNull = () => {
    const requiredFields = [
      name,
      username,
      email,
      password,
      passwordConfirmation
    ]
    requiredFields.forEach((x, i) => {
      if (x === '') {
        throw new Error('All fields cannot be empty')
      }
    })
  }

  const checkPasswords = (password1, password2) => {
    if (password1 !== password2) {
      setPasswordConfirmationError('Passwords do not match.')
      throw new Error('Passwords do not match')
    } else {
      setPasswordConfirmationError('')
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      requireAllNonNull()
      checkPasswords(password, passwordConfirmation)
      await axios.post('http://localhost:5000/addUser', {
        name,
        username,
        email,
        password,
        role: 'User'
      })
      console.log('sign up success')
      const tokenCredential = await axios.post('http://localhost:5000/login', {
        username,
        password
      })
      dispatch(setUserid(username))
      dispatch(setIdToken(tokenCredential.data.token))
      dispatch(setRole(tokenCredential.data.role))
      console.log('Login successful')
      dispatch(setLoginStatus(true))
      navigate('/questions')
    } catch (error) {
      dispatch(setErrorMessage(error.message))
      dispatch(setShowError(true))
    }
  }

  const routeChangeSignin = () => {
    const path = '/login'
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
            First step to landing your dream job
          </Typography>
          <Typography variant='body2' marginBottom='2rem'>
            <b>Please enter your details</b>
          </Typography>
          <form
            onSubmit={handleSignUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <TextField
              type='text'
              placeholder='Display Name'
              variant='standard'
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              type='text'
              placeholder='Username'
              variant='standard'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              type='email'
              placeholder='Email'
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              type='password'
              placeholder='Password'
              variant='standard'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              type='password'
              placeholder='Confirm Password'
              variant='standard'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              error={passwordConfirmationError !== ''}
              helperText={passwordConfirmationError}
              fullWidth
              required
            />
            <Button variant='contained' type='submit' fullWidth>
              <b>Sign up</b>
            </Button>
          </form>
          <Typography variant='body2' marginTop='1rem'>
            Already have an account?
            <a
              style={{
                marginLeft: '0.5em',
                fontWeight: 'bolder',
                textDecoration: 'none',
                color: '#1976d2'
              }}
              href=''
              onClick={routeChangeSignin}
            >
              Sign in
            </a>
          </Typography>
        </Box>
      </Box>
      <LoginPageBanner />
    </Box>
  )
}

export default SignupPage
