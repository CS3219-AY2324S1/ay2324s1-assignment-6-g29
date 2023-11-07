import axios from "axios";
const baseUrl = "http://localhost:3002/questions";

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

// getting all the books from json file
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// get specific question
const getQuestion = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

// deleting a book
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

// creating a new book
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// updating a book
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const QuestionService = {
  getAll,
  getQuestion,
  remove,
  create,
  update,
};

export default QuestionService;
