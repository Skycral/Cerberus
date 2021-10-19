import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export function DateSelect() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startYear, setStartYear] = useState();
    const [endYear, setEndYear] = useState();

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

    const sameYear = async () => {
        const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}`);
        const parsing = await response.json();

        const filter = parsing.dagar.filter((e) => {
            if (e.datum >= startDate && e.datum <= endDate) {
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

    console.log(result);

    const differentYear = async () => {
        const firstYear = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}`);
        const secondYear = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${endYear}`);
        const parsingFirst = await firstYear.json();
        const parsingSecond = await secondYear.json();
        console.log(parsingFirst.cachetid, parsingSecond.cachetid);
    }

    useEffect(() => {
        if(startYear && endYear && startYear === endYear) {
            sameYear(startYear);
        } else if (startYear && endYear) {
            differentYear(startYear, endYear);
        }
    },[startYear, endYear])

    console.log(date)
    
    return(
        <div>
            <TextField type="number "label='Antal dagar' onChange={(e) => setDays(e.target.value)}/>
            <form>
                <input type="date" id="startDate" onChange={(e) => startHandler(e.target.value)}/>
                <input type="date" id="endDate" onChange={(e) => endHandler(e.target.value)}/>
            </form>
        <button onClick={() => {handleClick(days, date)}}>Sök</button>
        </div>
    );
}