import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { Typography, Container, CssBaseline, Box, TextField, Button, CircularProgress } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import queryString from 'query-string';
import './App.css';
import Styled from './styles';
import searchIcon from './assets/search-icon.png';

import Details from './components/details';
import Header from './components/wrapper';

function initializeReactGA() {
    ReactGA.initialize('UA-167430869-1');
    ReactGA.pageview('/tracking');
}

initializeReactGA();

const App = () => {
    const [loading, setLoading] = React.useState(false);
    const [finalData, setData] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState(undefined);

    const methods = useForm();
    const { handleSubmit, control, errors, setError } = methods;

    const onSubmit = data => {
        if (data.batchId && data.batchId.length > 2) {
            ReactGA.event({
                category: 'User',
                action: `User submits BatchId ${data.batchId}`,
            });
            window.location.replace(`.?batchId=${data.batchId}`);
        } else {
            ReactGA.event({
                category: 'User',
                action: `User submits wrong BatchId`,
            });
            setData(undefined);
            setError('batchId', 'notMatch', 'Please enter a longer Batch ID');
        }
    };

    useEffect(() => {
        const qs = queryString.parse(window.location.search.replace('?', ''));
        setLoading(true);
        if (qs && qs.batchId && qs.batchId.length > 2) {
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
                    setLoading(false);
                })
                .catch(err => {
                    setErrorMsg(`Sorry we couldn't fetch your batch information. Please try again later`);
                    setLoading(false);
                });
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
                            <Typography align="center" variant="h4">
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
                                    defaultValue={queryString.parse(window.location.search.replace('?', '')).batchId}
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
                                    <CircularProgress className={classes.progress} />
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
