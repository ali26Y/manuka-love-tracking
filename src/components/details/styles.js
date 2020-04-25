import { createStyled } from '../../utils/theme';

export default createStyled(
    theme => ({
        container: {
            maxWidth: '600px',
        },
        appBar: {
            backgroundColor: '#121212',
        },
        table: {
            '& th': {
                borderBottom: 'none',
            },
            '& td': {
                borderBottom: 'none',
            },
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        mapWrapper: {
            width: '100vw',
            position: 'relative',
            left: 'calc(-50vw + 50%)',
        },
        aaMap: {
            height: '450px',
        },
        fibreMap: {
            height: 380,
            '& svg': {
                position: 'relative',
                top: '-39px',
                left: '-20px',
            },
        },
        tooltipWrapper: {
            width: '200px',
        },
        imgIcon: {
            height: '100px',
            borderRadius: '70px',
            width: '100px',
            border: 'solid 1px',
        },
    }),
    { withTheme: true }
);
