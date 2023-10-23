import { useState } from 'react';
import { Container } from '@mui/material'
import MatchingComponent from './MatchingComponent'
import MatchedPage from './MatchedPage'
import ErrorMessage from './ErrorMessage'

function App() {
  const [matched, setMatched] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  const [matchedUserId, setMatchedUserId] = useState('')
  return (
    <Container>
      {showError && <ErrorMessage error={error} setError={setError} showError={showError} setShowError={setShowError}/>}
      {matched ? 
        (
          <>
            <MatchedPage matchedUserId={matchedUserId} setMatched={setMatched} setMatchedUserId={setMatchedUserId}/>
          </>
        )
      : 
        (
          <>
            <MatchingComponent 
              setMatched={setMatched} 
              setMatchedUserId={setMatchedUserId} 
              setError={setError} 
              setShowError={setShowError}
            />
          </>
        )}
    </Container>
  );
}

export default App;
