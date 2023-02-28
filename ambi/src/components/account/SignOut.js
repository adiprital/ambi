import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function SignOut() {
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
            user: undefined
        });
    };

    return (
        <React.Fragment>
            <Button 
                // variant='contained'
                aria-label="signout" 
                disabled={checkDisable()} 
                onClick={handleSignOut}
            >Sign Out
            </Button>
        </React.Fragment>
    );
}