import { createMuiTheme } from '@material-ui/core/styles';
import {FontStyle as fontWeightBold} from "@material-ui/core/styles/createTypography";

const theme = createMuiTheme({
    typography: {

        "fontFamily": `"Rawline", "Raleway", sans-serif`,
        "fontSize": 14,
        "lineHeight": 1.5,
        "letterSpacing": 0.32,
        useNextVariants: true,
        suppressDeprecationWarnings: true,
        h1:{
            "fontWeight": 600,
        },
        h2:{
            "fontWeight": 600,
        },
        h3:{
            "fontWeight": 600,
        },
        h4:{
            "fontWeight": 600,
        },
        h5:{
            "fontWeight": fontWeightBold,
        },
        h6: {
            "fontWeight": 600,
        },
    },
    palette: {
        primary: {
            light: '#2670E8',
            main: '#2f4857',
            dark: '#2f4857',
            contrastText: '#fff',
        },
        secondary: {
            light: '#9E9D9D',
            main: '#333333',
            dark: '#000000',
            contrastText: '#fff',
        },
        error: {
            light: '#DB4800',
            main: '#E60000',
            dark: '#E60000',
            contrastText: '#fff',
        },
        warning: {
            light: '#F2E317',
            main: '#333333',
            dark: '#333333',
            contrastText: '#fff',
        },
        info: {
            light: '#48CBEB',
            main: '#155BCB',
            dark: '#155BCB',
            contrastText: '#fff',
        },
        success: {
            light: '#40E0D0',
            main: '#FFFFFF',
            dark: '#36A191',
            contrastText: '#fff',
        }
    },
    overrides: {
        MUIDataTableHeadCell: {
            root: {
                color:  "#2f4857",
                fontWeight:600
            },

            fixedHeaderCommon:{
                backgroundColor : '#ededed'
            }

        }
    }
});

export default theme;