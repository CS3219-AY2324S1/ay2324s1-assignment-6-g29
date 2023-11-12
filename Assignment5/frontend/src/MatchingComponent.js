import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import Timer from './Timer'

const MATCHINGSERVER = 'http://localhost:4000'

const connectionOptions = {
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket']
}

function MatchingComponent ({setMatched, setShowError, setError, setMatchedUserId}) {  
  const [isMatching, setIsMatching] = useState(false)
  const [difficulty, setDifficulty] = useState('')
  const socket = useRef()

  const handleChange = (event) => {
    setDifficulty(event.target.value)
  }

  useEffect(() => {
    // disconnect from socket when component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect()
        setIsMatching(false)
        socket.current.off()
      }
    }
  }, [])

  const joinQueue = () => {
    if (difficulty === '') {
      setError('Choose a difficulty before joining the queue')
      setShowError(true)
      return
    }
    console.log('Try Matching')
    socket.current = io(MATCHINGSERVER, connectionOptions)
    socket.current.connect()
    socket.current.emit('JoinQueue', { difficulty }, (error) => {
      if (error) {
        setError(error)
        setShowError(true)
      }
    })
    setIsMatching(true)
    socket.current.on('MatchingSuccess', ({ matchedUserId }) => {
      setMatchedUserId(matchedUserId)
      console.log(matchedUserId)
      setIsMatching(false)
      setMatched(true)
    })
    socket.current.on('ErrorMatching', ({ errorMessage }) => {
      setError(errorMessage)
      setShowError(true)
      socket.current.disconnect()
      setIsMatching(false)
    })
    console.log('joined waiting room')
  }

  const leaveQueue = () => {
    console.log('disconecting from matching websocket')
    socket.current.disconnect()
    setIsMatching(false)
  }

  return (
    <>
      <Grid mt={2}>
        <Card>
          {isMatching
            ? (
              <>
                <Box>
                  <Timer isActive={isMatching}/>
                  <Typography variant='h3' component='h2'>
                    Awaiting Match
                  </Typography>
                  <CircularProgress />
                </Box>
                <Box mt={2}>
                  <Button variant='contained' onClick={leaveQueue}>Leave Queue</Button>
                </Box>
              </>
              )
            : (
              <>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id='difficultyForm'>Difficulty</InputLabel>
                    <Select
                      labelId='difficultySelect-label'
                      id='difficultySelect'
                      value={difficulty}
                      label='Difficulty'
                      onChange={handleChange}
                    >
                      <MenuItem value='Easy'>Easy</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='Hard'>Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <Button variant='contained' onClick={joinQueue}>Start Match</Button>
                </Box>
              </>
              )}
        </Card>
      </Grid>
    </>
  )
}

export default MatchingComponent
