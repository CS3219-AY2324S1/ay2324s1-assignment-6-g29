import { Grid, Typography, Box, Button } from '@mui/material'

function App({setMatched, setMatchedUserId, matchedUserId}) {

  const retryMatch = () => {
    setMatchedUserId('')
    setMatched(false)
  }

  return (
    <Grid>
      <Box>
        <Typography variant='h2'>
          You have matched with {matchedUserId}
        </Typography>
      </Box>
      <Box mt={2}>
        <Button variant='contained' onClick={retryMatch}>Retry matching</Button>
      </Box>
    </Grid>
  );
}

export default App;
