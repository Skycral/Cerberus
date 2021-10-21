import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function ActivityFetch() {

  // "OBJEKTET"
  const activity = 'Nöjespark'
  const city = 'Stockholm';

  const [result, setResult] = useState();
  const [image, setImage] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/places/${activity}/${city}`, {
      headers: {'accept' : 'application/json'}
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.resultat);
        setImage(data.foto);
        })
      .catch(e => console.log(e));
  };

    console.log(result)
    console.log(image)

  useEffect(() => {fetcher()}, []);

  return (
    <div className='activityfetch'>
      {image ? <img src={image} alt='hej'></img> : ''}
      <div>
        <h1>{result.results[0].name}</h1>
        <p></p>
      </div>
    </div>
  );

}