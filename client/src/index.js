import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// we get the global context of AuthContext
import AuthProvider from "./Context/AuthContext";

// and we wrap our component with the AuthProvider that we just created
// if you open AuthContext this is the function we just imported and the children it is expecting is our App component in this case and so we wrap it and this gives our app component the global state items we need
ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
