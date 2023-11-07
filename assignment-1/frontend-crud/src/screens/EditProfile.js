import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Typography, TextField } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserid, setChangeDeactivateAccountAlert, setIdToken, setLoginStatus, setUserid } from '../redux/UserSlice.js'

import { setShowError, setErrorMessage } from '../redux/ErrorSlice.js'
import axios from 'axios'

function EditProfileScreen () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userid = useSelector(selectUserid)
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')

  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      requireAllNonNull()
      checkPasswords(password, passwordConfirmation)
      await axios
        .put(`http://localhost:5000/user/${userid}`, {
          name: displayName,
          email,
          password,
        })
        .catch((error) => {
          dispatch(setErrorMessage(error.message))
          dispatch(setShowError(true))
        })
      navigate('/profile')
    } catch (error) {
      dispatch(setErrorMessage(error.message))
      dispatch(setShowError(true))
    }

  }

  const requireAllNonNull = () => {
    const requiredFields = [
      displayName,
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

  useEffect(() => {
    async function fetchUserData () {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userid}`)
        console.log(response)
        setEmail(response.data[1])
        setDisplayName(response.data[2])
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div style={{ justifyContent: 'start', alignItems: 'start' }}>
      <Navbar />

      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        justifyContent='center'
      >
        <Box display='flex' flexDirection='column' padding='10%'>
          <Typography variant='body2' marginBottom='2rem'>
            <b>Please enter your details</b>
          </Typography>
          <form
            onSubmit={handleUpdate}
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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
              <b>Update</b>
            </Button>
          </form>
          <Button variant='contained' onClick={() => navigate('/profile')} style={{marginTop: '10px', background: "red" }}fullWidth>
              <b>Back</b>
            </Button>
          </Box>
          </Box>
    </div>
  )
}

export default EditProfileScreen
