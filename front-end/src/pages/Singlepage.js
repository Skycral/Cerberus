import { CityFetch } from "../components/CityFetch/CityFetch";
import { EventFetch } from "../components/EventFetch/EventFetch";
import { Link } from "react-router-dom";


export function SinglePage(props) {
  console.log('hej', props.searchObj);
  return(
    <>
    <Link to="/">Tillbaka</Link>

    <CityFetch obj={props.searchObj}/>
    <EventFetch obj={props.searchObj}/>
    </>
  );
};