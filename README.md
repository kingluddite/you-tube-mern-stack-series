# React
## Client proxy
* A nice convenient feature for development
* In package.json
  - It will proxy all unknown requests to our backend (and this is what will happen during development)
  - Why?
    + If I have a fetch to `/api/something` during development if I don't set up this proxy I'll have to preface every server route with `http://localhost:5000`
    `http://localhost:5000/api/something (this is what it would look like)
    + Setting up the proxy saves us having to always type that
    + This also avoids CORS issues (because we have two different domains)
      - CORS is a security feature
        * Why do you get the CORS error?
          - Because our backend is on port 5000 but our frontend is on port 3000 by default using the create react app
          - Because of this the browser thinks you are making two requests from two different domains and that's why you get that CORS error
            + By setting up this proxy issue you avoid setting up these two issues

## Testing - you need two command lines
1. One for Backend (Express)
2. One for Frontend (react)

* Start Express with `$ npm start` (be in the root folder)
* Start React with `$ npm start` (be in the client folder)
* **note** Or you could use concurrently module in root of app with script commands in package.json to run both servers with one command


## You will see `Placeholder` rendered in browser
* This is what you will see in the console

![our hooks and state is working](https://i.imgur.com/C0U3vb2.png)

* The user object is available in browser (just empty strings) for `role` and `username`
* `isAuthenticated` is set to `false` because we are not authenticated
* We get the 401 `Unauthorized` status error because passportjs always sends this if we are not authenticated
* We get warnings for stuff we are not using

### Don't forget to use React Dev tools
![react dev tools](https://i.imgur.com/58jikAe.png)

* This shows us our hooks and Context

## Troubleshooting
* If you get this error `fatal: in unpopulated submodule 'client'` it most likely means you never deleted the `.git` inside your create react app
* Go inside `client` and `rm -rf *.git` to delete the submodule (if you have a git inside a git this creates a submodule - for our case we will make life easy and delete the submodule)
