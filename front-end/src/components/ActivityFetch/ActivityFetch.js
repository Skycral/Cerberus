import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function ActivityFetch(props) {

  // "OBJEKTET"
  const activity = 'nöjespark'
  const city = props.obj.city;

  const [result, setResult] = useState();
  const [image, setImage] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/places/${activity}/${city}`, {
        headers: {'accept' : 'application/json'}
      })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.resultat);
        setImage(data.foto);
        })
      .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
    
  };
 
  useEffect(() => {fetcher()}, []);

  return (
    <div className='activityfetch'>
      {image ? <img src={image} alt='hej'></img> : ''}
      <div>
      <h1>{result ? result.results[0].name : ''}</h1>
        <p></p>
      </div>
    </div>
  );

}