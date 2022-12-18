import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import logo from '../../assets/ambiLogo.jpeg';
import Cart from '../Cart';
import WishList from '../WishList';

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
};

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '4em'
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em'
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            fontWeight: 'bold',
            color: theme.palette.common.white
        }
    },
    tabContainer: {
        marginLeft: 'auto',
    },
    menu: {
        backgroundColor: theme.palette.common.green,
        color: theme.palette.common.white,
        borderRadius: '0px'
    },
    menuItem: {
        ...theme.typography.tab,
        '&:hover': {
            opacity: 1,
            fontWeight: 'bold',
            color: theme.palette.common.white
        }
    },
    drawerIcon: {
        ...theme.typography.tab,
        height: '50px',
        width: '50px',
        marginLeft: '25px',
        '&:hover': {
            opacity: 1,
            color: theme.palette.common.white
        }
    },
    drawerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    drawerItem: {
        ...theme.typography.tab,
        fontFamily: 'Arial',
        fontWeight: 300,
        '&:hover': {
            opacity: 1,
            fontWeight: 'bold',
            color: theme.palette.common.white
        }
    },
    drawerItemSelected: {
        '& .MuiListItemText-root': {
            opacity: 1,
            fontWeight: 'bold'
        }
    },
    searchPaper: {
        display: 'flex', 
        alignItems: 'center',
        '&:hover': {
            opacity: 0.25,
            backgroundColor: theme.palette.common.white
        }
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down(('md')));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);

    const products = useSelector((state) => state.productsList).products;

    const handleChange = (newValue) => {
        props.setValue(newValue);
    };

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        props.setSelectedIndex(i);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const productsOptions = [{name: 'Products', link: '/products', activeIndex: 2, selectedIndex: 0},
        ...products.map((product, index) => {
            return { name: product.name,
                    link: `/${product.name.replace(/\s/g, '').toLowerCase()}`,
                    activeIndex: 2,
                    selectedIndex: index + 1 }
    })];

    const routes = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'About Us', link: '/about', activeIndex: 1 },
        { name: 'Products', link: '/products', activeIndex: 2,
            ariaOwns: anchorEl ? 'simple-menu' : undefined,
            ariaPopup: anchorEl ? 'true' : undefined,
            mouseOver: event => handleClick(event) },
        { name: 'Contact Us', link: '/contact', activeIndex: 3 },
    ];

    useEffect(() => {
        [...productsOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (props.value !== route.activeIndex) {
                        props.setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== props.selectedIndex) {
                            props.setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                default:
                    break;
            }
        })
    }, [props.value, productsOptions, props.selectedIndex, routes, props]);

    const search = (
        <React.Fragment>
            <Paper
                className={classes.searchPaper}
                component="form" 
                sx={{ 
                    backgroundColor: theme.palette.common.white,
                    opacity: 0.15 
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, color: 'inherit' }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search...' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon className={classes.drawerIcon} 
                        sx={{ color: 'inherit' }}/>
                </IconButton>  
            </Paper>
        </React.Fragment>
    ); 

    const tabs =(
        <React.Fragment>
            <Tabs
                value={props.value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor='primary'
            >
                {search}

                {routes.map((route, index) => (
                    <Tab
                        key={`${route}${index}`}
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                classes={{paper: classes.menu}}
                MenuListProps={{onMouseLeave: handleClose}}
                elevation={0}
                anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
            >
                {productsOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{root: classes.menuItem}}
                        onClick={(event) => {handleMenuItemClick(event, i); props.setValue(1); handleClose()}}
                        selected={i === props.selectedIndex && props.value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
            >
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {search}
                    {routes.map(route => (
                        <ListItem
                            key={`${route}${route.activeIndex}`}
                            divider
                            button
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                            onClick={() => {
                                setOpenDrawer(false);
                                props.setValue(route.activeIndex);
                            }}
                        >
                            <ListItemText 
                                className={classes.drawerItem} 
                                disableTypography>
                                    {route.name}
                                </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MoreVertIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position='fixed' color='primary'>
                    <Toolbar disableGutters>
                        <Button
                            component={Link}
                            to='/'
                            disableRipple
                            className={classes.logoContainer}
                        >
                            <img alt='company logo' className={classes.logo} src={logo} />
                        </Button>

                        <IconButton aria-label='profile' disableRipple>
                            <PersonIcon className={classes.drawerIcon} />
                        </IconButton>

                        <Cart/>
                        <WishList/>

                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
};