import React, { Fragment } from 'react';
import { Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import queryString from 'query-string';

import { generateTableData } from './utils';
import Map from './map';
import Carousel from '../carousel';
import Styled from './styles';

const Details = props => {
    const { data } = props;
    const tableData = generateTableData(data);
    const openPdf = link => e => {
        if (e) e.preventDefault();
        window.open(
            link,
            'win2',
            'status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,resizable=yes,width=840,height=780,directories=no,location=no'
        );
        return false;
    };

    const qs = queryString.parse(window.location.search.replace('?', ''));
    return (
        <Styled>
            {({ classes }) => (
                <Fragment>
                    <Container className={classes.container}>
                        {qs && qs.batchId === '13245' ? (
                            <Fragment>
                                <Box mb={2} />
                                <Typography align="center">
                                    (Note: Batch ID <strong>13245</strong> is a sample tracking number used for illustration purposes)
                                </Typography>
                            </Fragment>
                        ) : (
                            ''
                        )}
                        <Box mb={2} />
                        <img className={classes.jarImage} alt="manukaphoto" src={data.JarImage.photo._meta.Location} />
                        <Box mb={4} />
                        <Typography>Honey Details</Typography>
                        <Box mb={3} />
                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableBody>
                                    {tableData.map((row, i) => (
                                        <TableRow key={`${row.name} ${i}`}>
                                            <TableCell component="th" scope="row">
                                                <strong>{row.title}</strong>
                                            </TableCell>
                                            {!row.link ? (
                                                <TableCell align="right">{row.value}</TableCell>
                                            ) : (
                                                <TableCell align="right" className={classes.link} onClick={openPdf(row.link)}>
                                                    <strong>{row.value}</strong>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                    <Box mb={11} />
                    <Fragment>
                        <Carousel data={data} />
                        <Box mb={11} />
                    </Fragment>
                    <Map data={data} />
                </Fragment>
            )}
        </Styled>
    );
};

export default Details;
