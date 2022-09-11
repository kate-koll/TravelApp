const deleteLocation = require("express").Router();
const modelLocation = require("../../models/locations");

deleteLocation.post("/delete-location/:id", (req, res) => {
  // const {
  //   continent,
  //   country,
  //   city,
  //   name,
  //   visited,
  //   blogPosts,
  //   keywords,
  //   year,
  //   month,
  //   bucketPriority,
  // } = req.body;

  modelLocation.findByIdAndRemove(req.params.id, (err, doc)=>{
    if(err) {
      return res.json({
        msg: "couldn't delete"
      })
    }
    else {
      if (doc) {
        return res.json({
          msg: ` record deleted`,
          data: doc
        })
      }
      else return res.json({
        msg: 'no record found'
      })
    }
  })

});

module.exports = deleteLocation;
