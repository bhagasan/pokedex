import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageTransition from "react-router-page-transition";

import MainPage from "./components/pages/MainPage";
import DetailPage from "./components/pages/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Route
          render={({ location }) => (
            <PageTransition>
              <Switch location={location}>
                <Route exact path="/" component={MainPage} />
                <Route path="/details/:id" component={DetailPage} />
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
