import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function EventFetch() {

  // "OBJEKTET"
  const countryCode = 'SE';
  const city = 'Stockholm';
  const startDate = '2021-10-20T00:00:00Z';
  const endDate = '2021-10-29T23:59:59Z';
  const familyFriendly = 'yes'; //yes, no, only -> ONLY verkar inte funka i Sverige

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/events/${startDate}/${endDate}/${city}/${countryCode}/0`, {
      headers: {'accept' : 'application/json'}
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setResult(data._embedded.events);
          })
        .catch(e => console.log(e));
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


    