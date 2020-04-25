import red from '@material-ui/core/colors/red';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

// A custom theme for this app
export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Monteserrat, sans-serif',
    },
    palette: {
        text: {
            primary: 'rgba(0, 0, 0, 0.9)',
            secondary: 'rgba(0, 0, 0, 0.77)',
            grey: '#e3e6e8',
        },
        primary: {
            main: '#C39550',
        },
        secondary: {
            main: '#fdcc08',
            dark: '#006280',
        },
        ternary: {
            main: '#fdcc08',
            dark: '#f9ae00',
        },
        error: {
            main: red.A400,
            light: '#FF8768',
        },
        inComplete: '#D2D7DB',
    },
    fonts: {
        color: 'rgba(0, 0, 0, 0.87)',
    },
});

// A function you can extract and put into its own module.
// Yes, 11 lines of code is all you need.
export const createStyled = (styles, options) => {
    function Styled(props) {
        const { children, ...other } = props;
        return children(other);
    }
    return withStyles(styles, options)(Styled);
};
