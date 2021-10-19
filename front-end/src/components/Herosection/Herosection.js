import { Typography, Box, Button} from "@mui/material";
import { FilterSelect } from '../FilterSelect/FilterSelect'
import { DateSelect } from '../DateSelect/DateSelect'
import { useState, useEffect } from "react";

function Herosection() {
    const [categories, setCategories] = useState("");
    const [obj, setObj] = useState({
      city: '',
      activity: '',
      weather: '',
      category: '',
    })

    // useEffect(() => {
    //     fetchCategories();
    //   }, []);

    // const fetchCategories = async () => {
    //     const response = await (
    //       await fetch(`http://localhost:3000/categories`)
    //     ).json();
    //     setCategories(response);
    //   };

    // const fetchWeather = async () => {
    //     const response = await (
    //       await fetch(`http://localhost:3000/weather`)
    //     ).then(response => response.json()).then(response => setObj({...obj, weather: response.date}))
    //   };

    return (
        <Box noValidate autoComplete="off" sx={{marginBottom: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h5" >Sök här</Typography>
        <DateSelect />
        {categories ? (
        <FilterSelect onChange={(e) => setObj({...obj, category: e.target.value})} categories={categories} />
         ) : (
        <p>Loading categories</p>
      )}
        <Button 
            sx={{ width: '50%'}} 
            variant="contained">
        Sök
        </Button>
      </Box>
    );
  }
  
  export default Herosection;