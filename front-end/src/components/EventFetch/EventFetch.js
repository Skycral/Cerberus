import { useEffect, useState } from 'react';
import settings from '../../settings.json';


export function EventFetch(props) {

  console.log('hanna', props.obj);

  // "OBJEKTET"
  const searchObject = {
    countryCode: 'SE',
    city: 'Malmo',
    startDate: '2021-10-20T00:00:00Z',
    endDate: '2021-10-29T23:59:59Z'
  }

  const [result, setResult] = useState();
  
  const fetcher = () => {
    fetch(`${settings.backend}/events/${searchObject.startDate}/${searchObject.endDate}/${searchObject.city}/${searchObject.countryCode}/0`, {
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
    <h2>Event i {searchObject.city} mellan {searchObject.startDate.substring(0, 10)} och {searchObject.endDate.substring(0, 10)}</h2>
    {result ? result.map((e, i) => { 
    return <p key={`event-${i}`}><a href={e.url} target="_blank" rel="noreferrer">{e.dates.start.localDate}, kl. {e.dates.start.localTime.substring(0,5)} - {e.name}</a></p>
  }) : ''}
    </>

  );
}


    