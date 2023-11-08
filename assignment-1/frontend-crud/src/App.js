import React, { useState, useEffect } from 'react'
import './App.css'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessageAlert from './components/SuccessMessage'
import { selectShowError, selectShowSuccess } from './redux/ErrorSlice'
import { selectLoginstatus } from './redux/UserSlice'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import QuestionTable from './screens/QuestionTable'
import CreateNewQuestion from './screens/CreateNewQuestion'
import ViewMoreButton from './buttons/ViewMoreButton'
import Question from './screens/Question'
import EditQuestion from './screens/EditQuestion'
import LoginPage from './screens/LoginPage'
import SignupPage from './screens/SignupPage'
import EditProfileScreen from './screens/EditProfile'
import ProfileScreen from './screens/Profile'
import axios from 'axios'

function App () {
  const [questions, setQuestions] = useState([])
  const loginStatus = useSelector(selectLoginstatus)
  const showErrorAlert = useSelector(selectShowError)
  const showSuccessAlert = useSelector(selectShowSuccess)

  useEffect(() => {
    async function fetchQuestionData () {
      try {
        console.log('starting useEffect')
        const response = await axios.get('http://localhost:3002/question/getAll')
        console.log('getting response')
        console.log(response)
      } catch (error) {
        console.error('Error fetching question data:', error)
      }
    }

    fetchQuestionData()
  }, [])

  return (
    <>
      <Box display='flex' flexDirection='column' height='100vh'>
        <Router>
          {showErrorAlert && <ErrorMessage />}
          {showSuccessAlert && <SuccessMessageAlert />}
          <Routes>
            {loginStatus
              ? (
                <>
                  <Route path='/' element={<Navigate to='/questions' replace />} />
                  <Route
                    path='/questions'
                    element={
                      <QuestionTable questions={questions} setQuestions={setQuestions} />
                }
                  />
                  <Route
                    exact
                    path='/questions/create'
                    element={
                      <CreateNewQuestion
                        questions={questions}
                        setQuestions={setQuestions}
                      />
                }
                  />
                  <Route
                    exact
                    path='/questions/:id'
                    element={
                      <Question questions={questions} setQuestions={setQuestions} />
                }
                  />
                  <Route
                    exact
                    path='/questions/edit/:id'
                    element={
                      <EditQuestion questions={questions} setQuestions={setQuestions} />
                }
                  />
                  <Route path='/profile' Component={ProfileScreen} />
                  <Route path='/editProfile' Component={EditProfileScreen} />
                </>
                )
              : (
                <>
                  <Route path='/' Component={LoginPage} />
                  <Route path='/signup' Component={SignupPage} />
                  <Route
                    path='/*' element={
                      <div><h1>Unauthenticated </h1><h1><a href='http://localhost:3000'>login here</a></h1></div>
}
                  />

                </>
                )}
          </Routes>

        </Router>
      </Box>
    </>
  )
}

export default App
