import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionTable from './screens/QuestionTable';
import CreateNewQuestion from './screens/CreateNewQuestion';
import ViewMoreButton from './buttons/ViewMoreButton';
import Question from './screens/Question';
import EditQuestion from './screens/EditQuestion';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestionData() {
      try {
        console.log('starting useEffect')
        const response = await axios.get(`localhost:3002/question/getAll`)
        console.log("getting response")
        console.log(response)
      } catch (error) {
        console.error('Error fetching question data:', error)
      }
    }

    fetchQuestionData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/questions"
          element={
            <QuestionTable questions={questions} setQuestions={setQuestions} />
          }
        />
        <Route
          exact
          path="/questions/create"
          element={
            <CreateNewQuestion
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        />
        <Route
          exact
          path="/questions/:id"
          element={
            <Question questions={questions} setQuestions={setQuestions} />
          }
        />
        <Route
          exact
          path="/questions/edit/:id"
          element={
            <EditQuestion questions={questions} setQuestions={setQuestions} />
          }
        />
      </Routes>

    </Router>
  );
}

export default App;
