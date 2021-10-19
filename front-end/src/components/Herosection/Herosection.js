import { Typography, Box, TextField, Button} from "@mui/material";
import { FilterSelect } from '../FilterSelect/FilterSelect'

function Herosection() {
    return (
        <Box noValidate autoComplete="off" sx={{marginBottom: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h5" ></Typography>
        <TextField label='' sx={{ width: '50%'}}/>
       <FilterSelect />
        <Button 
            sx={{ width: '50%'}} 
            onClick={''}
            variant="contained">
        Sök
        </Button>
      </Box>
    );
  }
  
  export default Herosection;