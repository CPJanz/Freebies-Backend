// Used to calculate distance between two points
const haversine = require("haversine-js");
const db = require("../models");
const MAX_DISTANCE = 5; //In miles

//Calculates the distance between the location and each item location in the array and returns a filtered list of items within a radius of the MAX_DISTANCE.
function filterItems(location, itemsInput) {
  return itemsInput.filter(
    item => haversine(location, item.location) <= MAX_DISTANCE
  );
}

module.exports = {
  findNearby: (req, res) => {
    db.Item.find({})
      .then(dbItems => res.json(filterItems(req.query, dbItems)))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Item.create(req.body)
      .then(dbItem => {
        return db.User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { givenItems: dbItem._id } },
          { new: true }
        );
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  repost: (req, res) => {
    db.Item.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { timeStamp: new Date() }, $set: { available: true } }
    )
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  },

  taken: (req, res) => {
    db.Item.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { available: false } }
    )
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  }
};
