import { useEffect, useState } from 'react';
import settings from '../../settings.json';

import * as React from 'react';
import Card from '@mui/material/Card';


export function ResultCard(props) {

  // "OBJEKTET"
  const city = props.obj;

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
    <Card sx={{ maxWidth: '75%', margin: 'auto', mb: '1rem', mt: '2rem' }}>
      <div className='resultCard'>
        <div className='cityFetchImg'>
          {result ? <img className='resultCardImg' src={result.originalimage.source} alt={result.description}></img> : ''}
        </div>
        <div className='resultCardText'>
          <h4>{result ? result.title : ''}</h4>
          <p>{result ? result.extract.substring(0, 100) : ''}</p>
        </div>
       </div>
    </Card>
  );

}
