import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export function DateSelect() {

    // JOBBAR MED DAGENS DATUM ------------------------------------------------------

    const now = Date.now(); //Dagens datum i millisekunder sedan 1970
    const today = new Date(now);
    let yearToday = today.getFullYear();
    let monthToday = today.getMonth() + 1; // Nollindexerat
    if (monthToday.toString().length === 1) {monthToday = `0${monthToday}`}; // Lägger till en nolla i månaden om den bara består av en siffra
    let dayToday = today.getDate(); 
    if (dayToday.toString().length === 1) {dayToday = `0${dayToday}`}; // Lägger till en nolla i dagen om den bara består av en siffra
    const todayStr = `${yearToday}-${monthToday}-${dayToday}`


    // JOBBAR MED DEFAULT SLUTDATUM, DVS ETT ÅR FRÅN NU ------------------------------------------------------

    const yearFromNow = new Date(now + 31536000730); //Plussar dagens datum med antalet millisekunder på ett år för att få fram samma datum ett år från nu
    let yearNextYear = yearFromNow.getFullYear();
    let monthNextYear = yearFromNow.getMonth() + 1; // Nollindexerat
    if (monthNextYear.toString().length === 1) {monthNextYear = `0${monthNextYear}`}; // Lägger till en nolla i månaden om den bara består av en siffra
    let dayNextYear = yearFromNow.getDate(); 
    if (dayNextYear.toString().length === 1) {dayNextYear = `0${dayNextYear}`}; // Lägger till en nolla i dagen om den bara består av en siffra
    const nextYearStr = `${yearNextYear}-${monthNextYear}-${dayNextYear}`
    
    // STATES ------------------------------------------------------

    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(nextYearStr);
    const [startYear, setStartYear] = useState(yearToday);
    const [endYear, setEndYear] = useState(yearNextYear); // +1

    const [dateRange, setDateRange] = useState();
    const [days, setDays] = useState();

    const [result, setResult] = useState();
    const [freeDays, setFreeDays] = useState();
    const [userMessage, setUserMessage] = useState();

    // USE EFFECTS ------------------------------------------------------

    useEffect(() => {
        getDateRange();
        if (days) {
            handleClick(days, dateRange);
        }
    },[startDate, endDate])

    useEffect(() => {
        if (days && dateRange && days > 2) {
            handleClick(days, dateRange)
            setUserMessage(`Följande perioder ger mest "bang for the buck", du behöver ta ut ${days-freeDays > 0 ? days-freeDays : 0} semesterdagar:`)
        } else {
            console.log('Input not set');
            setUserMessage('Ange tre dagar eller fler.')
        };
    }, [days, freeDays])

    useEffect(() => {console.log('full range', dateRange)}, [dateRange]);

    //FUNKTIONER ------------------------------------------------------

    const startHandler = (value) => {
        setStartDate(value);
        setStartYear(value.substring(0, 4));
        console.log('start', value);
    }

    const endHandler = (value) => {
        setEndDate(value);
        setEndYear(value.substring(0, 4));
        console.log('slut', endDate, value);
    }

    //const startMonth = '';

    const getDateRange = async () => {
        const responseFirst = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}`); ///${startMonth ? startMonth : ''}
        const parsingFirst = await responseFirst.json();
        let twoYears = false;
        let filterSecond = [];
        if (startYear !== endYear) { twoYears = true; }; // Kollar om start- och slutåren är olika

        const filterFirst = parsingFirst.dagar.filter((e) => {
            if (e.datum >= startDate && e.datum <= endDate) {
                return e;
            } else {
                return '';
            }
        });

        console.log('filterfirst', filterFirst);

        if (twoYears) {
            const responseSecond = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${endYear}`);
            const parsingSecond = await responseSecond.json();

            filterSecond = parsingSecond.dagar.filter((e) => {
                if (e.datum >= startDate && e.datum <= endDate) {
                    return e;
                } else {
                    return '';
                }
            });
            console.log('filtersecond', filterSecond);
        }

        if (twoYears) {
            setDateRange(filterFirst.concat(filterSecond));
        } else {
            setDateRange(filterFirst);
        }
    }
    
    const handleClick = (days, date) => {
        let arr = []
        let numOfDays = 0;
        let maxNumberOfDays = 0;
        let topPickArray = []; // Denna array innehåller i sin tur arrayer med de bästa perioderna att ta ledigt

        for(let i = 0; i < date.length; i++) {
            arr.push(date[i]);
            if(arr.length >= days) {
                arr.forEach(e => e['arbetsfri dag'] === 'Ja' ? numOfDays += 1 : '');
                if (numOfDays > maxNumberOfDays) {
                    maxNumberOfDays = numOfDays;
                    setFreeDays(numOfDays);
                    topPickArray = [[...arr]];
                } else if (numOfDays === maxNumberOfDays) {
                    topPickArray.push([...arr]);
                }
                numOfDays = 0;
            }
            if(arr.length >= days) {
                arr.shift();
            }
        }
        setResult(topPickArray)
    }

    console.log('result', result)

    return(
        <div>
            <TextField type="number" label={'Antal dagar'} onChange={(e) => {setDays(e.target.value)}}/>

            <p>{userMessage}</p>
            {result ? result.map((e, i) => { 
                return <button key={`period-${i}`}>{e[0].datum} - {e[e.length-1].datum}</button>}) : ''}

            {result ? <p>Passar det inte riktigt? Ange en tidsperiod nedan för att smalna av sökningen:</p> : ''}

            <form>
            <legend>Mellan vilken period vill du vara ledig?</legend>
                <input className='Date' type="date" id="startDate" defaultValue={startDate} onChange={(e) => startHandler(e.target.value)}/>
                <input className='Date' type="date" id="endDate" defaultValue={endDate} onChange={(e) => endHandler(e.target.value)}/>
            </form>
        </div>
    );
}