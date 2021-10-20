import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MonthPicker from './MonthPicker'


export function DateSelect() {
    const d = new Date();
    let year = d.getFullYear();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startYear, setStartYear] = useState(year);
    const [endYear, setEndYear] = useState(year);

    const [date, setDate] = useState();
    const [days, setDays] = useState();

    const [result, setResult] = useState();

    const startHandler = (value) => {
        setStartDate(value);
        setStartYear(value.substring(0, 4))
    }

    const endHandler = (value) => {
        setEndDate(value);
        setEndYear(value.substring(0, 4))
    }

    const startMonth = ''

    const sameYear = async () => {
        const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}/${startMonth ? startMonth : ''}`);
        const parsing = await response.json();

        const filter = parsing.dagar.filter((e) => {
            if (e.datum >= startDate && e.datum <= endDate) {
                return e;
            } else if (!startDate && !endDate) {
                return e;
            } else {
                return '';
            }
        })
        setDate(filter)
    }
    
    const handleClick = (days, date) => {
        let arr = []
        let numOfDays = 0;
        let maxNumberOfDays = 0;
        let topPickArray = [];

        for(let i = 0; i < date.length; i++) {
            arr.push(date[i]);
            if(arr.length >= days) {
                arr.forEach(e => e['arbetsfri dag'] === 'Ja' ? numOfDays += 1 : '');
                if (numOfDays > maxNumberOfDays) {
                    maxNumberOfDays = numOfDays;
                    topPickArray = [...arr];
                }
                numOfDays = 0;
            }
            if(arr.length >= days) {
                arr.shift();
            }
        }
        setResult(topPickArray)
    }

    // const differentYear = async () => {
    //     const firstYear = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}`);
    //     const secondYear = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${endYear}`);
    //     const parsingFirst = await firstYear.json();
    //     const parsingSecond = await secondYear.json();
    //     console.log(parsingFirst.cachetid, parsingSecond.cachetid);
    // }

    useEffect(() => {
        if(startYear && endYear && startYear === endYear) {
            sameYear(startYear);
        } 
        // else if (startYear && endYear) {
        //     differentYear(startYear, endYear);
        // }
    },[startYear, endYear])

    console.log(result)

    return(
        <div>
            <TextField type="number "label={'Antal dagar'} onChange={(e) => setDays(e.target.value)}/>


            <form>
                <input className='Date' type="date" id="startDate" onChange={(e) => startHandler(e.target.value)}/>
                <input className='Date' type="date" id="endDate" onChange={(e) => endHandler(e.target.value)}/>
            </form>
            <MonthPicker />
            
        <button onClick={() => {if (days, date) {handleClick(days, date)} else {console.log('Input not set')} }}>Sök</button>
        </div>
    );
}