// this is where we create our contextAPI
// we are using react hooks so we import them (or you could also use classes)
// useState is how we get the state in a functional component
// we are using createContext so we import that
import React, { createContext, useState, useEffect } from "react";
// we import the file with our fetch API auth endpoints
import AuthService from "../Services/AuthService";

// this is how we create our context
// we also export it so we can also use it outside of this file
// this will give us this AuthContext object (and this will give us a Provider and a Consumer)
//   Anything wrapped inside the Provider will have access to the global state (but you also have to consume it and we also get that from this Context so we can consume the global state)
export const AuthContext = createContext();

// We have our function
// but we don't just want props so we deconstruct what we really want which is the children
//  - children in this case are the components that we want to wrap our Provider around
export default ({ children }) => {
  // we need to create the states we want to hold onto
  // useState is how we maintain the state within a functional component
  // here I set the state of user with a value of null by default (the setter `setUser` is how we can update this user)
  // use is the user that is logged in
  const [user, setUser] = useState(null);
  // we set a boolean value to know whether or not we are authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // we will make a request to the server and we want to check if our app is loaded
  // once we get the data we will set isLoaded to true
  const [isLoaded, setIsLoaded] = useState(false);

  // we pass useEffect a cb
  // the second parameter we pass useEffect is an empty array [] (we only want this to execute once - and we'll use this as a componentDidMount life cycle (that's it's equivalent in class based components))
  //  - useEffect used this way is way to use componentDidMount lifecyle method
  useEffect(() => {
    // this is like the react class componentDidMount LCM
    // we are using the AuthService we created and isAuthenticated method
    // we use then because it is a promise and we should get back the data
    AuthService.isAuthenticated().then((data) => {
      // we set the user to the user from our data
      setUser(data.user);
      // and we set isAuthenticated from our data
      setIsAuthenticated(data.isAuthenticated);
      // we now have everything we need so we can change our boolean value to true to let our app know the data has loaded
      setIsLoaded(true);
    });
  }, []);

  // now we return what component we want to render
  return (
    <div>
      {/* if isLoaded is not true we will render out loading */}
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        // if isLoaded is true we can render out our app
        // we wrap our AuthContext.Provide around these "children" components
        // and that is how we provide the global state to these children here
        // We need to pass our AuthContext.Provider a value prop and this value prop will provide what we want to make available as a global state
        // we want our user to be a global state
        // we want isAuthenticated to be a global state
        // we also pass the setter methods in case the user down the line needs to update the user or isAuthenticated
        // now we need to use this function that we created (we import this Context in index.js)
        // now our whole application has access to the user his authenticated states that we want
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
