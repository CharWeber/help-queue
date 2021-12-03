import React from "react";
import Header from './Header';
import Signin from './Signin';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketControl from "./TicketControl";


function App(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/'>
          <TicketControl />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
