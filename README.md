# Login and Register components
## Center page
`index.html`

```
// MORE CODE

 <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" class="container"></div>
// MORE CODE
```

# Register
* enter username, password and role
* after 2 seconds you will be taken to login screen
* Enter username and password and you will be redirected to login screen
* You will see that an access_token is created in a cookie (check the application in chrome dev tools to see it)
* The value of the access_token is a JWT
* Click `logout` and it will clear the cookie/jwt access_token
