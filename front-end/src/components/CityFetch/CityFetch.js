import { useEffect, useState } from 'react';
import settings from '../../settings.json';

import * as React from 'react';
import Card from '@mui/material/Card';


export function CityFetch(props) {

  // "OBJEKTET"
  const city = props.obj.city;

  const [result, setResult] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/city/${city}`, {
        headers: {'accept' : 'application/json'}
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data);
          })
        .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
    
  };

    console.log(result)

  useEffect(() => {fetcher()}, []);

  return (
    <div className='cityFetchContainer'>
    <Card sx={{width: '75%', margin: 'auto', mb: '5rem', mt: '3rem', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.3))'}}>
      <div className='cityfetch'>
        <div className='cityfetchText'>
          <h1>{city}</h1>
          <p>{result ? result.extract : ''}</p>
        </div>
      </div>
    </Card>
    </div>
  );

}

