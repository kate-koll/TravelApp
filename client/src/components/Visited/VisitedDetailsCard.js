import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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


const VisitedDetailsCard = (props) => {
    const {name, month, year, country, city, notes} = props

    const card = (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CardContent>
        <Typography variant="h3" color="primary.main" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {`${month} ${year}, ${country} — ${city}`}
        </Typography>
        <Typography variant="body">
          {notes}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button color="info" size="small">Go to blog</Button>
      </CardActions>
    </ThemeProvider>
  </React.Fragment>
);
  return (
    <>
      <Box wrap="wrap" display="flex" direction="row" sx={{ maxWidth: 450 }}>
        <Card sx={{ margin: 3 }} variant="outlined">
          {card}
        </Card>
      </Box>
    </>
  );
};

export default VisitedDetailsCard;
