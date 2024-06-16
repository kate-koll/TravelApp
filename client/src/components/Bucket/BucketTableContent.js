import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const theme = createTheme({
  palette: {
    primary: {
      main: "#43a047",
      light: "#76d275",
      dark: "#00701a",
      contrastText: "#fff", //white
    },
    secondary: {
      main: "#aeea00",
      light: "#e4ff54",
      dark: "#79b700",
      contrastText: "#000", //black
    },
    neutral: {
      main: "#bdbdbd",
      light: "#efefef",
      dark: "#8d8d8d",
      whiteText: "#fff",
      blackText: "#000",
    },
  },
});

const BucketDetailsCard = (props) => {
  const { name, country, city, notes, prio } = props;

  return (
    <TableRow>
      <TableCell colSpan={2} align='center'>{name}</TableCell>
      <TableCell colSpan={2} align='center'>
        {country} — {city}
      </TableCell>
      <TableCell colSpan={2} align='center'>{notes}</TableCell>
    </TableRow>
  );
};

export default BucketDetailsCard;
