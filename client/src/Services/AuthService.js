// we create this Service file because we don't want to store everything within our component (separate concerns)
export default {
  // when we login in a user
  login: (user) => {
    console.log(user);
    return (
      // the endpoint we want to hit `/user/login`
      // because we use a proxy we don't have to type `http://localhost:5000/users/login`
      fetch("/users/login", {
        method: "post",
        // we are sending in the request body and so we need to send as JSON and we pass the user in
        body: JSON.stringify(user),
        // we need to set up our headers to let our backend know what we are sending
        headers: {
          "Content-Type": "application/json",
        },
      })
        // we use `.then` because this is a promise
        // this will return a response which we are going to return
        .then((res) => {
          if (res.status !== 401) {
            // passport automatically sends a 401 status if we are not authenticated (if we use passport middleware - so we'll write our response client side)
            // if we get a 401 error status code that means we already wrote our custom response here
            return res.json().then((data) => data);
          } else {
            // passport is sending a 401 status code so we'll build out the reponse
            // user is not authenticated
            // isAuthenticated is false because we get a 401 code
            // and we set the username and role to empty strings
            // note - we will use the contextAPI when we call this function
            // note - the contextAPI is like a global state for your React app
            return { isAuthenticated: false, user: { username: "", role: "" } };
          }
        })
    );
  },
  // when we register a user we pass in the user (the user they want to create)
  // this should contain username, password and role
  register: (user) => {
    console.log(user);
    // the endpoint is `http://localhost:5000/users/register
    return fetch("/users/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  // logging out user
  // no parameters because we don't need any
  logout: () => {
    // endpoing `http://localhost:5000/users/logout`
    return fetch("/users/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    // function to persist authentication
    // once we login we set a state within our react component to let our app know that our user has been authenticated
    // but the problem with that is that once you close our react app that state is gone
    // this function will sync our backend and frontend together so that it persists even though our react app is closed, so that the next time if we revisit the website, if we authenticated, we'll stay logged in
    // endpoint `http://localhost:5000/users/authenticated`
    return fetch("/users/authenticated").then((res) => {
      // 401 means it is a response that we wrote ourselves
      if (res.status !== 401) {
        // passport automatically sends a 401 status if we are not authenticated (if we use passport middleware - so we'll write our response client side)
        // if we get a 401 error status code that means we already wrote our custom response here
        return res.json().then((data) => data);
      } else {
        // passport is sending a 401 status code so we'll build out the reponse
        // user is not authenticated
        // isAuthenticated is false because we get a 401 code
        // and we set the username and role to empty strings
        // note - we will use the contextAPI when we call this function
        // note - the contextAPI is like a global state for your React app
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
};
