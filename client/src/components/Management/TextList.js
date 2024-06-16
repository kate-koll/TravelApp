import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import LineButtonGroup from "./LineButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";

export default function TextList(props) {
  const { view } = props; //view = Visited || Bucket || Blog(blog todo or delete from this comment)

  const [documents, setDocuments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); //for performing rerender after some line button action
  const [error, setError] = useState(null);
  

  const [loading, setLoading] = useState(true); //for displaying spinner if not ready
  const numberOfRows = useRef();

  const handleLoading = () => { //for performing rerender after some line button action
    setIsLoaded(!isLoaded);
  };

  useEffect(() => {
    setIsLoaded(false);
    if (view === "Visited") {
      fetch("http://localhost:5000/locations/get-visited")
        .then((res) => res.json())
        .then(
          (res) => {
            setDocuments(res.documents);
            setLoading(false);
          },
          (er) => {
            setError(er);
          }
        );
    } else if (view === "Bucket") {
      fetch("http://localhost:5000/locations/get-bucket")
        .then((res) => res.json())
        .then(
          (res) => {
            setDocuments(res.documents);
            setLoading(false);
          },
          (er) => {
            setError(er);
          }
        );
    }
  }, [isLoaded]);

  function displayList() {
    numberOfRows.current = Math.ceil(documents.length / 3);
    return documents.map((location) => {
      return (
        <ListItem key={location._id}>
          <>
            {view==="Visited" &&(<ListItemText primary={location.name} />)}
            {view==="Bucket" && location.bucketPriority && (<ListItemText primary={`${location.bucketPriority}. ${location.name}`} />)}
            {view==="Bucket" && !location.bucketPriority && (<ListItemText primary={`${location.name}`} />)}
            <LineButtonGroup
              type={view} //Visited || Bucket
              locationId={location._id}
              handler={handleLoading}
            />
          </>
        </ListItem>
      );
    });
  }
  let sortedDocuments = [];
  const sortDocuments = (view) => {
    sortedDocuments = documents;
    if (view === "Bucket") {
      sortedDocuments.sort(
        (a, b) =>
          (a.bucketPriority != null ? a.bucketPriority : Infinity) -
          (b.bucketPriority != null ? b.bucketPriority : Infinity)
      );
    } else if (view === "Visited") {
      sortedDocuments = documents;
      sortedDocuments.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Grid display="flex" justifyContent="center">
        <Grid sx={{ minWidth: "400px", justifyContent: "center" }} item md={4}>
          {loading && <CircularProgress />}
          <List
            sx={{
              display: "grid",
              gridTemplateRows: `repeat(${numberOfRows.current}, 60px)`,
              gridTemplateColumns: "repeat(3, 350px)",
              gridAutoFlow: "column",
              columnGap: "40px",
            }}
          >
            {sortDocuments(view)}
            {displayList()}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
