import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import CircularProgress from "@mui/material/CircularProgress";
import FormLabel from "@mui/material/FormLabel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';

import ChipArray from "./ChipArray";

const LocationForm = (props) => {
  const { view } = props; //new or edit

  let locationId = useLocation().state.locationId;
  let origin = useLocation().state.view; //Visited || Bucket
  const navigate = useNavigate();

  let boolVisited = false;
  if (origin === "Visited") boolVisited = true;

  const [continent, setContinent] = useState("Europe");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [visited, setVisited] = useState(boolVisited);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState("");
  const [prio, setPrio] = useState("");
  const [notes, setNotes] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordsInput, setKeywordsInput] = useState();

  const [locationObject, setLocationObject] = useState({});
  const [prepared, setPrepared] = useState(false);

  const [locationToEdit, setLocationToEdit] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  let header = "";
  if (view === "edit") header = "Edit";
  else header = "Add New";
  useEffect(() => {
    if (view === "edit") {
      setIsLoaded(false);
      //get location by ID
      axios
        .get(`http://localhost:5000/locations/get-location/${locationId}`)
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
            setNotes(res.data.documents.notes ? res.data.documents.notes : "");
            setIsLoaded(true);
            setKeywords(res.data.documents.keywords);
          },
          (er) => {
            setError(er);
            console.log(error);
          }
        );
    }
  }, []);
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
  const handleKeywordAdd = (event) => {
    let input = document.getElementById('keywords')
    setKeywords((oldArray) => [...oldArray, input.value.toLowerCase()]);
    input.value=""
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
        bucketPriority: "",
        notes: notes,
        keywords: keywords,
      });
    } else {
      setLocationObject({
        continent: continent,
        country: country,
        city: city,
        name: name,
        visited: false,
        bucketPriority: prio,
        notes: notes,
        keywords: keywords,
      });
    }
    event.preventDefault();
    setPrepared(true);
  }

  useEffect(() => {
    setIsLoaded(false);
    const saveLocation = () => {
      //saving new one
      if (view === "new") {
        axios
          .post(`http://localhost:5000/locations/save-location`, locationObject)

          .then(function (response) {
            if (response.data.res === 0) {
              alert(response.data.msg);
            } else {
              alert("Saved succesfully");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
      }
      //editing existing one
      else if (view === "edit") {
        axios
          .post(
            `http://localhost:5000/locations/edit-location/${locationId}`,
            locationObject
          )
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });
      }
      navigate("/management", { state: { view: origin } }, { replace: true });
    };
    if (prepared) saveLocation();
    setPrepared(false);
    setIsLoaded(true);
  }, [prepared]);

  const handleReset = () => {
    setContinent("Europe");
    setCountry("");
    setCity("");
    setName("");
    setVisited(boolVisited);
    setYear("");
    setMonth("January");
    setPrio("");
    setNotes("");
    setKeywordsInput();
  };
  const handleCancel = () => {
    navigate("/management", { state: { view: origin } }, { replace: true });
    //alert('cancel')
  };

  return (
    <>
      {!isLoaded && <CircularProgress />}

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
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
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
                  helperText="1-3; empty = not prioritized"
                  inputProps={{ inputMode: "numeric", pattern: "[1-3]{1}" }}
                  label="Prio"
                  value={prio}
                  onChange={handlePrio}
                />
              </FormControl>
            )}
          </div>

          {/* Keywords */}
          <div>
            <FormControl sx={{ margin: 1, width: "30%" }}>
              <FormLabel sx={{ textAlign: "left", fontSize: 13 }}>
                Keywords
              </FormLabel>
              <ChipArray data={keywords} setKeywords={setKeywords} />
              <Grid sx={{display: 'flex', alignItems: 'center'}}>
                <TextField
                  id='keywords'
                  value={keywordsInput}
                  name="keywords" //input atribute name required for submit and post
                  sx={{ width: "80%" }}
                ></TextField>
                <Button onClick={handleKeywordAdd}><AddCircleIcon color="action" fontSize="large"/></Button>
              </Grid>
            </FormControl>
          </div>
        </Box>
        <Button
          sx={{ margin: 3 }}
          variant="contained"
          color="error"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ margin: 3 }}
          variant="contained"
          color="warning"
          type="reset"
        >
          Reset
        </Button>
        {view==='edit' && <Button onClick={()=>{navigate("/management/add-new-blog", { state: { view: 'new' } }, { replace: true });}}
          sx={{ margin: 3, bgcolor: 'info.main', '&:hover': {
            backgroundColor: 'info.dark',
          }, }}
          variant="contained"
        >
          Add Blog Post
        </Button>}
        
        <Button
          sx={{ margin: 3 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LocationForm;
