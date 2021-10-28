import { CityFetch } from "../components/CityFetch/CityFetch";
import { ActivityFetch } from "../components/ActivityFetch/ActivityFetch";
import { EventFetch } from "../components/EventFetch/EventFetch";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { useEffect } from "react";


export function SinglePage(props) {

  let searchObject = props.searchObj;

  if (searchObject) {
    window.localStorage.setItem('search', JSON.stringify(props.searchObj));
  } else {
    searchObject = JSON.parse(window.localStorage.getItem('search'));
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchObject])

  return(
    <div className='singlePageContainer'>
      <img className='background' src={`images/${searchObject.city}.jpg`} alt=''/>
      <Link to="/"><ArrowBackIcon Filled sx={{fontSize: '4rem', color: 'rgb(41, 112, 49)'}} /></Link>
      <CityFetch obj={searchObject}/>
      <ActivityFetch obj={searchObject}/>
      <EventFetch obj={searchObject}/>
    </div>
  );
};