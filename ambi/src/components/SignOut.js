import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    signOutButton: {
        height: 45,
        width: 245,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userAuth).currentUser;

    const checkDisable = () => {
        let res = false;
        if ( user === undefined ) {
                res = true;
        } else {
            res = false;
        }
        return res;
    };

    const handleSignOut = async () => {
        localStorage.setItem('token', undefined);
        dispatch({ type: 'updateCurrentUser',  
            user: {
                email: undefined, 
                balance: 0
        }});
    };

    return (
        <React.Fragment>
            <Button 
                className={classes.signOutButton}
                aria-label="signout" 
                disabled={checkDisable()} 
                onClick={handleSignOut}
            >Sign Out
            </Button>
        </React.Fragment>
    );
}