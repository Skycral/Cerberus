import { Typography, Box, Button} from "@mui/material";
import { CategorySelect } from '../CategorySelect/CategorySelect'
import { DateSelect } from '../DateSelect/DateSelect'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import settings from '../../settings.json'

function Herosection() {
    const [categories, setCategories] = useState("");
    const [category, setCategory] = useState();
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetchCategories();
      }, []);

    const fetchCategories = async () => {
        const response = await (
          await fetch(`${settings.backend}/categories`)
        ).json();
        setCategories(response);
      };

      const handleClick = async (category) => {
        const response = await (await fetch(`${settings.backend}/${category}`)).json();
          setResult(response);

        };
    // const fetchWeather = async () => {
    //     const response = await (
    //       await fetch(`http://localhost:3000/weather`)
    //     ).then(response => response.json()).then(response => setObj({...obj, weather: response.date}))
    //   };

    return (
        <Box noValidate autoComplete="off" sx={{marginBottom: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Link to='/page'>Singelsida</Link>
        <Typography variant="h5" >Sök här</Typography>
        <DateSelect />
        {categories ? (
        <CategorySelect sx={{width: '50%'}} onChange={(e) => setCategory(e.target.value)} categories={categories} value={category ? category : ''}/>
         ) : (
        <p>Loading categories</p>
      )}
        <Button 
            sx={{ width: '50%'}} 
            variant="contained"
            onClick={() => handleClick(category)}>
        Sök
        </Button>
        {result ? result.map(e => {
            return <Typography variant="h5" >{e.city}</Typography>
        }) : ''}
        
      </Box>
    );
  }
  
  export default Herosection;