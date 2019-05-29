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
  },
  // Removes a user's account
  removeAcct: (req, res) => {
    // Delete user account
    db.User.deleteMany({ _id: req.params.id })
      .then(() => {
        // Find all items with the giverId of the deleted account's id.
        db.Item.find({ giverId: req.params.id }).then(dbItems => {
          const idArray = [];
          // Construct an array of ids of items to be deleted.
          dbItems.forEach(item => idArray.push(item._id));
          // Delete items listed in the array.
          db.Item.deleteMany({ _id: { $in: idArray } });
        });
      })
      .then(result => {
        return res.json(result);
      })
      .catch(err => res.status(422).json(err));
  }
};
