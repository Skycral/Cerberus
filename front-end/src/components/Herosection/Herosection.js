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
    const [activity, setActivity] = useState();
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
      activity: '',
      city: ''
    });

  useEffect(() => {
      fetchCategories();
  }, []);

  // UPPDATERAR SÖKOBJEKTET ---------------------------------------------

  useEffect(() => {
    setSearchObject({...searchObject, endDate: end, startDate: start});
  }, [start, end]);

  useEffect(() => {
    setSearchObject({...searchObject, category: category});
  }, [category]);

  useEffect(() => {
    setSearchObject({...searchObject, company: company});
  }, [company]);

  useEffect(() => {
    setSearchObject({...searchObject, city: city, activity: activity});
  }, [city, activity]);

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

  // City select-komponent
  const handleClick = async (category, company, start, end) => {
    try {
      console.log('till db: ', category, company, start, end);
      //const response = await (await fetch(`${settings.backend}/activities/${category}`)).json();
      const response = await (await fetch(`${settings.backend}/result/${company}/${category}/${start}/${end}`)).json();
      setResult(response);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  // Denna funktion kallas på nere i komponenten DateSelect
  const updatePeriod = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const handleResultClick = (cityName, activity) => {
    setCity(cityName);
    setActivity(activity);
  };
  // const fetchWeather = async () => {
  //     const response = await (
  //       await fetch(`http://localhost:3000/weather`)
  //     ).then(response => response.json()).then(response => setObj({...obj, weather: response.date}))
  //   };

  return (
    <Box noValidate autoComplete="off">
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
          onClick={() => handleClick(category, company, start, end)}>
      Visa platser
      </Button>
      {result ? result.map((e, i) => {
          return (
            <Link key={`res-${i}`} to='/page' onMouseEnter={() => handleResultClick(e.cityName, e.activity)}>
              <Typography variant="h5">{e.cityName}</Typography>
            </Link>
            );
      }) : ''}
      
    </Box>
  );
}

  export default Herosection;

