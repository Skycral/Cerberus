import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function EventFetch() {

  // "OBJEKTET"
  const city = 'Stockholm';

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`https://sv.wikipedia.org/api/rest_v1/page/summary/${city}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setResult(data);
          })
        .catch(e => console.log(e));
  };


    console.log(result)

    
  useEffect(() => {fetcher()}, []);

  return(
    <>
    <h1>{city}</h1>
    {eventDiv.innerHTML += `<p>${data.extract}</p><img src=${data.originalimage.source} alt=${data.description}>`}
    </>

  );


}

