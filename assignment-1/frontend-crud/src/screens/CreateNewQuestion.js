import React, { useEffect } from "react";
import QuestionService from "../service/QuestionService";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";
// import { PageHeader } from "antd";
import { Checkbox, Radio, FloatButton } from "antd";
import { PageHeader } from '@ant-design/pro-layout';  

const CreateNewQuestion = ({ questions, setQuestions }) => {
  const navigate = useNavigate();   

  useEffect(() => {
    QuestionService.getAll().then((questions) => {
      setQuestions(questions);
    });
  }, [setQuestions]);
  
  const addQuestion = (values) => {
    const QuestionObject = {
      id: parseInt(values.id, 10),
      title: values.title,
      description: values.description,
      category: values.category,
      complexity: values.complexity,
      tags: values.tags,
    };
    QuestionService.create(QuestionObject).then((newQuestion) => {});
  };

  const tagOptions = ["data structures", "recursion", "algorithms", "bit manipulation"]; // Define your tag options here
  const complexityOptions = ["Easy", "Medium", "Hard"]; // Define your complexity options here
  const questionsID = questions.map((question) => question.id);

  return (
    <div>
      <PageHeader
        onBack={() => navigate("/questions")}
        title="Creating New Question"
      />
      
      {/* <FloatButton
        icon={<LeftOutlined />}
        onClick={() => navigate("/questions")}
      /> */}
      <Form
        style={{ padding: "2%" }}
        onFinish={(values) => {
          addQuestion(values);
          navigate("/questions");
        }}
        autoComplete="off"
        labelCol={{ span: 3 }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Input Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input placeholder="Input Description" />
        </Form.Item>
        <Form.Item
          name="id"
          label="ID"
          rules={[
            {
              required: true,
            },
            { whitespace: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value.match(/^[0-9._-]+$/) === null) {
                  return Promise.reject(
                    new Error("ID only consists of numbers")
                  );
                }
                if (questionsID.includes(parseInt(value, 10))) {
                  return Promise.reject(new Error("ID already exists"));
                }
                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <Input placeholder="Input ID" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select at least one tag",
            },
          ]}
        >
          <Checkbox.Group options={tagOptions} />
        </Form.Item>
        <Form.Item
          name="complexity"
          label="Complexity"
          rules={[
            {
              required: true,
              message: "Please select the complexity",
            },
          ]}
        >
          <Radio.Group options={complexityOptions} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add New
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateNewQuestion;