import { createTheme } from '@mui/material/styles';

// const ambiLeftHand = "#B784D9";
// const amniRightHand = "#FFFBB3";
const ambiGreen = '#02735E';
const ambiWhite = "#FFFFFF";
const ambiMint = '#A7D9D4';
const ambiGrey = '#868686';

export default createTheme({
    palette: {
        common: {
            green: ambiGreen,
            white: ambiWhite
        },
        primary: {
            main: ambiGreen
        },
        secondary: {
            main: ambiWhite
        }
    },
    components:{
        MuiButtonBase:{
            styleOverrides:{
                root:{
                    "&.MuiTab-root":{
                        textTransform: 'none',
                        color: ambiWhite,
                        fontSize: '1rem',
                        "&.Mui-selected": {
                            fontWeight: 'bold',
                            color: ambiWhite,
                            textTransform: 'none',
                            opacity: 1
                        }
                    }
                }
            }
        },
        MuiCard:{
            variants:[
                {
                    props:{variant: 'tabs-container'},
                    style:{
                        backgroundColor: 'white',
                        minHeight: '663px',
                        height: 'fit-content'
                    }
                }
            ]
        },
        MuiCardContent:{
            styleOverrides:{
                root:{
                    padding: 0
                },
            },
            variants:[
                {
                    props:{variant: 'cart-item'},
                    style:{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                }
            ]
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: ambiGreen
                }
            }
        },
        MuiIcon: {
            styleOverrides: {
                root: {
                    overflow: 'visible'
                }
            }
        },
        // MuiSvgIcon: {
        //     styleOverrides: {
        //         root:{
        //             color: ambiWhite,
        //             opacity: 0.7,
        //             height: '1em',
        //             width: '1em',
        //             marginLeft: '25px',
        //             '&:hover': {
        //                 opacity: 1,
        //                 color: ambiWhite
        //             }
        //         }
        //     }
        // },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '>label': {
                        color: ambiGrey
                    }
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: ambiGreen,
                    color: ambiWhite,
                    borderRadius: '0px'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: ambiWhite,
                    opacity: 0.7,
                    '&:hover': {
                        opacity: 1,
                        fontWeight: 'bold',
                    }
                }
            }
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    '>ul': {
                        margin: 'revert'
                    }
                }
            }
        }
    },
    typography: {
        tab: {
            color: ambiWhite,
            opacity: 0.7,
            fontFamily: 'Raleway',
            fontWeight: 700,
            fontSize: '1rem'
        },
        h2: {
            fontFamily: 'Arial',
            fontWeight: 700,
            fontSize: '2.5rem',
            color: ambiGreen,
            lineHeight: 1.5
        },
        h3: {
            fontFamily: 'Pacifico',
            fontSize: '2.5rem',
            color: ambiGreen
        },
        h4: {
            fontFamily: 'Arial',
            fontSize: '1.75rem',
            color: ambiGreen,
            fontWeight: 700
        },
        subtitle1: {
            fontFamily: 'Arial',
            fontSize: '1.25rem',
            fontWeight: 300,
            color: ambiGrey
        },
        subtitle2: {
            fontFamily: 'Arial',
            color: ambiWhite,
            fontSize: '1.25rem',
            fontWeight: 300
        },
        subtitle3: {
            fontFamily: 'Arial',
            fontSize: '1rem',
            color: ambiGrey,
            fontWeight: 200
        }
    }
});