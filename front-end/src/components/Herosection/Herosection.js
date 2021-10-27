import { Typography, Button, Stack, Chip } from "@mui/material";
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

  const handleDelete = (input) => {
    if(input === 'date') {
      setStart();
      setEnd();
    } else if (input === 'category') {
      setCategory();
    } else {
      setCompany();
    }
  };

  return (
    <div className='container'>
      <div className='heroContainer'>
      <video className='background' src='images/bakgrundsvideo.mp4' autoPlay loop muted alt=''/>
        <div className='box'>
        <div className='heroBox'>
        <DateSelect func={updatePeriod}/>
          <div className='filters'>
            {categories ? (
              <CategorySelect 
                className='categoryHero'
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
            sx={{height: '50%', width: '50%', mb: '2rem', justifySelf: 'center', alignSelf: 'center'}}
            variant="contained"
            color='success'
            onClick={() => {
              handleClick(category, company, start, end)
            }}>
            Visa platser
            </Button>

        </div>
        <div className='heroResults'>
        {start && end ? 
                <Stack direction="row" spacing={1} sx={{marginBottom: '2rem', marginRight: '1rem'}}>
                <Chip
                sx={{color: 'black', backgroundColor: 'white'}}
                label={`${start}-${end}`}
                variant="outlined"
                onClick={''}
                onDelete={() => handleDelete('date')}
                />
                </Stack>
              : ''}
              {category ? 
              <Stack direction="row" spacing={1} sx={{marginBottom: '2rem', marginRight: '1rem'}}>
                <Chip
                sx={{color: 'black', backgroundColor: 'white'}}
                label={category}
                variant="outlined"
                onClick={''}
                onDelete={() => handleDelete('category')}
                />
                </Stack>
              : ''}
              {company ?
              <Stack direction="row" spacing={1} sx={{marginBottom: '2rem', marginRight: '1rem'}}>
                <Chip
                sx={{color: 'black', backgroundColor: 'white'}}
                label={company}
                variant="outlined"
                onClick={''}
                onDelete={() => handleDelete('company')}
                />
                </Stack>
              : ''}
              </div>
          </div>
        </div>
        {result && start && end && category && company ? result.map((e, i) => {
            return (
              <div>
                
                <ResultCard obj={e.cityName}>
                  <Link key={`res-${i}`} to='/page' onMouseEnter={() => handleResultClick(e.cityName, e.activity)}>
                  <Button
                    sx={{borderRadius: '20px', mt: '2rem', justifySelf: 'center', alignSelf: 'center', float: 'right'}}
                    variant="contained"
                    color='success'>Välj destination
                    </Button>
                  </Link>
                </ResultCard>
                
                
              </div>
              );
        }) : ''}
      </div>
    );
}

  export default Herosection;

