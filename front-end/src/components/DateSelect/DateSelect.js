import { useEffect, useState } from 'react';
import { FilterSelect } from '../FilterSelect/FilterSelect';

export function DateSelect() {

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startYear, setStartYear] = useState();
    const [endYear, setEndYear] = useState();

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

        const arr = []

        const newArr = parsing.dagar.filter((e) => {
            if (e.datum === startDate && e.datum <= endDate) {
                arr.push(e.veckodag);
            }
        })
        console.log(newArr);
    }

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

    return(
        <div>
            <form>
                <input type="date" id="startDate" onChange={(e) => startHandler(e.target.value)}/>
                <input type="date" id="endDate" onChange={(e) => endHandler(e.target.value)}/>
            </form>

        </div>
    );
}