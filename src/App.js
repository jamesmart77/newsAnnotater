import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer";
import history from './utils/history';


const App = () =>
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;