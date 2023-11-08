import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIdToken } from '../redux/UserSlice'
import {
  useParams, useNavigate
} from 'react-router-dom'
import QuestionService from '../service/QuestionService'
import { Form, Button, Input, Radio, Checkbox } from 'antd'
import { PageHeader } from '@ant-design/pro-layout'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'

const EditQuestion = () => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(null)
  const idToken = useSelector(selectIdToken)

  const id = useParams().id

  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newComplexity, setNewComplexity] = useState('')
  const [newTags, setNewTags] = useState([])
  const [newId, setNewId] = useState(0)

  const tagOptions = [
    'data structures',
    'recursion',
    'algorithms',
    'bit manipulation'
  ]

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${idToken}` }
    }
    axios
      .get('http://localhost:5000/protected', config)
      .then((response) => {
        if (response.data[1] === 200) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      })
      .catch((error) => {
        console.error('Error checking authorization:', error)
        setIsAuthorized(false)
      })

    QuestionService.getQuestion(id).then((question) => {
      setNewTitle(question.title)
      setNewDescription(question.description)
      setNewId(parseInt(question.id, 10))
      setNewComplexity(question.complexity)
      setNewTags(question.tags)
    })
  }, [id])

  const updateQuestion = (values) => {
    const questionObject = {
      id: parseInt(values.id, 10),
      displayName: values.title,
      description: values.description,
      difficulty: values.complexity,
      topic: values.tags,
      imageArray: []
    }
    QuestionService.update(newId, questionObject).then(
      (returnedQuestion) => { }
    )
  }

  return (
    <>
      {isAuthorized == null
        ? <div>Checking authorization</div>
        : isAuthorized
          ? (
            <div>
              <PageHeader
                onBack={() => navigate('/questions')}
                title='Editing'
                subTitle={newTitle}
              />
              <Form
                style={{ padding: '2%' }}
                onFinish={(values) => {
                  updateQuestion(values)
                  navigate('/questions')
                }}
                autoComplete='off'
                labelCol={{ span: 3 }}
        // having fields so that form is already filled up by exisiting data
                fields={[
                  {
                    name: ['title'],
                    value: newTitle
                  },
                  {
                    name: ['description'],
                    value: newDescription
                  },
                  {
                    name: ['id'],
                    value: newId
                  },
                  {
                    name: ['complexity'],
                    value: newComplexity
                  },
                  {
                    name: ['tags'],
                    value: newTags
                  }
                ]}
              >
                <Form.Item
                  name='title'
                  label='Title'
                  rules={[
                    {
                      required: true
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input Title' />
                </Form.Item>
                <Form.Item
                  name='description'
                  label='Description'
                  rules={[
                    {
                      required: true
                    },
                    { whitespace: true }
                  ]}
                  hasFeedback
                >
                  <Input placeholder='Input Description' />
                </Form.Item>
                <Form.Item name='id' label='ID' hasFeedback>
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name='complexity'
                  label='Complexity'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                  hasFeedback
                >
                  <Radio.Group value={newComplexity}>
                    <Radio value='Easy'>Easy</Radio>
                    <Radio value='Medium'>Medium</Radio>
                    <Radio value='Hard'>Hard</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name='tags'
                  label='Tags'
                  rules={[
                    {
                      required: true
                    }
                  ]}
                  hasFeedback
                >
                  <Checkbox.Group options={tagOptions} value={newTags} />
                </Form.Item>
                <Form.Item>
                  <Button block type='primary' htmlType='submit'>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </div>
            ) : (<h1>Authorized content for admin</h1>)}
    </>
  )
}

export default EditQuestion
