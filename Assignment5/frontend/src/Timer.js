import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
 
function Timer({isActive}) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let intervalId;
    if (isActive) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isActive, time]);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  
  return (
    <Grid className='stop-watch'>
      <Grid className='timer'>
        <Typography className='digits'>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        </Typography>
      </Grid>
    </Grid>
    );
}
 
export default Timer;