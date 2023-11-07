import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const EditQuestionButton = ({ question }) => {

    console.log(question);
    return (
        <Link to={`/questions/edit/${question.id}`}>
            <Button type='primary'>
                Edit
            </Button>
        </Link>
    )
}

export default EditQuestionButton