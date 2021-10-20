import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function CityFetch() {

  // "OBJEKTET"
  const city = 'Sundsvall';

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/city/${city}`, {
      headers: {'accept' : 'application/json'}
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        })
      .catch(e => console.log(e));
  };

    console.log(result)

  useEffect(() => {fetcher()}, []);

  return (
    <div>
      <h1>{city}</h1>
      <p>{result ? result.extract : ''}</p>
      {result ? <img src={result.originalimage.source} alt={result.description}></img> : ''}
    </div>
  );

}

