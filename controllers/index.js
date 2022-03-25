"use strict"


const { Motive, User, Profile, City, Order } = require('../models/index');
const bcrypt = require("bcryptjs");
const ongkir = require('../helpers/ongkir');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jomatespairproject@gmail.com',
    pass: '!@#123qwe'
  }
})

class Controller {
  static home(req, res) {
    let IDuser = null
    let role = null
    const sort = req.query.sort

    if (req.session.userId) {
      IDuser = req.session.userId[0]
      role = req.session.userId[1]
    }

    let option = { }

    if (sort) {
      option = {
        ...option,
        order : [['price', 'desc']]
      }
    }
    console.log(IDuser);
      Motive.findAll(option)
    .then(motives => {
      res.render('home', { motives , IDuser, role})
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
      const {id} = profile
      return User.create({username, password, ProfileId:id})
    })
    .then(() => {
      let mailOptions = {
        from: 'jomatespairproject@gmail.com',
        to: 'jomatespairproject@gmail.com',
        subject: 'Sudah terdaftar',
        text: 'Udah kedaftar'
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if(error) {
          console.log(error);
        } else {
          console.log('email sent: ' + info.response);
        }
      })
      res.redirect("/login")
    })
    .catch((err) => {
      let errors = []
      if (err.name === 'SequelizeValidationError') {
        err.errors.forEach(x => {
          errors.push(x.message)
        });
        err = errors
      }
      res.send(err)
    })
  }

  static loginForm (req, res) {
    const {error} = req.query
      res.render("loginForm", {error})
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
          req.session.userId = [user.id, user.role]
          return res.redirect('/')
        } else {
          const error = "Password salah"
          return res.redirect(`/login?error=${error}`)
        }
      } else {
        const error = "Username tidak ditemukan"
          return res.redirect(`/login?error=${error}`)
      }
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
    
  }

  static saveOrder (req, res) {
    const IDuser = req.session.userId[0]
    console.log(IDuser);
    const { size, model } = req.body
    const motiveId = req.params.motiveId
    let profiles = null
    let ongkirs = null
    
    Profile.findByPk(IDuser)
    .then(user => {
      profiles = user
      return City.findAll()
    })
    .then(cities => {
      ongkirs = ongkir(cities, profiles.address)

      let data = {
        size,
        model,
        MotiveId : +motiveId,
        ProfileId: profiles.id,
        CityId: ongkirs[1],
      }

      return Order.create(data)
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }

  static cart (req, res) {
    console.log(req.params)
    const IDuser = req.session.userId[0]
    let profiles = null
    let ongkirs = null
    Profile.findByPk(IDuser)
    .then(user => {
      profiles = user
      return City.findAll()
    })
    .then(cities => {
      ongkirs = ongkir(cities, profiles.address)
    
      return Order.findAll({
        include : Motive,
        where : {
          ProfileId : IDuser
        }
      })
    }).then(orderList => {

      res.render('keranjang', { orderList, ongkirs, Order})
    })
    .catch(err => {
      console.log(err);
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

  static delete (req, res) {
    const IDuser = req.session.userId[0]
    Order.destroy({
      where : {
        ProfileId : IDuser
      }
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static edit (req, res) {
    console.log(req.params);
    const id = req.params.motiveId
    Motive.findByPk(id)
    .then(motive => {
      res.render('edit', { motive })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static saveEdit (req, res) {
    console.log(req.body);
    console.log(req.params);
    const id = req.params.motiveId
    const { pictureUrl, price } = req.body
    const data = { pictureUrl, price }
    console.log(id);
    console.log(data);
    Motive.update(data, {
      where : {
        id : id
      }
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller

