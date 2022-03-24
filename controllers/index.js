const { Motive } = require("../models")

class Controller {
    static home(req, res) {
        Motive.findAll()
        .then((result) => {
            res.render("home", {result})
        })
        .catch((err) => {
            res.send(err)
        })
    } 
}

module.exports = Controller

