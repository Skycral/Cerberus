import { useEffect, useState } from 'react';
import settings from '../../settings.json';
import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box}from '@mui/material';


export function ActivityFetch(props) {

  // "OBJEKTET"
  const activity = props.obj.activity;
  const city = props.obj.city;

  const [result, setResult] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/places/${activity}/${city}`, {
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
  console.log(result)

  return (
    <Box
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h3" align="center" component="h2" gutterBottom  sx={{width: "100%"}}>
        {activity} i {city}
      </Typography>

    {result ? result.details.map((e, i) => {
      return (
        <Card key={`activity-${i}`} sx={{ maxWidth: 345, margin: '2rem' }}>
        <CardMedia
          component="img"
          height="140"
          image={result.photos[i] ? result.photos[i] : result.photos[i - 1]}
          alt={e.result.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {e.result.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Adress: {e.result.formatted_address}<br/><br/>Användarbetyg: {e.result.rating} av 5
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={e.result.url} size="small">Google maps</Button>
          <Button href={e.result.website} size="small">Hemsida</Button>
        </CardActions>
      </Card>
      );
    }): <p>Laddar aktiviteter..</p>}
  </Box>
  );
}