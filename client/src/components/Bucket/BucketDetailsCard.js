import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
    const {name, country, city, notes, prio} = props

    const card = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
    <CardContent sx={{display: "flex", flexDirection: 'column', flexWrap: "wrap", justifyContent: "start"}}>
        <Typography variant="h3" color="primary.main" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {`${country} — ${city}`}
        </Typography>
        <Typography variant="body">
          {`Priority: ${prio}`}
        </Typography>
        <Typography variant="body">
          {notes||null}
        </Typography>
      </CardContent>
    </ThemeProvider>
  </React.Fragment>
);
  return (
    <>
      <Box  display="flex" sx={{ width: "450px" }}>
        <Card sx={{ margin: 3, wrap:"wrap", display:"flex", flexDirection: 'column', width: "450px"}} variant="elevation" elevation={4}>
          {card}
        </Card>
      </Box>
    </>
  );
};

export default BucketDetailsCard;
