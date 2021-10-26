import { Typography, Box, Button, Card, } from "@mui/material";
import { CategorySelect } from '../CategorySelect/CategorySelect'
import { TravelSelect } from '../TravelSelect/TravelSelect'
import { ResultCard } from '../ResultCard/ResultCard'
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
    <Box noValidate autoComplete="off" className='heroContainer'>
      <Typography variant="h5" sx={{mt: '2rem', mb: '1.5rem',  fontWeight: 'bold'}} >Hur länge vill du ha semester?</Typography>
      <DateSelect func={updatePeriod}/>

      <div className='filters'>
        {categories ? (
        <CategorySelect  
          onChange={(e) => setCategory(e.target.value)} 
          categories={categories} 
          value={category ? category : ''}
        />
          ) : (
        <p>Laddar filter...</p>
        )}

        <TravelSelect 
          onChange={(e) => setCompany(e.target.value)} 
          value={company ? company : ''}/>
      </div>

      <Button 
          sx={{ width: '50%', mb: '2rem'}} 
          variant="contained"
          onClick={() => {
            handleClick(category, company, start, end)
          }}>
      Visa platser
      </Button>
      {result && start && end && category && company ? result.map((e, i) => {
          return (
            <Link key={`res-${i}`} to='/page' onMouseEnter={() => handleResultClick(e.cityName, e.activity)}>
              <ResultCard obj={e.cityName}>
                <Typography variant="h5">{e.cityName}</Typography>
              </ResultCard>
            </Link>
            );
      }) : ''}
      
    </Box>
  );
}

  export default Herosection;

