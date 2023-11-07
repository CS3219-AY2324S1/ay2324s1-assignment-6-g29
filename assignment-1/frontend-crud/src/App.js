import React, { useState, useEffect } from 'react';
import Axios from 'axios';
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
    // here we get the data by requesting data from this link
    // to our nodejs server
    Axios.get('http://localhost:3002/questions')
      .then((res) => setList(res.data));
  }, []);

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
