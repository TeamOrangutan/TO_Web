import {  Box, } from '@mui/material';

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    
    >
      {value === index && (
        <Box sx={{ p: 3, border: '1px solid #DEDEDE', borderRadius: 2 }}>
          {children}
          
        </Box>
        
      )}
    </div>
  );
}