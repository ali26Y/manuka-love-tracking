import { createStyled } from '../../utils/theme';
import beecomb from '../../assets/beecomb.jpeg';

export default createStyled(
    theme => ({
        appBar: {
            backgroundColor: '#121212',
        },
        menuContainer: {
            textAlign: 'center',
            margin: '0 auto',
            '& h6': {
                display: 'inline-block',
                position: 'relative',
                top: '-25px',
                padding: '0px 20px',
                width: '350px',
                // color: '#C39550',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '200 !important',
                textTransform: 'uppercase',
                '& a': {
                    color: 'inherit !important',
                    textDecoration: 'none !important',
                },
                '& span': {
                    textDecoration: 'none !important',
                },
                '&:hover': {
                    color: '#a78435',
                },
                '@media (max-width: 1000px)': {
                    width: 'auto',
                },
            },
            '& img': {
                display: 'inline-block',
                height: '80px',
                '@media (max-width: 449px)': {
                    height: '60px',
                },
            },
        },
        leftHeader: {
            '@media (max-width: 1000px) and (min-width: 600px)': {
                paddingRight: '80px !important',
            },
            '@media (min-width: 450px) and (max-width: 599px)': {
                paddingRight: '20px !important',
            },
            '@media (max-width: 449px)': {
                padding: '0 !important',
            },
        },
        rightHeader: {
            '@media (max-width: 1000px)  and (min-width: 600px)': {
                paddingLeft: '80px !important',
            },
            '@media (min-width: 450px) and (max-width: 599px)': {
                paddingLeft: '20px !important',
            },
            '@media (max-width: 449px)': {
                padding: '0 !important',
            },
        },
        pageContainer: {
            marginTop: '-10vh',
            marginBottom: '100px',
        },
        hero: {
            'background-image': `url(${beecomb})`,
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-color': '#121212',
            width: '100%',
            height: '50vh',
            'box-shadow': 'inset 0 0 0 1000px rgba(0,0,0,.3)',
        },
        footer: {
            backgroundColor: '#121212',
            padding: '5vh 0',
            '& a': {
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '200',
                '&:hover': {
                    color: '#a78435',
                },
            },
        },
    }),
    { withTheme: true }
);
