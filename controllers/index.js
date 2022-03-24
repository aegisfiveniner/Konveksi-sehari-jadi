"use strict"


const { Motive, User, Profile, City, Order } = require('../models/index');
const bcrypt = require("bcryptjs")

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
    if(error) {
      res.render("loginForm", {error})
    } else {
      res.render("loginForm")
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

  static getLogout (req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err)
      } else {
        res.redirect("/login")
      }
    })
  }
}

module.exports = Controller

