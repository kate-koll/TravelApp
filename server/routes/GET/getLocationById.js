const getLocationById = require("express").Router();
const modelLocation = require("../../models/locations")

getLocationById.get("/get-location/:id", (req, res) => {
    modelLocation.findOne({_id: req.params.id}, (err, docs) => {
    if (err) {
      return res.json({
        msg: "couldn't get location",
        documents: [],
      })
    }
    else {
      return res.json({
        msg: `location successfully retrieved`,
        documents: docs        
      })
    }
  })
});


module.exports = getLocationById;