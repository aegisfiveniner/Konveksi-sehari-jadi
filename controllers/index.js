"use strict"

const { Motive, User, Profile, City, Order } = require('../models/index');
const ongkir = require('../ongkir');

class Controller {
  static home(req, res) {
    Motive.findAll()
    .then(motives => {
      res.render('home', { motives })
    })
    .catch(err => {
      res.send(err)
    })
  } 

  static order (req, res) {
    const motiveId = req.params.motiveId
    Motive.findByPk(motiveId)
    .then(motive => {
      res.render('formPesan', { motive });
    }).catch(err => {
      res.send(err)
    })
  }

  static saveOrder (req, res) {
    console.log(req.body)
    console.log(req.params)
    const { size, model } = req.body
    const motiveId = req.params.motiveId
    let motives = null
    let profiles = null
    let ongkirs = null
    Motive.findByPk(motiveId)
    .then(motive => {
      motives = motive
      return Profile.findByPk(2)
    })
    .then(user => {
      profiles = user
      return City.findAll()
    })
    .then(cities => {
      ongkirs = ongkir(cities, profiles.address)
      console.log(ongkirs);
      let data = {
        size,
        model,
        MotiveId : +motiveId,
        ProfileId: profiles.id,
        CityId: ongkirs[1],
      }
      console.log(data);
      // res.send({motives, profiles, cities})
      return Order.create(data)
    })
    .then(() => {
    res.send({motives, profiles})
    //   return Order.findAll({
    //     include : ['Motives', 'Profiles']
    //   })
    // }).then(orderList => {
    //   res.send(orderList)
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }
}

module.exports = Controller