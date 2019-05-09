// Used to calculate distance between two points
const haversine = require("haversine-js");
const db = require("../models");
const CLOSE = 100 / 5280; //In feet
const MAX_DISTANCE = 50; //In miles
const POST_DURATION = (1 / 24) * 24 * 60 * 60 * 1000; //In miliseconds

function isInTimeWindow(timeStamp) {
  return POST_DURATION - (new Date() - timeStamp) > 0;
}

function sortByTimeStamp(inputArr) {
  return inputArr.sort(
    (a, b) =>
      b.timeStamp[a.timeStamp.length - 1] - a.timeStamp[b.timeStamp.length - 1]
  );
}

function finalSorting(inputArr) {
  const result = [];
  // Store first element in a sub array (The start of the first batch)
  let batch = [inputArr[0]];
  // Loop through the array a looking at each element
  for (let i = 1; i < inputArr.length; i++) {
    // Check to see if it is within CLOSE feet
    if (haversine(inputArr[i].location, batch[0].location) < CLOSE) {
      // If so push to sub array
      batch.push(inputArr[i]);
    } else {
      // If not, sort sub array by timeStamp then push the spread subarray to result
      result.push(...sortByTimeStamp(batch));
      // Put current inputArr element to subArray (Resetting our state to a new batch)
      batch = [inputArr[i]];
    }
  }
  // Sort and push the last batch
  result.push(...sortByTimeStamp(batch));
  return result;
}

module.exports = {
  findNearby: (req, res) => {
    db.Item.find({ available: true })
      .then(resultArr => {
        const sortedResult = resultArr
          .filter(element => {
            return isInTimeWindow(
              element.timeStamp[element.timeStamp.length - 1]
            );
          })
          .filter(item => haversine(req.query, item.location) <= MAX_DISTANCE)
          .sort(
            (a, b) =>
              haversine(req.query, a.location) -
              haversine(req.query, b.location)
          );
        res.json(finalSorting(sortedResult));
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
            isInTimeWindow(element.timeStamp[element.timeStamp.length - 1]) >
              0 &&
            element.available
          ) {
            element._doc.timeLeft =
              POST_DURATION -
              (new Date() - element.timeStamp[element.timeStamp.length - 1]);
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
      { $set: { available: req.body.available } },
      { new: true } // return altered item
    )
      .then(dbItem => res.json(dbItem))
      .catch(err => res.status(422).json(err));
  }
};
