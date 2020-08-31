# MERN with PassportJS, React with hooks, JWT
# Technologies Used Within Series:
* MongoDB(Mongoose ORM) - Database
* Express - Web Framework
* React - Client Side UI
* NodeJS - Server
* PassportJS - Authentication Middleware
* JWT(JSON WEB TOKENS) - For Authorization

# Mongoose
## Install dependencies
`$ npm i bcryptjs`

## Summary
* We set up:
  - The database portion of our MERN Stack application
  - We use MongooseJS which is an ODM which allows us to work with MongoDB alot easier
    + [Difference between ORM and ODM?](https://medium.com/@julianam.tyler/what-is-the-difference-between-odm-and-orm-267bbb7778b0)
  - The `User` and `Todo` Mongoose Models
  - How we can go about `hashing` the password of the **user** before saving unto the database using `bcryptjs`
  - Test if code works manually (since we have no UI)


## Create test user in Database
`$ npm run dev`

## Note
* Blow up react git repo (just use one)

`$ cd client && rm -rf .git`
