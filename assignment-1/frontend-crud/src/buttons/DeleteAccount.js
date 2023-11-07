import { Button } from 'antd'
import React from 'react'

const DeleteAccountButton = ({handleDelete}) => {
  return (
    <Button type='primary' onClick={handleDelete} style={{ background: "red" }}>Delete Acccount</Button>
  )
}

export default DeleteAccountButton
