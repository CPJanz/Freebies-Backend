const db = require("../models");

module.exports = {

    allUsers: (req, res) => {
        db.User.find()
            .then(dbusers => res.json(dbusers))
            .catch(err => res.status(422).json(err));
    },
    newUser: (req, res) => {
        db.User.create({
            email: req.body.email
            })
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    },
    signIn: (req, res) => {
        db.User.findById({ _id: req.params.id })
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    },
    postedList: (req, res) => {
        db.User.findById({ _id: req.params.id })
            .populate("givenItems")
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    }

}