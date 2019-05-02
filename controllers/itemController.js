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
    console.log(req.body);
    db.Item.find({})
      .then(dbItems => res.json(filterItems(req.body, dbItems)))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Item.create(req.body)
      .then(dbNew => {
        return db.User.findOneAndUpdate({ _id: req.params.id }, { $push: { givenItems: dbNew._id }}, { new: true })
      })
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Item.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  }
};
