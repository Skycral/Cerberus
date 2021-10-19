import { Typography, Box, TextField, Button} from "@mui/material";
import { useState, useEffect } from "react";

function Herosection() {
    return (
        <Box noValidate autoComplete="off" sx={{marginBottom: '100px'}}>
        <Typography variant="h5"></Typography>
        <TextField label=''/>
        <TextField label=''/>
        <TextField label=''/>
       
        <Button 
            sx={{ width: '100%'}} 
            onClick={''}
            variant="contained">
        </Button>
      </Box>
    );
  }
  
  export default Herosection;