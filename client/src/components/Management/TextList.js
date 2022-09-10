import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Link, Outlet, NavLink } from "react-router-dom";
import LineButtonGroup from "./LineButtonGroup";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useLocation} from 'react-router-dom'

export default function TextList(props) {
  const { view } = props;
  

  const [documents, setDocuments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleLoading = () => {
    setIsLoaded(!isLoaded);
  }

  useEffect(() => {
    setIsLoaded(false);
    if (view === "Visited") {
      fetch("http://localhost:5000/locations/get-visited")
        .then((res) => res.json())
        .then(
          (res) => {
            setDocuments(res.documents);
          },
          (er) => {
            setError(er);
          },
          () => {
            setIsLoaded(true);
          }
        )

    } else if (view === "Bucket") {
      fetch("http://localhost:5000/locations/get-bucket")
        .then((res) => res.json())
        .then(
          (res) => {
            setDocuments(res.documents);
          },
          (er) => {
            setError(er);
          },
          () => {
            setIsLoaded(true);
          }
        )
    }
  },[isLoaded]);

  function displayList() {
    return documents.map((location) => {
      return (
        <ListItem key={location._id}>
          <>
            <ListItemText primary={location.name} />
            <LineButtonGroup
              type={view}
              locationId={location._id}
              handler={handleLoading}
            />
          </>
        </ListItem>
      );
    });
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Grid container spacing={10}>
        <Grid sx={{ minWidth: "400px" }} item md={4}>
               
          <List>{displayList()}</List>

        </Grid>
      </Grid>
    </Box>
  );
}
