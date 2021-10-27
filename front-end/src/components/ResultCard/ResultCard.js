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

  useEffect(() => {fetcher()}, [city]);

  return (
    <div className='resultContainer'>
    <Card sx={{maxHeight: '100%', maxWidth: '75%', margin: 'auto', borderRadius: '20px', boxShadow: '0 6px 20px rgba(41, 112, 49, 0.3)', filter: 'drop-shadow(0 6px 20px rgba(41, 112, 49, 0.3))'}}>
      <div className='resultCard'>
        <div className='resultCardImg'>
          {result ? <img className='cardImg' src={result.originalimage.source} alt={result.description}></img> : ''}
        </div>
        <div className='resultCardText'>
          <h3>{result ? result.title : ''}</h3>
          <p>{result ? `${result.extract.substring(0, 300)}...` : ''}</p>
          <div className='resultCardButton'>
          {props.children}
          </div>
        </div>
       </div>
       
    </Card>
    </div>
  );

}
