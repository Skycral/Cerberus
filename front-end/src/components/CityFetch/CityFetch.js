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

  // return (
  //   <Card sx={{ maxWidth: 800 }}>
  //     <CardActionArea>
  //       <CardMedia
  //         component="img"
  //         height="200"
  //         image={result ? result.originalimage.source : ''}
  //         alt={result.description}
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="div">
  //         {city}
  //         </Typography>
  //         <Typography variant="body2" color="text.secondary">
  //         {result ? result.extract : ''}
  //         </Typography>
  //       </CardContent>
  //     </CardActionArea>
  //   </Card>
  // );

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mb: '5rem', mt: '3rem' }}>
      <div className='cityfetch'>
          {result ? <img src={result.originalimage.source} alt={result.description}></img> : ''}
        <div className='cityfetchText'>
          <h1>{city}</h1>
          <p>{result ? result.extract : ''}</p>
        </div>
      </div>
    </Card>
  );

}

