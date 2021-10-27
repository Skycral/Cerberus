import { useEffect, useState } from 'react';
import settings from '../../settings.json';
import * as React from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export function EventFetch(props) {

  // "OBJEKTET"
  const searchObject = {
    countryCode: 'SE', //ETT PROBLEM NÄR VI VILL UTÖKA TILL VÄRLDEN, kanske går att ta bort?
    city: props.obj.city,
    startDate: props.obj.startDate + 'T00:00:00Z',
    endDate: props.obj.endDate + 'T23:59:59Z'
  }

  const [result, setResult] = useState();
  
  const fetcher = () => {
    try {
      fetch(`${settings.backend}/events/${searchObject.startDate}/${searchObject.endDate}/${searchObject.city}/${searchObject.countryCode}/0`, {
        headers: {'accept' : 'application/json'}
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data._embedded.events);
        })
      .catch(e => console.log(e));
    } catch (error) {
      console.log(error);
    }
    
  };
    
  //Fetchar data när sidan hämtas
  useEffect(() => {fetcher()}, []);

  function createEventData(date, time, name) {
    return { date, time, name };
  }
  
  const rows = [
    createEventData('Frozen yoghurt', 159, 6.0),
    createEventData('Ice cream sandwich', 237, 9.0),
    createEventData('Eclair', 262, 16.0),
    createEventData('Cupcake', 305, 3.7),
    createEventData('Gingerbread', 356, 16.0),
  ];

  return(
    <div className="eventfetch">
      <Divider variant="middle" sx={{width: '75%', mb: '2rem', alignSelf: 'center', backgroundColor: 'rgba(41, 112, 49, 0.5)'}} />
    
      <h1 className='activityHeader'>
        Event i {searchObject.city} mellan {searchObject.startDate.substring(0, 10)} och {searchObject.endDate.substring(0, 10)}
      </h1>

      <Card sx={{ maxWidth: 800, margin: 'auto', mb: '5rem', mt: '1rem' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="event table" size='medium'>
          <TableHead>
            <TableRow>

              <TableCell sx={{fontWeight: 'bold'}}>Datum</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Tid</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Evenemang</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Biljetter</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {result ? result.map((e, i) => (
              
              <TableRow
              key={`${e}-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>
                  {e.dates.start.localDate ? e.dates.start.localDate : ''}
                </TableCell>
                <TableCell align="left">
                  {e.dates.start.localTime ? e.dates.start.localTime.substring(0,5) : ''}
                </TableCell>
                <TableCell align="left">
                  {e.name ? e.name : ''}
                </TableCell>
                <TableCell align="left">
                  <Button href={e.url}>Boka</Button>
                </TableCell>
              </TableRow>
            )) : ''}
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
    </div>

    



  );
}


    