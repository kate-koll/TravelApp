const addLocation = require("express").Router();
const modelLocation = require("../../models/locations");

addLocation.post("/save-location", (req, res) => {
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

  //find if already exists
  modelLocation.findOne(
    { city: city, year: year, month: month },(err, docs) => {
      if (err) {
        return res.json({
          msg: "couldn't get locations",
          documents: [],
        });
      } else {
        //if empty result, let's build new location!
        if (!docs && continent && country && city && (visited === true || visited === false)) {
          const location = new modelLocation({
            continent: continent,
            country: country,
            city: city,
            name: name,
            visited: visited,
            blogPosts: blogPosts,
            keywords: keywords,
            year: year,
            month: month,
            bucketPriority: bucketPriority,
            notes: notes
          });
          //and add it to the database
          location.save((err, document) => {
            if (err) {
              return res.json({
                msg: "saving unsuccessfull",
              });
            } else {
              return res.json({
                msg: `saved successfully ${JSON.stringify(document)}`,
              });
            }
          });
        }
        //if not empty, don't proceed
        else {
          return res.json({
            msg: "already exists or missing one of continent, country, city, visited",
          });
        }
      }
    }
  );
});

module.exports = addLocation;
