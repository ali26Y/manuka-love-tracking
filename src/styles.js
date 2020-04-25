import { createStyled } from './utils/theme';

export default createStyled(
    theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(2),
        },
        container: {
            '@media (min-width: 1200px)': {
                padding: theme.spacing(7, 9, 0.1),
            },
            '@media (max-width: 1199px)': {
                padding: theme.spacing(5, 3, 0.1),
            },
            '@media (max-width: 449px)': {
                padding: theme.spacing(5, 1.5, 0.1),
            },
        },
        formWrapper: {
            textAlign: 'center',
        },
        button: {
            height: '52px',
            marginLeft: '20px',
            width: '120px',
            '@media (max-width: 599px)': {
                minWidth: '100%',
                marginLeft: 0,
            },
        },
        inputField: {
            minWidth: '250px',
            '@media (max-width: 599px)': {
                minWidth: '100%',
                marginBottom: theme.spacing(3),
            },
        },
        progresWrapper: {
            textAlign: 'center',
        },
        progress: {
            width: '80px !important',
            height: '80px !important',
        },
        notFoundWrapper: {
            textAlign: 'center',
        },
        searchIcon: {
            width: '70px',
            height: '70px',
        },
        helperText: {
            fontSize: '12.5px',
        },
    }),
    { withTheme: true }
);
