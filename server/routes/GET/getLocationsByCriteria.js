const getLocationsByCriteria = require("express").Router();
const modelLocation = require("../../models/locations");

getLocationsByCriteria.get("/get-locations-by/", (req, res) => {
  const { continent, country, visited, year } = req.body;

  modelLocation.find({ continent: continent, visited:visited }, (err, docs) => {
    if (err) {
      return res.json({
        msg: "couldn't get locations",
        documents: [],
      });
    } else {
      return res.json({
        msg: `${docs.length} locations successfully retrieved`,
        documents: docs,
      });
    }
  });
});

module.exports = getLocationsByCriteria;
