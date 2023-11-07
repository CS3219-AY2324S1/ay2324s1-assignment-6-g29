import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { Descriptions, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import QuestionService from '../service/QuestionService';

const Question = ({ questions, setQuestions }) => {
  const navigate = useNavigate()

  // obtaining id to get specific book
  const id = useParams().id

  useEffect(() => {
    QuestionService
      .getAll()
      .then(questions => {
        setQuestions(questions)
      })
  }, [setQuestions])

  const question = questions.find(question => question.id === parseInt(id, 10))

  // conditional statement to prevent error since book is undefined before useEffect fires
  if (question !== undefined) {
    return (
      <div>
        <PageHeader
          onBack={() => navigate("/questions")}
          title="Question Information"
        />
        <Descriptions
          style={{ padding: "2%" }}
          title={question.displayName}
          layout="vertical"
          bordered
          column={{ sm: 1, xs: 1 }}
        >
          <DescriptionsItem label="ID">{question.id}</DescriptionsItem>
          <DescriptionsItem label="Title">
            {question.displayName}
          </DescriptionsItem>
          <DescriptionsItem label="Complexity">
            {question.difficulty}
          </DescriptionsItem>
          <DescriptionsItem label="Tags">
            {question.topic.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </DescriptionsItem>
          <DescriptionsItem label="Description">
            {question.description}
          </DescriptionsItem>
        </Descriptions>
      </div>
    );
  }
  return null;
}

export default Question