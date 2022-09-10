const getVisitedLocations = require("express").Router();
const modelLocation = require("../../models/locations")

getVisitedLocations.get("/get-visited", (req, res) => {
    
    modelLocation.find({visited: true}, (err, docs) => {
    if (err) {
      return res.json({
        msg: "couldn't get locations",
        documents: [],
      })
    }
    else {
      return res.json({
        msg: `${docs.length} visited locations successfully retrieved`,
        documents: docs        
      })
    }
  })
});



module.exports = getVisitedLocations;