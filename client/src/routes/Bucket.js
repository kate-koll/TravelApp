import React, {useState, useEffect} from "react";
import Grid from '@mui/material/Grid';
import BucketDetailsCard from "../components/Bucket/BucketDetailsCard";
import axios from 'axios'

export default function Bucket() {

const [documents, setDocuments] = useState([]);
const [error, setError] = useState();
const [isLoaded, setIsLoaded] = useState(false)


useEffect(() => {
  setIsLoaded(false)
  fetch("http://localhost:5000/locations/get-bucket")
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
    return (<BucketDetailsCard key = {location._id} origin="Bucket" name = {location.name} country={location.country} city={location.city} notes={location.notes} prio ={location.bucketPriority}/> )
  })
}


    return (
      <Grid container wrap="wrap" direction="row" justifyContent="center" alignItems="center" columns={2}>
        
{renderCards()}
      </Grid>
    );
  }