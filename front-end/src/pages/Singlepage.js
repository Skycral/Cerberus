import { CityFetch } from "../components/CityFetch/CityFetch";
import { ActivityFetch } from "../components/ActivityFetch/ActivityFetch";
import { EventFetch } from "../components/EventFetch/EventFetch";
import { Link } from "react-router-dom";


export function SinglePage(props) {
  //Lägga till localStorage
  let searchObject = props.searchObj;

  if (searchObject) {
    window.localStorage.setItem('search', JSON.stringify(props.searchObj));
  } else {
    searchObject = JSON.parse(window.localStorage.getItem('search'));
  }

  return(
    <>
    <Link to="/">Tillbaka</Link>
    <CityFetch obj={searchObject}/>
    <ActivityFetch obj={searchObject}/>
    <EventFetch obj={searchObject}/>
    </>
  );
};