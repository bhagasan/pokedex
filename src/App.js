import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./components/pages/MainPage";
import Splash from "./components/pages/SplashScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/homepage" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
