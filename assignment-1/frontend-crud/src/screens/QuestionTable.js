import { Input, Table, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EditQuestionButton from '../buttons/EditQuestionButton'
import CreateQuestionButton from '../buttons/CreateQuestionButton'
import DeleteQuestionButton from '../buttons/DeleteQuestionButton'
import ViewMoreButton from '../buttons/ViewMoreButton'
import { SearchOutlined } from '@ant-design/icons'
import QuestionService from '../service/QuestionService'
import { v4 as uuidv4 } from 'uuid'

const QuestionTable = ({ questions, setQuestions }) => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  // retrieving data from books.json
  useEffect(() => {
    QuestionService
      .getAll()
      .then(questions => {
        setQuestions(questions);
      })
  }, [setQuestions])

  const handleFilterSearch = (column, value) => {
    const filtered = questions.filter((question) =>
      question[column].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };


  // header for table + able to filter data using filterDropdown
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              id={`filter-title`}
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.displayName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              id={`filter-description`}
              name={"description"}
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.description.toLowerCase().includes(value);
      },
    },
    {
      title: "Complexity",
      dataIndex: "complexity",
      key: "complexity",
      filters: [
        { text: "Hard", value: "Hard" },
        { text: "Easy", value: "Easy" },
        { text: "Medium", value: "Medium" },
      ],
      onFilter: (value, record) => record.difficulty.includes(value),
    },

    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags &&
            tags.map((tag) => {
              return (
                <Tag color="green" key={tag}>
                  {tag}
                </Tag>
              );
            })}
        </>
      ),
      filters: [
        { text: "Algorithms", value: "algorithms" },
        { text: "Data Structures", value: "data structures" },
        { text: "Recursion", value: "recursion" },
        { text: "Bit Manipulation", value: "bit manipulation" }
      ],
      onFilter: (value, record) => record.topic.includes(value),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => (
        <Space>
          <ViewMoreButton question={record} />
          <DeleteQuestionButton questions={questions} setQuestions={setQuestions} id={record.id} />
          <EditQuestionButton question={record} />
        </Space>
      ),
    },
  ];

  // data to fill up the rows of the table
  const data = questions.map(question => {
    return (
      {
        id: question.id,
        title: question.displayName,
        description: question.description,
        complexity: question.difficulty,
        tags: question.topic,
        key: uuidv4()
      }
    )
  })

  return (
    <div style={{ justifyContent: 'start', alignItems: 'start' }}>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <h2 style={{ paddingLeft: '1.5%', paddingTop: '1%' }}>
          Question Table
        </h2>
        <div style={{ marginLeft: 'auto', paddingRight: '1.5%', paddingTop: '1%' }}>
          {<CreateQuestionButton />}
        </div>
      </div>
      <Table
        style={{ padding: '1%' }}
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

export default QuestionTable
