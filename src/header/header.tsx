"use client";
import { AppBar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { logoutStart } from "@/redux/slice/auth/authSlice";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineCall } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { RiFacebookFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
function Header() {
  const navItems: string[] = ["Home", "Pages", "Contact", "About Us"];
  const guideItems: string[] = ["Flight", "Hotels", "Car Rent"];
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const _dispatch = useDispatch();
  const router = useRouter();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { user } = useSelector((state: RootState) => state.auth);
  const handleClose = () => {
     
    setAnchorEl(null);
  };
  const handleAuthToggle = () => {
    if (user === null) {
      router.push("/auth/login");
    } else {
      
      console.log("Log out");
      _dispatch(logoutStart())
    }
  };
  const openMenuFun = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          color: "white",
          opacity: 0.5,
          display: "flex",
          alignItems: "center",
          left: 0,
          right: 0,
          margin: "0 auto",

          flexDirection: "row",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          width: "80%",
          justifyContent: "space-between",
          height: 75,
          zIndex: 1000,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            cursor: "pointer",
          }}
        >
          <Image
            src="/backgroundIMG/travel (2).png"
            width={60}
            height={60}
            alt="Picture of the company logo"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: "white",
                ml: 1,
                fontWeight: 700,
                fontSize: "24px",
              }}
            >
              FLY Explorer
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{
                fontWeight: "bold",
                color: "white",
                ml: 5,
                fontSize: "12px",
              }}
            >
              Flights & Hotels
            </Typography>
          </Box>
          <MenuIcon
            sx={{
              fontSize: "40px",
              marginLeft: "5px",
              "&:hover": {
                color: "lightblue",
              },
            }}
            onClick={openMenuFun}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            {navItems.map((item) =>
              item === "Pages" ? (
                <Typography
                  key={item}
                  variant="body2"
                  onMouseEnter={handleOpen}
                  // onClick={handleOpen}
                  sx={{
                    cursor: "pointer",
                    fontWeight: 700,
                    color: "black",
                    fontSize: "17px",
                    ml: 1,
                    mr: 1,
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#1976d2",
                    },
                  }}
                >
                  {item}
                </Typography>
              ) : (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    fontWeight: 700,
                    color: "black",
                    fontSize: "17px",
                    ml: 1,
                    mr: 1,
                    transition: "color 0.3s",
                    "&:hover": { color: "#1976d2" },
                  }}
                >
                  {item}
                </Typography>
              )
            )}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(53, 52, 52, 0.8)",

                  opacity: 0.9,
                  color: "white", // Text color
                },
              }}
            >
              {guideItems.map((item: string) => (
                <MenuItem
                  key={item}
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(148, 145, 145, 0.8)", // Hover background
                      color: "black", // Hover text color
                    },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <MdOutlineCall
            style={{
              backgroundColor: "white",
              padding: "4px",
              fontSize: "30px",
              borderRadius: "50%",
              color: "black",
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            lineHeight={1}
            marginLeft="5px"
            color="black"
          >
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "13px", lineHeight: 1.5, m: 0, fontWeight: 600 }}
            >
              Call Us:
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "17px", lineHeight: 1, m: 0 }}
            >
              +123 5959 66
            </Typography>
          </Box>
          <Typography
            sx={{
              width: "100px",
              backgroundColor: "rgba(97, 97, 97, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "35px",
              borderRadius: "5px",
              marginTop: "4px",
              marginLeft: "10px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(21, 20, 20, 0.8)",
                color: "white",
              },
            }}
          >
            <FiUser style={{ fontSize: "17px", color: "white" }} />
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "17px", paddingLeft: "4px", paddingTop: "1px" }}
              onClick={handleAuthToggle}
            >
              {user === null ? "Login" : "LogOut"}
            </Typography>
          </Typography>
        </Box>
      </AppBar>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "25%",
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
          transform: openMenu ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s ease-in-out",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Close Icon */}
        <HighlightOffIcon
          onClick={() => setOpenMenu(!openMenu)}
          sx={{
            fontSize: "30px",
            cursor: "pointer",
            color: "blue",
            alignSelf: "flex-end",
          }}
        />

        {/* Logo and Text */}
        <Box display="flex" alignItems="center" mt={2}>
          <Image
            src="/backgroundIMG/travel (2).png"
            width={40}
            height={40}
            alt="Logo"
          />
          <Box ml={2} display="flex" flexDirection="column">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                fontSize: "18px",
                color: "black",
                lineHeight: 1.3,
              }}
            >
              FLY Explorer
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "11px",
                color: "darkgrey",
                lineHeight: 1,
              }}
            >
              Flights & Hotels
            </Typography>
          </Box>
        </Box>

        {/* Horizontal Line */}
        <Box mt={3} mb={2}>
          <hr
            style={{
              width: "100%",
              border: "0.5px solid lightgray",
            }}
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "black",
              lineHeight: 1.5,
            }}
          >
            Office Address
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            123/A, Miranda City Likaoli Prikano,
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            Prikano,Dope
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "black",
              lineHeight: 1.5,
              mt: 3,
            }}
          >
            Phone Number
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            +0989 7876 9865 9
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            +(090) 8765 86543 85
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "black",
              lineHeight: 1.5,

              mt: 3,
            }}
          >
            Email Address
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            flyexplores@gmail.com
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ lineHeight: 1.5 }}
          >
            fly.exploresride@hotmail.com
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", mt: 5 }}>
          <RiFacebookFill
            style={{
              border: "1px solid blue",
              padding: "5px",
              fontSize: "40px",
              color: "blue",
              backgroundColor: "white",
              borderRadius: "50%", // optional for circular icon
            }}
          />
          <FaInstagram
            style={{
              border: "1px solid blue",
              padding: "5px",
              fontSize: "40px",
              color: "blue",
              backgroundColor: "white",

              borderRadius: "50%", // optional for circular icon
            }}
          />
          <FaXTwitter
            style={{
              border: "1px solid blue",
              padding: "5px",
              fontSize: "40px",
              color: "blue",
              backgroundColor: "white",
              borderRadius: "50%", // optional for circular icon
            }}
          />
          <BiLogoGmail
            style={{
              border: "1px solid blue",
              padding: "5px",
              fontSize: "40px",
              color: "blue",
              backgroundColor: "white",
              borderRadius: "50%", // optional for circular icon
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Header;
