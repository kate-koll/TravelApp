import React, { useState, useEffect } from "react";
import {useContext } from "react";

import Grid from "@mui/material/Grid";
import BucketTableContent from "../components/Bucket/BucketTableContent";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Context } from "../context";


export default function Bucket() {
  const CONTEXT = useContext(Context);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#43a047",
        light: "#76d275",
        veryLight: "#ecf9ec",
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

  const renderTable = (prio) => {
    let prioDocuments = documents.filter(function (location) {
      return location.bucketPriority === prio;
    });
    return prioDocuments.map((location) => {
      return (
        <Context.Provider value={CONTEXT}>
        <BucketTableContent
          key={location._id}
          origin="Bucket"
          name={location.name}
          country={location.country}
          city={location.city}
          notes={location.notes}
          prio={location.bucketPriority}
        />
        </Context.Provider>

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
    <ThemeProvider theme={theme}>
      {!isLoaded && (
        <div style={{ marginTop: "50px" }}>
          <CircularProgress sx={{ marginTop: "50px" }} />
        </div>
      )}
      {sortDocuments()}
      <br/>
      <Paper style={{ width: "100%" }}>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  size="small"
                  colSpan={2}
                  align="center"
                  sx={{ backgroundColor: "neutral.light" }}
                >
                  <Typography fontWeight="bold" variant="overline">
                    Prio 1
                  </Typography>
                </TableCell>
                <TableCell
                  colSpan={4}
                  sx={{ backgroundColor: "neutral.light" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Country — City
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  colSpan={2}
                  align="center"
                >
                  Notes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 440 }}>
              {renderTable(1)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />

      <Paper style={{ width: "100%" }}>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  size="small"
                  colSpan={2}
                  align="center"
                  sx={{ backgroundColor: "neutral.light" }}
                >
                  <Typography fontWeight="bold" variant="overline">
                    Prio 2
                  </Typography>
                </TableCell>
                <TableCell
                  colSpan={4}
                  sx={{ backgroundColor: "neutral.light" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Country — City
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  colSpan={2}
                  align="center"
                >
                  Notes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 440 }}>
              {renderTable(2)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />

      <Paper style={{ width: "100%" }}>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  size="small"
                  colSpan={2}
                  align="center"
                  sx={{ backgroundColor: "neutral.light" }}
                >
                  <Typography fontWeight="bold" variant="overline">
                    Prio 3
                  </Typography>
                </TableCell>
                <TableCell
                  colSpan={4}
                  sx={{ backgroundColor: "neutral.light" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  width="30%"
                  colSpan={2}
                  align="center"
                >
                  Country — City
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "primary.veryLight" }}
                  style={{ top: 45 }}
                  colSpan={2}
                  align="center"
                >
                  Notes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 440 }}>
              {renderTable(3)}
              {renderTable(null)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
    </ThemeProvider>
  );
}
