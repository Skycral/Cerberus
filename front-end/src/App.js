import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Herosection from './components/Herosection/Herosection';
import { Route, Switch } from 'react-router-dom';
import { useState } from "react";
import { SinglePage } from './pages/Singlepage'

function App() {

  const [searchObject, setSearchObject] = useState();
  
  const handleSearch = (obj) => {
    setSearchObject(obj);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
            <Herosection func={handleSearch}/>
          <Footer />
        </Route>
        <Route exact path='/page'>
          <Header />
            <SinglePage searchObj={searchObject}/>
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
