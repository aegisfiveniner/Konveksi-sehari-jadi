const express = require('express');
const Controller = require('./controllers');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")

app.get('/', Controller.home)
app.get('/order/:motiveId', Controller.order)
app.post('/order/:motiveId', Controller.saveOrder)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})