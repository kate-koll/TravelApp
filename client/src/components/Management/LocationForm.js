import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const LocationForm = (props) => {
  const { view } = props; //new or edit

  let locationId = useLocation().state.locationId
  let origin = useLocation().state.view; //Visited or Bucket
  let boolVisited = false;
  if (origin === "Visited") boolVisited = true;

  const [continent, setContinent] = useState("Europe");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [visited, setVisited] = useState(boolVisited);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("");
  const [prio, setPrio] = useState(0);
  const [notes, setNotes] = useState("")

  const [locationObject, setLocationObject] = useState({});
  const [prepared, setPrepared] = useState(false);

  const [locationToEdit, setLocationToEdit] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  let header = "";
  if (view === "edit")  header = "Edit";
  else header = "Add New";
  useEffect(() => {
  if (view === "edit") {
    setIsLoaded(false);
    //get location by ID
    axios.get( `http://localhost:5000/locations/get-locations/${locationId}`)
    //.then((res) => res.json())
    .then(
      (res) => {
        
        setLocationToEdit(res.data.documents);
        setContinent(res.data.documents.continent);
        setCountry(res.data.documents.country);
        setCity(res.data.documents.city);
        setName(res.data.documents.name);
        setMonth(res.data.documents.month);
        setYear(res.data.documents.year);
        setPrio(res.data.documents.bucketPriority);
        setNotes(res.data.documents.notes?res.data.documents.notes:"")
        console.log(res.data.documents.country)
        
      },
      (er) => {
        setError(er);
        console.log(error)
      },
      () => {
        setIsLoaded(true);
      }
    )
      
  }  
},[]);
  const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleVisitedChange = (event) => {
    setVisited((current) => !current);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handlePrio = (event) => {
    setPrio(event.target.value);
  };
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  async function handleSubmit(event) {
    if (visited) {
      setLocationObject({
        continent: continent,
        country: country,
        city: city,
        name: name,
        visited: true,
        year: year,
        month: month,
        bucketPriority: -1,
        notes: notes
      });
    } else {
      setLocationObject({
        continent: continent,
        country: country,
        city: city,
        name: name,
        visited: false,
        bucketPriority: prio,
        notes: notes
      });
    }
    event.preventDefault();
    setPrepared(true);

    window.location = `http://localhost:3000/management/`;
  }

  useEffect(() => {
    const saveLocation = () => {
        console.log(locationObject);
        //saving new one
        if(view==="new"){
      axios
        .post(`http://localhost:5000/locations/save-location`, locationObject)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        }
        //editing existing one
        else if (view==='edit') {
            axios.post(`http://localhost:5000/locations/edit-location/${locationId}`, locationObject)
            .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }


    };
    if (prepared) saveLocation();
    setPrepared(false);
  }, [prepared]);

  const handleReset = () => {
    alert("reset");
  };

  return (
    <>
      {/* action="/management" */}
      <form data-rel="back" onSubmit={handleSubmit} onReset={handleReset}>
        <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
          <Typography sx={{ marginTop: 5, marginBottom: 0 }} variant="h5">
            {header} Location
          </Typography>
          {/* Visited */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    name="visited" //input atribute name required for submit and post
                    checked={visited}
                    onChange={handleVisitedChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Visited"
              />
            </FormControl>
          </div>
          {/* Continent */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <InputLabel>Continent</InputLabel>
              <Select
                name="continent" //input atribute name required for submit and post
                value={continent}
                label="Continent"
                onChange={handleContinentChange}
                required
              >
                <MenuItem value={"Europe"}>Europe</MenuItem>
                <MenuItem value={"Asia"}>Asia</MenuItem>
                <MenuItem value={"Africa"}>Africa</MenuItem>
                <MenuItem value={"America"}>America</MenuItem>
                <MenuItem value={"Australia/Oceania"}>
                  Australia/Oceania
                </MenuItem>
                <MenuItem value={"Antarctica"}>Antarctica</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Country */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <TextField
                name="country" //input atribute name required for submit and post
                required
                label="Country"
                value={country}
                onChange={handleCountryChange}
              />
            </FormControl>
          </div>

          {/* City */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <TextField
                name="city" //input atribute name required for submit and post
                required
                label="City"
                value={city}
                onChange={handleCityChange}
              />
            </FormControl>
          </div>

          {/* Name */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <TextField
                name="name" //input atribute name required for submit and post
                value={name}
                required
                label="Name of the Travel"
                onChange={handleNameChange}
              />
            </FormControl>
          </div>

          {/* Month */}
          {visited && (
            <div>
              <FormControl sx={{ margin: 1, width: "30%" }}>
                <InputLabel>Month</InputLabel>
                <Select
                  name="month" //input atribute name required for submit and post
                  required
                  value={month}
                  label="Month"
                  onChange={handleMonthChange}
                >
                  <MenuItem value={"January"}>January</MenuItem>
                  <MenuItem value={"February"}>February</MenuItem>
                  <MenuItem value={"March"}>March</MenuItem>
                  <MenuItem value={"April"}>April</MenuItem>
                  <MenuItem value={"May"}>May</MenuItem>
                  <MenuItem value={"June"}>June</MenuItem>
                  <MenuItem value={"July"}>July</MenuItem>
                  <MenuItem value={"August"}>August</MenuItem>
                  <MenuItem value={"September"}>September</MenuItem>
                  <MenuItem value={"October"}>October</MenuItem>
                  <MenuItem value={"November"}>November</MenuItem>
                  <MenuItem value={"December"}>December</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          {/* Year */}
          {visited && (
            <div>
              <FormControl sx={{ margin: 1, width: "30%" }}>
                <TextField
                  name="year" //input atribute name required for submit and post
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]{4}" }}
                  required
                  label="Year"
                  value={year}
                  onChange={handleYearChange}
                />
              </FormControl>
            </div>
          )}
          {/* Notes */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <TextField
                name="notes" //input atribute name required for submit and post
                value={notes}
                label="Notes"
                onChange={handleNotesChange}
              />
            </FormControl>
          </div>
          {/* Prio */}
          <div>
            {!visited && (
              <FormControl sx={{ margin: 1, width: "30%" }}>
                <TextField
                  name="prio" //input atribute name required for submit and post
                  helperText="0 not prioritized; -1 visited"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  required
                  label="Prio"
                  value={prio}
                  onChange={handlePrio}
                />
              </FormControl>
            )}
          </div>

        </Box>
        <Button variant="contained" color="error" type="reset">
          Reset
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LocationForm;
