const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./database/connect");
const cors = require("cors");

const getLocations = require("./routes/GET/getLocations");
const getLocationById = require("./routes/GET/getLocationById");
const getVisitedLocations = require("./routes/GET/getVisitedLocations");
const getBucketLocations = require("./routes/GET/getBucketLocations");

const addLocation = require("./routes/POST/addLocation");
const deleteLocation = require("./routes/POST/deleteLocation");
const editLocation = require("./routes/POST/editLocation");


db.connect();

/**
 * MIDDLEWARE
 * allow json, text, cors
 */
 app.use(express.json({extended: false}));
 app.use(express.text({extended: false}));
 app.use(cors());
 app.set('json spaces', 3);

/**
 * GET ROUTES
 */
app.use("/locations", cors(), getLocations); // http://localhost:5000/locations/get-locations
app.use("/locations", cors(), getLocationById); // http://localhost:5000/locations/get-locations/:id
app.use("/locations", cors(), getVisitedLocations); // http://localhost:5000/locations/get-visited
app.use("/locations", cors(), getBucketLocations); // http://localhost:5000/locations/get-bucket

app.get('/', (req,res)=>{
    res.send("Main page")
});

/**
 * POST ROUTES
 */
 app.use("/locations", cors(), addLocation);// http://localhost:5000/locations/save-location
 app.use("/locations", cors(), deleteLocation); //http://localhost:5000/locations/delete-location/:id
 app.use("/locations", cors(), editLocation); //http://localhost:5000/locations/edit-location/:id

app.listen(PORT, (err)=>{
    console.log(`Server runs on ${PORT}`)
});
