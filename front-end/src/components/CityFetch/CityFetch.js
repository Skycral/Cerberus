import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function CityFetch() {

  // "OBJEKTET"
  const city = 'Malmö';

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/city/${city}`, {
      headers: {'accept' : 'application/json'}
    })
    // fetch(`https://sv.wikipedia.org/api/rest_v1/page/summary/${city}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        })
      .catch(e => console.log(e));
  };

    console.log(result)

  useEffect(() => {fetcher()}, []);

  return (
    <div className='cityfetch'>
      {result ? <img className='cityfetchImg' src={result.originalimage.source} alt={result.description}></img> : ''}
      <div className='cityfetchText'>
        <h1>{city}</h1>
        <p>{result ? result.extract : ''}</p>
      </div>
    </div>
  );

}

