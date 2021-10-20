import { CityFetch } from "../components/CityFetch/CityFetch";
import { EventFetch } from "../components/EventFetch/EventFetch";
import { Link } from "react-router-dom";


export function SinglePage() {

  return(
    <>
    <Link to="/">Tillbaka</Link>
    <CityFetch />
    <EventFetch />
    </>
  );
};