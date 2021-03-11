import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button, useTheme, useMediaQuery } from "@material-ui/core";
import { Interpreter } from "xstate";
import { DataContext, DataEvents } from "../machines/dataMachine";
import { useService } from "@xstate/react";
import TransactionNavTabs from "./TransactionNavTabs";
import { ReactComponent as RWALogo } from "../svgs/rwa-logo.svg";
import { ReactComponent as RWALogoIcon } from "../svgs/rwa-icon-logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    color: "white",
    verticalAlign: "bottom",
  },
  newTransactionButton: {
    fontSize: 16,
    backgroundColor: "#00C853",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#4CAF50",
      borderColor: "#00C853",
      boxShadow: "none",
    },
  },
  customBadge: {
    backgroundColor: "red",
    color: "white",
  },
}));

interface NavBarProps {
  drawerOpen: boolean;
  toggleDrawer: Function;
  notificationsService: Interpreter<DataContext, any, DataEvents, any>;
}

const NavBar: React.FC<NavBarProps> = ({ drawerOpen, toggleDrawer, notificationsService }) => {
  const match = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [notificationsState] = useService(notificationsService);

  const allNotifications = notificationsState?.context?.results;
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          data-test="sidenav-toggle"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleDrawer()}
        >
          <MenuIcon data-test="drawer-icon" />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
          data-test="app-name-logo"
        >
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }} component={RouterLink}>
            {xsBreakpoint ? (
              <RWALogoIcon className={classes.logo} />
            ) : (
              <RWALogo className={classes.logo} />
            )}
          </Link>
        </Typography>
        <Button
          className={classes.newTransactionButton}
          variant="contained"
          color="inherit"
          component={RouterLink}
          to="/transaction/new"
          data-test="nav-top-new-transaction"
        >
          <AttachMoneyIcon /> New
        </Button>
        <IconButton
          color="inherit"
          component={RouterLink}
          to="/notifications"
          data-test="nav-top-notifications-link"
        >
          <Badge
            badgeContent={allNotifications ? allNotifications.length : undefined}
            data-test="nav-top-notifications-count"
            classes={{ badge: classes.customBadge }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      {(match.pathname === "/" || RegExp("/(?:public|contacts|personal)").test(match.pathname)) && (
        <TransactionNavTabs />
      )}
    </AppBar>
  );
};

export default NavBar;
