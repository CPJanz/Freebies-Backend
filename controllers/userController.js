const db = require("../models");

module.exports = {

    newUser: function(req, res) {
        db.User.create(req.body)
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    },
    signIn: function(req, res) {
        db.User.findById({ id: req.params.id })
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    },
    postedList: function(req, res) {
        db.User.findById({ id: req.params.id })
            .populate("item")
            .then(dbuser => res.json(dbuser))
            .catch(err => res.status(422).json(err));
    }

}