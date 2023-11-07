import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const UpdateAccountButton = () => {
  return (
    <Link to='/editProfile'>
      <Button type='primary'>Update Details</Button>
    </Link>
  )
}

export default UpdateAccountButton
