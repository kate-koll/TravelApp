const editLocation = require("express").Router();
const modelLocation = require("../../models/locations");

editLocation.post("/edit-location/:id", (req, res) => {
  const {
    continent,
    country,
    city,
    name,
    visited,
    blogPosts,
    keywords,
    year,
    month,
    bucketPriority,
    notes
  } = req.body;

  modelLocation.findByIdAndUpdate(req.params.id, req.body, (err, docs)=>{
    if (err) {
      return res.json({
        msg: `error while finding and updating: ${err}`,
        documents: [],
      });
    }
    else {
      if (docs) {
        return res.json({
          msg: ` record updated`,
          data: docs
        })
      }
      else return res.json({
        msg: 'no record found'
      })
    }
  })
});

module.exports = editLocation;
