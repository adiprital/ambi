
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import WishListItem from './WishListItem';
import SignIn from '../account/SignIn'; 
import SignUp from '../account/SignUp';

const useStyles = makeStyles(theme => ({
    scrollBox: {
        height: '65%',
        overflowY: 'scroll'
    },
    wishListContentStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const wishListItemStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const wishListSignIn = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WishList() {
    const classes = useStyles();
    const theme = useTheme();
    const [openWishList, setOpenWishList] = useState(false);

    const favorites = useSelector((state) => {
        return state.wishList
    }).wishListData;

    const user = useSelector((state) => state.userAuth).currentUser;

    const handleOpenWishList = () => {
        setOpenWishList(true);
    };

    const handleCloseWishList = () => {
        setOpenWishList(false);
    };

    const renderFavoriteItems = () => {
        const keys = Object.keys(favorites);
        return keys.map((productName, index) => {
            if (favorites[productName] > 0) {
                return (
                    <WishListItem key={index} productName={productName} />
                );
            }
        });
    };

    const totalAmountInWishList = () => {
        const values = Object.values(favorites);
        return values.reduce((acc, curr) => acc + curr, 0);
    }; 

    const accountWishlist = (
        <React.Fragment>
            <Box className={classes.scrollBox} sx={wishListItemStyle}>
                <IconButton onClick={handleCloseWishList}>
                    <CloseIcon/>
                </IconButton>
                <Typography align='center' variant='h4'>My Favorite</Typography>
                <Typography align='center'variant='subtitle1' sx={{marginBottom: '25px'}}>
                    Hello {user === undefined ? '' : user.email}
                </Typography>
                <Typography align='center' variant='subtitle3' sx={{marginBottom: '25px'}}>Favorite's items:</Typography>

                <Box className={classes.wishListContentStyle}>
                    {renderFavoriteItems()}
                </Box>
            </Box>
        </React.Fragment>
    );

    

    return (
        <React.Fragment>
            <IconButton onClick={handleOpenWishList} aria-label="wish-list" disableRipple>
                <Badge 
                    color="secondary" 
                    badgeContent={totalAmountInWishList()} 
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                   <FavoriteIcon sx={{ color: theme.palette.common.white }} /> 
                </Badge>
            </IconButton>

            <Modal
                open={openWishList}
                onClose={handleCloseWishList}
            >
                { user ? accountWishlist : <Box sx={wishListSignIn}>
                                                <IconButton onClick={handleCloseWishList}>
                                                    <CloseIcon/>
                                                </IconButton> 
                                                <SignIn/> 
                                                <SignUp/> 
                                            </Box> }

            </Modal>

        </React.Fragment>
    );
}