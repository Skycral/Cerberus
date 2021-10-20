import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function WeatherSelect() {

  // "OBJEKTET"
  const startDateWeather = '2020-10-07T00%3A00%3A00'; //'2021-10-20T00:00:00Z'
  const endDateWeather = '2020-10-08T00%3A00%3A00'
  const cityWeather = 'Stockholm';
  

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/weather/${startDateWeather}/${endDateWeather}/${cityWeather}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.locations[0].values);
      
          const result = data.locations[0].values;
      
          result.forEach(e => {
            console.log(`Genomsnittstemperatur den ${e.datetimeStr.substring(0,10)}: ${e.temp} grader Celcius`)
          })
      
      
        })
        .catch((e) => console.log(e));
  };


    console.log(result)

    
  useEffect(() => {fetcher()}, []);

  return(
    <>
    <h2>Event i {city} mellan {startDate.substring(0, 10)} och {endDate.substring(0, 10)}</h2>
    {result ? result.map((e, i) => { 
    return <p key={`event-${i}`}><a href={e.url} target="_blank">{e.dates.start.localDate}, kl. {e.dates.start.localTime.substring(0,5)} - {e.name}</a></p>
  }) : ''}
    </>

  );
}