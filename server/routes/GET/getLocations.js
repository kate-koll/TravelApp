const getLocations = require("express").Router();
const modelLocation = require("../../models/locations")

 getLocations.get("/get-locations", (req, res) => {
    
    modelLocation.find({}, (err, docs) => {
    if (err) {
      return res.json({
        msg: "couldn't get locations",
        documents: [],
      })
    }
    else {
      return res.json({
        msg: `${docs.length} locations successfully retrieved`,
        documents: docs        
      })
    }
  })
});



module.exports = getLocations;