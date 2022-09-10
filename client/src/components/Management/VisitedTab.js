import React from "react";
import {  NavLink } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';


import TextList from "./TextList";

const VisitedTab = () => {

  return (
    <>
    <TextList view={"Visited"} />
    <NavLink  to={{pathname: "/management/add-new"}} state={{view: "Visited"}}  ><AddCircleIcon color="success" fontSize="large"/></NavLink>
    </>
      
  );
};

export default VisitedTab;
