import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import useUser from "../shared/hooks/auth/useUser";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import useSignout from "../shared/hooks/auth/useSignout";
import { useRouter } from "next/router";

type Props = {};

const Navbar = (props: Props) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mutate } = useSignout();
  const { data, isLoading } = useUser();
  const router = useRouter();

  return (
    <Box>
      <AppBar position="static" sx={{ p: "1rem" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href="/" passHref>
            <Typography
              variant="h5"
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tabless🤠
            </Typography>
          </Link>

          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="avatar"
                        src={data.user_metadata?.avatar_url}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        router.push("/home");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => mutate()}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Link href="/auth" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
