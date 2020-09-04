// we need to bring in our hook since this is a functional component
// we bring in useContext hook so we can consume the state
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Navbar />
      {/* why `exact` */}
      {/* react router uses partial pattern matching if I have another route that begins with `/` it will render out both routes */}
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
