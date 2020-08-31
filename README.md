# Passport JS
`$ npm i passport passport-local`

## What is Local Strategy?
* It will used to authenticate against a Database using your username and password

## What is a JWT token?
* https://jwt.io/
* Header
* Payload (our data)
  - sub (usually tied to id of user)
  - name (you can make your own claims)
  - iat (when was this token created)
  - exp (another common property is how long do you want this token to last)
* Verify Signature
  - This is where the magic happens
   + The signature is made up of the header
     - the algo we told it to use
     - the signature is based on the header and the payload, if a hacker modify anthing within the JWT token it will invalidate it (that's what makes it secure)

### Is JWT encryption?
* No (we can see everything within that JWT)
* So never put sensative info in the payload
* Anyone who has access to JWT can read it

## Why are we using JWT tokens?
* For authorization
* Once the user is logged in each subsequent request is going to include the JWT token

### Install jwt for passport
`$ npm i passport-jwt`
