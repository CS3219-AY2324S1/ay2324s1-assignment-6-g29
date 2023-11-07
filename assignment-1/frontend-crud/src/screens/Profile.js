import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserid, setChangeDeactivateAccountAlert, setIdToken, setLoginStatus, setUserid } from '../redux/UserSlice.js'
import '../styles/ProfileScreen.css'
import DeactivateAccountDialog from '../components/DeactivateAccountAlert'
import UpdateAccountButton from "../buttons/UpdateAccount"
import DeleteAccountButton from '../buttons/DeleteAccount'
import { setShowError, setErrorMessage } from '../redux/ErrorSlice.js'
import axios from 'axios'

function ProfileScreen () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userid = useSelector(selectUserid)
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [accountType, setAccountType] = useState('')
  const [loading, setLoading] = useState(true)

  const handleLogout = (event) => {
    dispatch(setIdToken(''))
    dispatch(setLoginStatus(false))
    dispatch(setUserid(''))
    navigate('/')
  }

  const handleDeactivateAccount = (event) => {
    dispatch(setChangeDeactivateAccountAlert(true))
  }

  const acceptDeactivateAccount = (event) => {
    // const config = {
    //   headers: { Authorization: `Bearer ${idToken}` }
    // }

    axios
      .delete(`http://localhost:5000/user/${userid}`)
      .then((response) => {
        handleLogout()
      })
      .catch((error) => {
        dispatch(setErrorMessage(error.message))
        dispatch(setShowError(true))
      })
  }

  const denyDeactivateAccount = () => {
    console.log('Canceled deactivating account')
  }

  useEffect(() => {
    async function fetchUserData () {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userid}`)
        console.log(response)
        setEmail(response.data[1])
        setDisplayName(response.data[2])
        setAccountType(response.data[3])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div style={{ justifyContent: 'start', alignItems: 'start' }}>
      <Navbar />

      {loading
        ? (
          <p>Loading...</p>
          )
        : (
          <div className='profile-screen'>
            <div className='profile-header'>
              <h2>{displayName}</h2>
            </div>

            <div className='profile-details'>
              <h3>Account Information</h3>
              <ul>
                <li>Email: {email}</li>
                <li>Username: {userid}</li>
                <li>Account Type: {accountType}</li>
              </ul>
            </div>
            
            <UpdateAccountButton/>
            <DeleteAccountButton handleDelete={handleDeactivateAccount}/>
          </div>
          )}
      <DeactivateAccountDialog
        denyChange={denyDeactivateAccount}
        agreeChange={acceptDeactivateAccount}
      />
    </div>
  )
}

export default ProfileScreen
