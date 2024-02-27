import React from "react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
const Header = ({ handleOpen }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <p>Welcome to simple CRUD form</p>
            <Button
              onClick={() => handleOpen()}
              variant="outlined"
              color="inherit"
              startIcon={<AddIcon />}
            >
              Add Employee
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
