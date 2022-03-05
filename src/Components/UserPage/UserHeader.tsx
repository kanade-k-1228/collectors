import AccountCircle from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { signout } from "../../Logic/Auth";
import { User } from "../../Logic/firestore";

export function UserHeader(props: { user: User }) {
  const user = props.user;
  const title = `${user.name}のコレクション`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const changeUserName = () => {
    const newUserName = prompt("New User Name", "");
    alert("New User Name: " + newUserName);
  };
  const changePassword = () => {
    const newPassword = prompt("New Password", "");
    alert("New Password: " + newPassword);
  };
  const changeAvater = () => {
    alert("Change Avater");
  };
  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={changeUserName}>Change Name</MenuItem>
              <MenuItem onClick={changePassword}>Change Pass</MenuItem>
              <MenuItem onClick={changeAvater}>Change Avater</MenuItem>
              <MenuItem onClick={() => signout()}>Sign Out</MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
