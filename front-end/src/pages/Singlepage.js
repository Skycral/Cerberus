import { EventFetch } from "../components/EventFetch/EventFetch";
import { Link } from "react-router-dom";

export function SinglePage() {

  return(
    <>
    <Link to='/'>Tillbaka till sökresultat</Link>
    <EventFetch />
    </>
  );
};