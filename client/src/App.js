import "./App.css";
import { Link, Outlet, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";


function App() {
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
      info: {
        main: "#0288d1",
        light: "#03a9f4",
        dark: "#01579b",
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
  let activeStyle = {
    backgroundColor: theme.palette.secondary.main,
    textDecoration: "none",
    color: "black",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "18px",
    paddingBottom: "19px",
    borderRadius: "20px",
  };
  let inactiveStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, paddingBottom: 0.5 }}>
          <AppBar
            position="static"
            sx={{ bgcolor: "neutral.light", height: 40, borderRadius: "5px" }}
          >
            <Toolbar
              style={{ minHeight: "10px", alignItems: "center" }}
              sx={{ height: 40 }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Link
                  style={{ textDecoration: "none", fontSize: "10px" }}
                  to="/"
                >
                  <HomeIcon sx={{ color: "secondary.contrastText" }}></HomeIcon>
                </Link>
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "secondary.contrastText" }}
              >
                KM Travel Diary
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Link
                  style={{ textDecoration: "none", fontSize: "10px" }}
                  to="/login"
                >
                  <LoginIcon
                    sx={{ color: "secondary.contrastText" }}
                  ></LoginIcon>
                </Link>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ bgcolor: "primary.light", borderRadius: "5px" }}
          >
            <Toolbar
              sx={{
                justifyContent: "space-between",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Typography variant="h5">
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="/"
                >
                  BLOG
                </NavLink>
              </Typography>{" "}
              <Typography variant="h5">
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="/visited"
                >
                  VISITED
                </NavLink>
              </Typography>
              <Typography variant="h5">
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="/bucket"
                >
                  BUCKET
                </NavLink>
              </Typography>
              <Typography variant="h5">
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="/management"
                >
                  Management
                </NavLink>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
