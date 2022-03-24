const express = require('express');
const Controller = require('./controllers');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")



app.get('/', Controller.home)
app.get('/order/:motiveId', Controller.order)
app.post('/order/:motiveId', Controller.saveOrder)
//get register

app.get("/register", Controller.regForm)
app.post("/register", Controller.regPost)
app.get("/login", Controller.loginForm)
app.post("/login", Controller.loginCheck)



//post register

// app.get('/order/:id', Controller.order)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

