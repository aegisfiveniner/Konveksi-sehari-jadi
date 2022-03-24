const express = require('express');
const Controller = require('./controllers');
const app = express()
const port = 3000
const session = require("express-session")

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(session({
  secret: 'rahasia bah',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))



app.get('/', Controller.home)
app.get('/order/:motiveId', Controller.order)
app.post('/order/:motiveId', Controller.saveOrder)
//get register

app.get("/register", Controller.regForm)
app.post("/register", Controller.regPost)

//post register

app.get("/login", Controller.loginForm)
app.post("/login", Controller.loginCheck)

app.use((req, res, next) => {
  if(!req.session.userId) {
    const error = "Login dulu"
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})


// app.get('/order/:id', Controller.order)

app.get("/logout", Controller.getLogout)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

