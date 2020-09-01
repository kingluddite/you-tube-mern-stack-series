# React
## Client proxy
* In package.json
  - It will proxy all unknown requests to our backend (and this is what will happen during development)
  - Why?
    + If I have a fetch to `/api/something` during development if I don't set up this proxy I'll have to preface every server route with `http://localhost:5000`
    `http://localhost:5000/api/something (this is what it would look like)
    + setting up the proxy saves us having to always type that
    + This also avoids CORS issues (because we have two different domains)
