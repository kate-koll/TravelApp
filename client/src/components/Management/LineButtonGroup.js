import React, {useState} from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {  NavLink } from "react-router-dom";

import axios from "axios";

const LineButtonGroup = (props) => {
  const {type, locationId , handler} = props;


  const handleEditClick = () => {

  };
  
  const handleDeleteClick = (event) => {
    axios.post(`http://localhost:5000/locations/delete-location/${locationId}`);
    handler(); //to change list loading state to rerender the list

  };
  const handleCheckClick = () => {

      axios.post(`http://localhost:5000/locations/edit-location/${locationId}`, {visited:true})

        .catch(function (error) {
          console.log(error);
        });
        handler(); //to change list loading state to rerender the list
  
  };
  const handlePostClick = () => {
    alert("post");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group" size="small">
        <NavLink to={{pathname: "/management/edit-location"}} state={{view: type, locationId: locationId}}><IconButton onClick={handleEditClick} aria-label="edit" color="info">
          <EditIcon />
        </IconButton></NavLink>
        
        <IconButton
          onClick={handleDeleteClick}
          aria-label="delete"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
        {type === "Bucket" && (
          <IconButton
            onClick={handleCheckClick}
            aria-label="check"
            color="primary"
          >
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        )}
        {type === "Visited" && (
          <IconButton
            onClick={handlePostClick}
            aria-label="check"
            color="primary"
          >
            <PostAddIcon />
          </IconButton>
        )}
      </ButtonGroup>
    </Box>
  );
};

export default LineButtonGroup;
