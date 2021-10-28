import { useEffect, useState } from 'react';
import settings from '../../settings.json';

import * as React from 'react';
import {Card, CircularProgress} from '@mui/material/';


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

  useEffect(() => {fetcher()}, []);

  return (
    
    <div className='cityFetchContainer'>
    {result ? (
    <Card sx={{width: '75%', margin: 'auto', mb: '5rem', mt: '3rem', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.3))'}}>
      <div className='cityfetch'>
        <div className='cityfetchText'>
          <h1>{city}</h1>
          <p>{result ? result.extract : ''}</p>
        </div>
      </div>
    </Card>
    )
      
      :  <CircularProgress />}
</div>
  );

}

