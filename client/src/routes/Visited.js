import React, {useState, useEffect} from "react";
import Grid from '@mui/material/Grid';
import VisitedDetailsCard from "../components/Visited/VisitedDetailsCard";
import axios from 'axios'

export default function Visited() {

const [documents, setDocuments] = useState([]);
const [error, setError] = useState();
const [isLoaded, setIsLoaded] = useState(false)


useEffect(() => {
  setIsLoaded(false)
  fetch("http://localhost:5000/locations/get-visited")
  .then((res) => res.json())
  .then(
    (res) => {
      setDocuments(res.documents);
      console.log(documents)
    },
    (er) => {
      setError(er);
    },
    () => {
      setIsLoaded(true);
    }
  )
}, [isLoaded])

const renderCards = () => {
  
  return documents.map((location)=>{
    return (<VisitedDetailsCard key = {location._id} origin="Visited" name = {location.name} month = {location.month} year={location.year} country={location.country} city={location.city} notes={location.notes}/>)
  })
}


    return (
      <Grid container wrap="wrap" direction="row" justifyContent="center" alignItems="center" columns={2}>
        
{renderCards()}
      </Grid>
    );
  }