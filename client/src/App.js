// we need to bring in our hook since this is a functional component
// we bring in useContext hook so we can consume the state
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Todos from "./components/Todos";
import Admin from "./components/Admin";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      {/* why `exact` */}
      {/* react router uses partial pattern matching if I have another route that begins with `/` it will render out both routes */}
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
    </Router>
  );
}

export default App;
