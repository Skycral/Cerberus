import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Herosection from './components/Herosection/Herosection';
import { Route, Switch } from 'react-router-dom';
import { SinglePage } from './pages/Singlepage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Header />
            <Herosection />
          <Footer />
        </Route>
        <Route exact path='/page'>
          <Header />
            <SinglePage />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
