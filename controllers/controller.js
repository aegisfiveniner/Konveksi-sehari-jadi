"use strict"

const { Motive, User, Profile, City, Order } = require('../models/index');

class Controller {
  static home(req, res) {
    Motive.findAll()
    .then(motives => {
      res.send(motives)
    })
    .catch(err => {
      res.send(err)
    })
  } 
}

module.exports = Controller