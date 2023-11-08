import axios from 'axios'
const baseUrl = 'http://localhost:3002/question'

// getting all the books from json file
const getAll = () => {
  const request = axios.get(`${baseUrl}/getAll`)
  return request.then((response) => response.data)
}

// get specific question
const getQuestion = (id) => {
  const request = axios.get(`${baseUrl}/getOneById/${id}`)
  return request.then((response) => response.data)
}

// deleting a book
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/deleteById/${id}`)
  return request
}

// creating a new book
const create = (newObject) => {
  const request = axios.post(`${baseUrl}/post`, newObject)
  return request.then((response) => response.data)
}

// updating a book
const update = (id, newObject) => {
  const request = axios.patch(`${baseUrl}/updateById/${id}`, newObject)
  return request.then((response) => response.data)
}

const QuestionService = {
  getAll,
  getQuestion,
  remove,
  create,
  update
}

export default QuestionService
