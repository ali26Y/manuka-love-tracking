import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import Lottie from 'react-lottie';
import { Typography, Container, CssBaseline, Box, TextField, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import queryString from 'query-string';
import './App.css';
import Styled from './styles';
import searchIcon from './assets/search-icon.png';
import animationData from './assets/scanner.json';

import Details from './components/details';
import Header from './components/wrapper';

function initializeReactGA() {
    ReactGA.initialize('UA-167430869-1');
    ReactGA.pageview('/tracking');
}

const options = {
    autoConfig: true,
    debug: process.env.NODE_ENV === 'production' ? false : true,
};

ReactPixel.init('701719740395379', null, options);
initializeReactGA();

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const App = () => {
    const [loading, setLoading] = React.useState(false);
    const [finalData, setData] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState(undefined);

    const methods = useForm();
    const { handleSubmit, control, errors, setError } = methods;

    const onSubmit = data => {
        if (data.batchId && data.batchId.length > 2) {
            window.location.replace(`.?batchId=${data.batchId}`);
        } else {
            setData(undefined);
            setError('batchId', 'notMatch', 'Please enter a longer Batch ID');
        }
    };

    useEffect(() => {
        ReactPixel.pageView();
        const qs = queryString.parse(window.location.search.replace('?', ''));
        setLoading(true);
        if (qs && qs.batchId && qs.batchId.length > 2) {
            setTimeout(() => {
                fetch(`${process.env.REACT_APP_API_URL}/${qs.batchId}`, {
                    method: 'GET',
                    mode: 'cors',
                    Connection: 'keep-alive',
                    'Content-Type': 'application/json',
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    },
                })
                    .then(async payload => {
                        const json = await payload.json();
                        setData(json);
                        ReactPixel.trackCustom('Search Batch', {
                            batchId: qs.batchId,
                            isSuccessful: true,
                        });
                        ReactGA.event({
                            category: 'User',
                            action: `User submits BatchId ${qs.batchId}`,
                        });
                        setLoading(false);
                    })
                    .catch(err => {
                        setErrorMsg(`Sorry we couldn't fetch your batch information. Please try again later`);
                        ReactPixel.trackCustom('Search Batch', {
                            batchId: qs.batchId,
                            isSuccessful: false,
                        });
                        ReactGA.event({
                            category: 'User',
                            action: `User submits wrong BatchId ${qs.batchId}`,
                        });
                        setLoading(false);
                    });
            }, 2500);
        } else {
            setData(undefined);
            setLoading(false);
        }
    }, [setError]);

    return (
        <div className="App">
            <CssBaseline />
            <Styled>
                {({ classes }) => (
                    <Header>
                        <Container className={classes.container} maxWidth="lg">
                            <Typography align="center" variant="h4" className={classes.mainHeader}>
                                Trace your batch & checkout your test certificate
                            </Typography>
                            <Box mb={4} />
                            <Typography className={classes.helperText} align="center">
                                Simply type in the Batch ID of your jar of honey. This can be found on the back label <br />
                                example:{' '}
                                <strong>
                                    <i>13245</i>
                                </strong>{' '}
                                And then click 'Search'
                            </Typography>
                            <Box mb={7} />
                            <div className={classes.formWrapper}>
                                <Controller
                                    className={classes.inputField}
                                    as={TextField}
                                    name="batchId"
                                    label="Batch ID"
                                    helperText={errors.batchId ? errors.batchId.message : ''}
                                    variant="outlined"
                                    control={control}
                                    defaultValue={queryString.parse(window.location.search.replace('?', '')).batchId || ''}
                                    rules={{ required: true, minLength: 2 }}
                                    error={!!errors.batchId}
                                />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!!loading}
                                >
                                    Search
                                </Button>
                                <Typography></Typography>
                            </div>
                            <Box mb={6} />
                            {finalData && !finalData.msg && Object.keys(finalData) && Object.keys(finalData).length ? (
                                <Details data={finalData} />
                            ) : loading ? (
                                <div className={classes.progresWrapper}>
                                    <Lottie options={defaultOptions} height={300} width={300} loop background="transparent" speed={2} autoplay />
                                    <Box mb={10} />
                                </div>
                            ) : errorMsg || (finalData && finalData.msg) ? (
                                <div className={classes.notFoundWrapper}>
                                    <img className={classes.searchIcon} src={searchIcon} alt="search icon" />
                                    <Box mb={2} />
                                    <Typography className={classes.notFound}>
                                        {errorMsg ||
                                            `Sorry we couldn't find the batch ID you were looking for.
                                         Please reach out to us for more information`}
                                    </Typography>
                                    <Box mb={20} />
                                </div>
                            ) : (
                                <Box mb={30} />
                            )}
                        </Container>
                    </Header>
                )}
            </Styled>
        </div>
    );
};

export default App;
