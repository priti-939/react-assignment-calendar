import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import MailIcon from "@mui/icons-material/Mail";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GradingSharpIcon from "@mui/icons-material/GradingSharp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import LogoImg from "../img/logo.png";
import { useDispatch } from "react-redux";
import { setHomeActive } from "../store/actions/action";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ManiDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const [open, setOpen] = React.useState(true);
  const [home, setHome] = React.useState(true);
  const [mail, setMail] = React.useState(false);

  React.useEffect(() => {
    dispatch(setHomeActive(true));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setHome(true);
    setMail(false);
    dispatch(setHomeActive(true));
  };

  const handleClick = () => {
    setHome(true);
    // setOpen(true);
  };

  const handleClickWorkOrder = () => {
    console.log("huu");
    if (home === true) {
      navigate("/list");
    }
  };

  const handleAnotherDrawer = () => {
    setMail(!mail);
    setOpen(false);
    dispatch(setHomeActive(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        PaperProps={{
          sx: {
            paddingTop: "30px",
          },
        }}
        variant="permanent"
        open={false}
      >
        <DrawerHeader>
          <img
            src={LogoImg}
            alt="logo"
            style={{ width: "65px", height: "65px" }}
          />
        </DrawerHeader>
        <List>
          <ListItem></ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block", ml: 0.1 }}
            onClick={handleDrawerOpen}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                }}
                className={open ? "activeListItem item" : "item  "}
              >
                <OtherHousesOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block", ml: 0.1 }}
            onClick={handleAnotherDrawer}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,

                  justifyContent: "center",
                }}
                className={mail ? "activeListItem" : "item  "}
              >
                <MailIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Drawer
        variant={home ? "permanent" : "temporary"}
        open={home}
        PaperProps={{
          sx: {
            marginLeft: "90px",
            paddingTop: "30px",
          },
        }}
      >
        <DrawerHeader className="homeHeader">Home</DrawerHeader>
        <List>
        
          <ListItem
            className={path === "/list" ? "activeListItem1" : "list"}
            disablePadding
            sx={{ display: "flex" }}
            onClick={handleClickWorkOrder}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: home ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: home ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GradingSharpIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Work Orders"
                //   sx={{ opacity: home ? 1 : 0 }}
              />
            </ListItemButton>
            <ArrowForwardIosIcon
              fontSize="5"
              style={{ display: "inline-block" }}
              color="disabled"
            />
          </ListItem>
          <ListItem
            className={path === "/calendar" ? "activeListItem1" : "list"}
            disablePadding
            sx={{ display: "flex" }}
            onClick={home ? () => navigate("/calendar") : null}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: home ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: home ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Calendar"
                //   sx={{ opacity: home ? 1 : 0 }}
              />
            </ListItemButton>
            <ArrowForwardIosIcon
              fontSize="5"
              style={{ display: "inline-block" }}
              color="disabled"
            />
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "flex" }}
            onClick={home ? () => navigate("/reports") : null}
            className={
              path === "/reports"
                ? "activeListItem1 has-arrow ai-icon "
                : "list"
            }
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: home ? "initial" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: home ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Reports"
                //   sx={{ opacity: home ? 1 : 0 }}
              />
            </ListItemButton>
            <ArrowForwardIosIcon
              fontSize="5"
              style={{ display: "inline-block" }}
              color="disabled"
            />
          </ListItem>
        </List>
      </Drawer>
      <Drawer
        variant={mail ? "permanent" : "temporary"}
        open={mail}
        PaperProps={{
          sx: {
            marginLeft: "90px",
            paddingTop: "30px",
          },
        }}
      >
        <DrawerHeader className="homeHeader">Mail</DrawerHeader>
        <List>
          <ListItem>
            <ListItemText
              secondary="Mail content goes here"
              //   sx={{ opacity: home ? 1 : 0 }}
            />
          </ListItem>
        </List>
      </Drawer>

      <Box className="subdrawer">
        {/* {home ? <Home open={home} setOpen={setHome}/> : null} */}
      </Box>
    </Box>
  );
}
