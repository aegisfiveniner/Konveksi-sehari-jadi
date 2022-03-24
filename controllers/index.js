"use strict"

const { Motive, User, Profile, City, Order } = require('../models/index');

class Controller {
  static home(req, res) {
    Motive.findAll()
    .then(motives => {
      // res.send(motives)
      res.render('home', { motives , Motive })
    })
    .catch(err => {
      res.send(err)
    })
  } 

  static order (req, res) {

  }
}

module.exports = Controller