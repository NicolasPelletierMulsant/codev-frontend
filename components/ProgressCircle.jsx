import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressCircle({ sx }) {
  return (
    <Box sx={Object.assign({}, {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
    }, sx)}>
      <CircularProgress />
    </Box>
  );
}