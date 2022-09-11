import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import BucketDetailsCard from "../components/Bucket/BucketDetailsCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function Bucket() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:5000/locations/get-bucket")
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
        <BucketDetailsCard
          key={location._id}
          origin="Bucket"
          name={location.name}
          country={location.country}
          city={location.city}
          notes={location.notes}
          prio={location.bucketPriority}
        />
      );
    });
  };
  let sortedDocuments = [];
  const sortDocuments = () => {
    sortedDocuments = documents;
    sortedDocuments.sort(
      (a, b) =>
        (a.bucketPriority != null ? a.bucketPriority : Infinity) -
        (b.bucketPriority != null ? b.bucketPriority : Infinity)
    );
  };

  return (
    <>
      {!isLoaded && (
        <div style={{ marginTop: "50px" }}>
          <CircularProgress sx={{ marginTop: "50px" }} />
        </div>
      )}
      <Grid
        container
        wrap="wrap"
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        columns={2}
      >
        {sortDocuments()}
        {renderCards()}
      </Grid>
    </>
  );
}
