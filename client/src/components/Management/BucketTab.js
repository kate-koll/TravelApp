import React from 'react'
import { Link, Outlet, NavLink ,useNavigate} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TextList from './TextList'

const BucketTab = () => {
  return (
    <>
        <TextList view={"Bucket"} />
    <NavLink  to={{pathname: "/management/add-new"}} state={{view: "Bucket"}}  ><AddCircleIcon color="success" fontSize="large"/></NavLink>
    </>

  )
}

export default BucketTab