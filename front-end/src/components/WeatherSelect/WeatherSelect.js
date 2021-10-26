import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function WeatherSelect() {

  // "OBJEKTET"
  const startDateWeather = '2020-10-07T00%3A00%3A00'; //'2021-10-20T00:00:00Z'
  const endDateWeather = '2020-10-08T00%3A00%3A00'
  const cityWeather = 'Stockholm';
  

  const [result, setResult] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/weather/${startDateWeather}/${endDateWeather}/${cityWeather}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
          const result = data.locations[0].values;
          result.forEach(e => {
            console.log(`Genomsnittstemperatur den ${e.datetimeStr.substring(0,10)}: ${e.temp} grader Celcius`)
          })      
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {fetcher()}, []);

  return(
    <>
    <h2>{}</h2>
    </>

  );
}