# Express stuff
* Delete hack mongo test code

## jsonwebtoken
* Need to install it

`$ npm i jsonwebtoken`

### Why jsonwebtoken?
* Need it to sign our jwt token

## Postman to test POST register user route
* Headers
  - `Content-Type`: `application/json`
* Body (raw > JSON)

```json
{
  "username": "testing1",
  "password": "testing123",
  "role": "user"
}
```

* You will see the the login works in Postman
* Returns: `isAuthenticated: true`
  - And `user` object with username and role
* Also check cookie in Postman by clicking on `Cookies` link
https://i.imgur.com/67U4tWG.png
* You will see that that request gave us a cookie `access_token`
* [here is cookie in Postman](https://i.imgur.com/4yRf4Mm.png)
  - Click on `access_token` and you will see a cookie like this:

```
access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOb29iQ29kZXIiLCJzdWIiOiI1ZjRkNWIxNjFiZTQyNTIwNDNiZTdhM2UiLCJpYXQiOjE1OTg5MDY4MzQsImV4cCI6MTU5ODkxMDQzNH0.95o91iJ3rPr_ep2i_f2DfKcVcSYme3WdDmPCz8G6gFg; Path=/; Domain=localhost; HttpOnly;
```

* Copy the jwt and paste into jwt.io
* You will see the issuer and the user id (if you check your mongoDB you will see that user id is same as the user in your Database)
* Why does it complain with "Invalid Signature"?
  - You just need to replace the `your-256-bit-secret` with your secret

1. Send (works and creates user - returns to client msgBody and msgError (false))
2. Send again and get error because username already exists

## Test Login Route
### httpOnly
* Will make it so that on the client side that you can not touch this cookie using JavaScript and that is to prevent against Cross Site Scripting (XSS) attacks

### sameSite
* Will protect against a different attack Cross Site Request Forgery (CSRF) attacks
* **note** httpOnly and sameSite are very important when it comes to security to make sure that your JWT token doesn't get stolen

## Postman
```json
{
    "username": "testing1",
    "password": "testing123"
}
```

## Logout Postman
* Check to see if there is a cookie first
* Then hit the get route and see the cookie is removed
* If you try to logout again you will get `Unauthorized`
  - If you make a request with the jwt strategy and you fail to be authenticated it will automatically send a 401 unauthorized status

## Todo
* You have to be logged in to create a Todo

### Postman
* Content-Type

```json
{
    "name": "sample todo"
}
```

* Make sure a cookie is there (login in not)

## Get all todos

## Troubleshooting
* Misspelled `app.use(express.json());` so did not have access to req.body, once fixed all was well with the universe again

