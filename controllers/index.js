"use strict"


const { Motive, User, Profile, City, Order } = require('../models/index');
const bcrypt = require("bcryptjs");
const ongkir = require('../helpers/ongkir');

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

  static regForm (req, res) {
    City.findAll()
    .then((cities) => {
      res.render("regForm", {cities})
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static regPost (req, res) {
    const {username, password, name, phone, address} = req.body
  
    const inputProfile = {name, phone, address}
    Profile.create(inputProfile, {
      returning: true,
    })
    .then((profile) => {
      // console.log(profile)
      const {id} = profile
      return User.create({username, password, ProfileId:id})
    })
    .then(() => {
      res.redirect("/login")
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
  }

  static loginForm (req, res) {
    const {error} = req.query
    if(!error) {
      res.render("loginForm")
    } else {
      res.render("loginForm", {error})
    }
  }

  static loginCheck (req, res) {
    const {username, password} = req.body

    User.findOne({where: {
      username
    }})
    .then((user) => {
      if(user) {
        const validPassword = bcrypt.compareSync(password, user.password)

        if (validPassword) {
          req.session.userId = user.id
          return Motive.findAll()
          
        } else {
          const error = "Password salah"
          return res.redirect(`/login?error=${error}`)
        }
      } else {
        const error = "Username tidak ditemukan"
          return res.redirect(`/login?error=${error}`)
      }
    })
    .then(motives => {
      // res.send(motives)
      res.render('home', { motives , Motive })
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
  }

  static saveOrder (req, res) {
    // console.log(req.body)
    // console.log(req.params)
    // console.log(req.session.userId)
    
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
      // console.log(ongkirs);
      let data = {
        size,
        model,
        MotiveId : +motiveId,
        ProfileId: profiles.id,
        CityId: ongkirs[1],
      }
      // console.log(data);
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
      // console.log(err);
      res.send(err)
    })
  }

  static getLogout (req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err)
      } else {
        const error = "Anda sudah keluar"
        res.redirect(`/login?error=${error}`)
      }

    })
  }
}

module.exports = Controller

