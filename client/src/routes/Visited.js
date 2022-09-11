import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import VisitedDetailsCard from "../components/Visited/VisitedDetailsCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function Visited() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:5000/locations/get-visited")
      .then((res) => res.json())
      .then(
        (res) => {
          setDocuments(res.documents);
          setIsLoaded(true);
        },
        (er) => {
          setError(er);
        }
      );
  }, []);

  const renderCards = () => {
    return documents.map((location) => {
      return (
        <VisitedDetailsCard
          key={location._id}
          origin="Visited"
          name={location.name}
          month={location.month}
          year={location.year}
          country={location.country}
          city={location.city}
          notes={location.notes}
        />
      );
    });
  };
  let sortedDocuments = [];
  const sortDocuments = () => {
    sortedDocuments = documents;
    sortedDocuments.sort((a, b) =>
      parseInt(a.year) < parseInt(b.year) ? 1 : -1
    );
  };

  return (
    <>
    {!isLoaded&&(<div style={{marginTop:'50px'}}><CircularProgress sx={{marginTop:'50px'}}/></div>)}
      <Grid
        container
        wrap="wrap"
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        columns={3}
        
      >
        {sortDocuments()}
        {renderCards()}
      </Grid>
    </>
  );
}
