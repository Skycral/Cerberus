import { TextField, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export function DateSelect(props) {

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
    const [endYear, setEndYear] = useState(yearNextYear);

    const [dateRange, setDateRange] = useState();
    const [days, setDays] = useState();

    const [result, setResult] = useState();
    const [freeDays, setFreeDays] = useState();
    const [userMessage, setUserMessage] = useState();

    const [active, setActive] = useState();

    // USE EFFECTS ------------------------------------------------------

    useEffect(() => {
        getDateRange();
        if (days) {
            handleClick(days, dateRange);
        }
    },[startDate, endDate])

    useEffect(() => {
        if (days < 3) {
            setUserMessage(
                'Ange minst 3 dagar'
            );
            setDays();
        } else if (days && dateRange && days > 2) {
            handleClick(days, dateRange)
            setUserMessage(
                `Vi rekommenderar att du reser inom någon av följande perioder, du behöver
                ${days-freeDays > 0 ? `ta ut ${days-freeDays}` : 'inte ta ut någon'} 
                ${days-freeDays <= 1 ? 'semesterdag' : 'semesterdagar' }.`
            )
        };
    }, [days, freeDays])

    //FUNKTIONER ------------------------------------------------------

    const startHandler = (value) => {
        setStartDate(value);
        setStartYear(value.substring(0, 4));
    }

    const endHandler = (value) => {
        setEndDate(value);
        setEndYear(value.substring(0, 4));
    }

    const getDateRange = async () => {
        try {
            const responseFirst = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${startYear}`);
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
            }

            if (twoYears) {
                setDateRange(filterFirst.concat(filterSecond));
            } else {
                setDateRange(filterFirst);
            }
        } catch (error) {
            console.log(error);
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

    return(
        <div>
            <div className='dateDropdown'>
            <TextField 
                type="number" 
                variant="filled" 
                label={'Antal dagar'} 
                onChange={(e) => {setActive(true); setDays(e.target.value)}}
                sx={{backgroundColor: 'white', color: 'rgb(41, 112, 49)'}}
            />
            { active, days ? 
            <div className='dateDropdownContent'>
            <Button
                variant="text" 
                aria-label="Se fler resultat" 
                size="medium"
                sx={{display: 'block', mx: 'auto', color: 'rgb(41, 112, 49)'}}
                onClick={() => {
                    document.querySelector('.narrowSearchForm').classList.toggle('active');
                }}
            >
                Smalna av sökningen ▼
            </Button>

            {result ? 
                <div className='narrowSearch'>
                    <form className='narrowSearchForm'>
                    <legend>Inom vilken period vill du vara ledig?</legend>
                        <input className='Date' type="date" id="startDate" onChange={(e) => startHandler(e.target.value)}/>
                        <input className='Date' type="date" id="endDate" onChange={(e) => endHandler(e.target.value)}/>
                    </form>
                </div>
            : ''}

            <Typography
                variant="body1"
                sx={{mb: 2, mt: 2}}>
                {userMessage}
            </Typography>

            
            <div className='dateBtnsDiv'>
            {result ? result.map((e, i) => { 
                const start = `${e[0].datum}`
                const end = `${e[e.length-1].datum}`;
                return (
                    <button 
                        key={`period-${i}`} 
                        className='dateBtn' 
                        onClick={(e) => {
                            setActive(false);
                            props.func(start, end);
                            const dateBtns = document.querySelectorAll('.dateBtn');
                            document.querySelector('.dateDropdownContent').classList.toggle('hidden');
                            dateBtns.forEach((e) => e.classList.remove('active'));
                            e.target.classList.toggle('active');
                        }}
                    >
                        {`${start} - ${end}`}
                    </button>
                )
            }) : '' }
        </div>
        
    </div> : ''}
    
</div>
</div>
);
}