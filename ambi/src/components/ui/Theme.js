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
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '>label': {
                        color: ambiGrey
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
            fontSize: '1.25rem',
            fontWeight: 300,
            color: ambiGrey
        },
        subtitle2: {
            color: ambiWhite,
            fontSize: '1.25rem',
            fontWeight: 300
        },
        body1: {
            fontSize: '1rem',
            color: ambiWhite,
            fontWeight: 300
        },
        body2: {
            fontSize: '1.25rem',
            color: ambiGrey,
            fontWeight: 300
        },
        learnButton: {
            borderColor: ambiMint,
            color: ambiMint,
            borderWidth: 2,
            textTransform: 'none',
            borderRadius: 50,
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }
    }
});