const db = require("../models");

module.exports = {
  //Takes in an e-mail, checks for an existing account on that e-mail, if none exists create the account and return that, otherwise return false.
  newUser: (req, res) => {
    db.User.find({ email: req.body.email })
      .then(dbuser => {
        //Does a user with this e-mail exist already?
        if (dbuser.length) {
          return false; //If so return false
        } else {
          return db.User.create({ email: req.body.email }); //if not create the user and return the user object.
        }
      })
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  },
  //Takes in an e-mail and returns the user if it exists or an empty array if it doesn't
  signIn: (req, res) => {
    db.User.find({ email: req.params.email })
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(422).json(err));
  }
};
