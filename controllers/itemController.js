// Used to calculate distance between two points
const haversine = require("haversine-js");
const db = require("../models");
const MAX_DISTANCE = 50; //In miles
const POST_DURATION = 24 * 60 * 60 * 100; //In miliseconds

//Calculates the distance between the location and each item location in the array and returns a filtered list of items within a radius of the MAX_DISTANCE.
function filterItems(location, itemsInput) {
  return itemsInput.filter(
    item => haversine(location, item.location) <= MAX_DISTANCE
  );
}

module.exports = {
  findNearby: (req, res) => {
    db.Item.find({ available: true })
      .then(resultArr => {
        res.json(
          resultArr
            .filter(item => haversine(req.query, item.location) <= MAX_DISTANCE)
            .sort(
              (a, b) =>
                haversine(req.query, a.location) -
                haversine(req.query, b.location)
            )
        );
      })
      .catch(err => res.status(422).json(err));
  },

  findGiven: (req, res) => {
    db.Item.find({ giverId: req.params.id }).then(resultArr => {
      const returnObject = { active: [], inactive: [] };
      resultArr
        .sort(
          (a, b) =>
            b.timeStamp[a.timeStamp.length - 1] -
            a.timeStamp[b.timeStamp.length - 1]
        )
        .forEach(element => {
          if (
            POST_DURATION -
              (new Date() - element.timeStamp[element.timeStamp.length - 1]) >
              0 &&
            element.available
          ) {
            returnObject.active.push(element);
          } else {
            returnObject.inactive.push(element);
          }
        });
      res.json(returnObject);
    });
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

  updateAvailable: (req, res) => {
    db.Item.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { available: req.body.available } }
    )
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  }
};
