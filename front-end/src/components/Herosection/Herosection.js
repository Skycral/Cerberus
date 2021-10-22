import { Typography, Box, Button} from "@mui/material";
import { CategorySelect } from '../CategorySelect/CategorySelect'
import { TravelSelect } from '../TravelSelect/TravelSelect'
import { DateSelect } from '../DateSelect/DateSelect'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import settings from '../../settings.json'

function Herosection(props) {
    const [categories, setCategories] = useState("");
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const [result, setResult] = useState([]);
    const [city, setCity] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [searchObject, setSearchObject] = useState({
      startDate: '',
      endDate: '',
      category: '',
      company: '',
      city: ''
    });

  useEffect(() => {
      fetchCategories();
  }, []);

  // UPPDATERAR SÖKOBJEKTET ---------------------------------------------

  useEffect(() => {
    setSearchObject({...searchObject, startDate: start});
  }, [start]);

  useEffect(() => {
    setSearchObject({...searchObject, endDate: end});
  }, [end]);

  useEffect(() => {
    setSearchObject({...searchObject, category: category});
  }, [category]);

  
  useEffect(() => {
    setSearchObject({...searchObject, company: company});
  }, [company]);

  useEffect(() => {
    setSearchObject({...searchObject, city: city});
  }, [city]);

  useEffect(() => {
    console.log(searchObject);
    props.func(searchObject);
  }, [searchObject]);

  // FUNKTIONER ------------------------------------------------------

  const fetchCategories = async () => {
    try {
      const response = await (
        await fetch(`${settings.backend}/categories`)
      ).json();
      setCategories(response); 
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async (category) => {
    try {
      const response = await (await fetch(`${settings.backend}/activities/${category}`)).json();
      setResult(response);
    } catch (e) {
      console.log(e);
    }
  };

  // Denna funktion kallas på nere i komponenten DateSelect
  const updatePeriod = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const handleResultClick = (cityName) => {
    setCity(cityName);
  };


  // const fetchWeather = async () => {
  //     const response = await (
  //       await fetch(`http://localhost:3000/weather`)
  //     ).then(response => response.json()).then(response => setObj({...obj, weather: response.date}))
  //   };

  return (
    <Box noValidate autoComplete="off" sx={{marginBottom: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Link to='/page'>Singelsida</Link>
      <Typography variant="h5" sx={{mt: '30px'}} >Hur länge vill du ha semester?</Typography>
      <DateSelect func={updatePeriod}/>

      {categories ? (
      <CategorySelect sx={{width: '50%'}} onChange={(e) => setCategory(e.target.value)} categories={categories} value={category ? category : ''}/>
        ) : (
      <p>Laddar filter...</p>
      )}

        <TravelSelect sx={{width: '50%'}} onChange={(e) => setCompany(e.target.value)} value={company ? company : ''}/>

      <Button 
          sx={{ width: '50%'}} 
          variant="contained"
          onClick={() => handleClick(category)}>
      Visa platser
      </Button>
      {result ? result.map((e, i) => {
          return (
            <Link key={`res-${i}`} to='/page' onMouseEnter={() => handleResultClick(e.cityName)}>
              <Typography variant="h5">{e.cityName}</Typography>
            </Link>
            );
      }) : ''}
      
    </Box>
  );
}

  export default Herosection;

