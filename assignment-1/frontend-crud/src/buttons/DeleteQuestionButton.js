import { Button } from 'antd'
import React from 'react'
import QuestionService from '../service/QuestionService'

const DeleteQuestionButton = ({ id, setQuestions, questions }) => {
  const deleteQuestion = (id) => {
    QuestionService
      .remove(id)
      .then(response => {
        setQuestions(questions.filter(book => book.id !== id))
      })
  }

  return (
    <Button type='primary' onClick={() => deleteQuestion(id)}>
      Delete
    </Button>
  )
}

export default DeleteQuestionButton
