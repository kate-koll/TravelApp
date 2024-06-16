import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormLabel from "@mui/material/FormLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Grid from "@mui/material/Grid";

export const LoginForm = () => {
  return (
    <form>
      <Box>
        <Typography sx={{ marginTop: 5, marginBottom: 0 }} variant="h5">
          Please Log In
        </Typography>
        <div>
          <FormControl sx={{ margin: 1, width: "30%" }}>
            <TextField name="name" required label="Name" />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ margin: 1, width: "30%" }}>
            <TextField name="password" required label="Password" />
          </FormControl>
        </div>
      </Box>
      <Button
          sx={{ margin: 3 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
    </form>
  );
};
