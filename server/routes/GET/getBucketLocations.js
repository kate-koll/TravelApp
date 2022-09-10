const getBucketLocations = require("express").Router();
const modelLocation = require("../../models/locations")

getBucketLocations.get("/get-bucket", (req, res) => {
    
    modelLocation.find({visited: false}, (err, docs) => {
    if (err) {
      return res.json({
        msg: "couldn't get locations",
        documents: [],
      })
    }
    else {
      return res.json({
        msg: `${docs.length} bucket locations successfully retrieved`,
        documents: docs        
      })
    }
  })
});



module.exports = getBucketLocations;