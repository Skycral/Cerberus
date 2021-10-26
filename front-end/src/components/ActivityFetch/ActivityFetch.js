import { useEffect, useState } from 'react';
import settings from '../../settings.json';
import { Link } from 'react-router-dom';

import * as React from 'react';
import Card from '@mui/material/Card';


export function ActivityFetch(props) {

  // "OBJEKTET"
  const activity = props.obj.activity;
  const city = props.obj.city;

  const [result, setResult] = useState();
  const [image, setImage] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/places/${activity}/${city}`, {
        headers: {'accept' : 'application/json'}
      })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.resultat);
        setImage(data.foto);
      })
      .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
    
  };
 
  useEffect(() => {fetcher()}, []);

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mb: '5rem', mt: '3rem' }}>
      <div className='activityfetch'>
        <div className='activityFetchImg'>
          {image ? <img src={image} alt='hej'></img> : ''}
        </div>
        <div className='activityfetchText'>
          <h3>{result ? result.results[0].name : ''}</h3>
          <p>
            Adress: {result ? result.results[0].formatted_address : ''}<br />
            {/* Öppettider: {result ? result.results[0].opening_hours.weekday_text: ''}<br /> */}
            Användarbetyg: {result ? result.results[0].rating : ''} av 5<br />
            <a>{result ? result.results[0].url : ''}</a><br />
          </p>
          <h3>{result ? result.results[1].name : ''}</h3>
          <p>
            Adress: {result ? result.results[1].formatted_address : ''}<br />
            {/* Öppettider: {result ? result.results[1].opening_hours.weekday_text: ''}<br /> */}
            Användarbetyg: {result ? result.results[1].rating : ''} av 5<br />
            <Link href={result ? result.results[1].url : ''}></Link><br />
          </p>
          <h3>{result ? result.results[2].name : ''}</h3>
          <p>
            Adress: {result ? result.results[2].formatted_address : ''}<br />
            {/* Öppettider: {result ? result.results[2].opening_hours.weekday_text: ''}<br /> */}
            Användarbetyg: {result ? result.results[2].rating : ''} av 5<br />
            <a>{result ? result.results[2].url : ''}</a>
          </p>
        </div>
      </div>
    </Card>
  );

}