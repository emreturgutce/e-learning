import React from 'react'
import Box from '@mui/material/Box'
import { AppBar, Toolbar } from '@mui/material'
import SearchBar from './SearchBar/SearchBar'
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Button from '@mui/material/Button';
import MenuButtom from './MenuButtonm/MenuButtom';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
const Navigation = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "background.paper",
          height: "4.5rem",
          px: "2.4rem",
          boxShadow: "0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)",
        }}
      >
        <Toolbar disableGutters sx={{ my: "auto", gap: 1 }}>
          <Box sx={{ color: "black" }}>
            Udemy
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <SearchBar />
          </Box>
          <Box sx={{ color: "black" }}>
            Udemy'de Eğitim Verin
          </Box>
          <MenuButtom>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </MenuButtom>
          <Button variant="outlined" size="medium"> <Link to="/SignIn">Signin</Link></Button>
          <Button variant="outlined" size="medium" > <Link to="/SignUp"> Signup</Link></Button>
        </Toolbar>

      </AppBar>

    </Box >
  )
}

export default Navigation