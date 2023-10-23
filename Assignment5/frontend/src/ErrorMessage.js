import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export default function ProgrammingLanguageDialog ({ error, setError, showError, setShowError }) {
  const handleAcknowledge = () => {
    setError('')
    setShowError(false)
  }

  return (
    <div>
      <Dialog
        open={showError}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcknowledge}>Close Alert</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
