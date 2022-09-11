import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import VisitedTab from "../components/Management/VisitedTab";
import BucketTab from "../components/Management/BucketTab";
import BlogTab from "../components/Management/BlogTab";

export default function Management() {
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

  const [view, setView] = useState();
  const localView = useRef();

  let origin = useLocation();
  if (!view) {
    //if localView empty
    if (origin.state) {
      try {
        if (origin.state.view) {
          //view exists in state: set to that value
          localView.current = origin.state.view;
          setView(origin.state.view);
        }
      } catch (e) {
        console.log("error: " + e);
      }
    }
    //localView empty and no view in origin: set default "Visited"
    else {
      localView.current = "Visited";
      setView("Visited");
    }
  }

  const handleChange = (event, newValue) => {
    setView(newValue);
    localView.current = newValue;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
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
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={view}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "secondary.main",
                  bgcolor: "neutral.light",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  indicatorColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Visited" value="Visited" />
                  <Tab label="Bucket" value="Bucket" />
                  <Tab label="Blog" value="Blog" />
                </TabList>
              </Box>
            </TabContext>
          </Box>
          {view === "Visited" && <VisitedTab />}
          {view === "Bucket" && <BucketTab />}
          {view === "Blog" && <BlogTab />}
        </Box>
      </ThemeProvider>
    </div>
  );
}
