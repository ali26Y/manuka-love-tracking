/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Paper, Grid } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Styled from './styles';

export const markerIcon = color =>
    new L.DivIcon({
        className: 'markerIcon',
        html: `
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 172 172" style=" fill:#000000; opacity: 0.5;">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill=${color}>
                            <g id="surface1"><path d="M86,3.44c-30.34187,0 -55.04,24.69813 -55.04,55.04c0,48.54969 50.32344,106.45188 52.46,108.8975c0.65844,0.7525 1.58563,1.1825 2.58,1.1825c1.06156,-0.06719 1.92156,-0.43 2.58,-1.1825c2.13656,-2.48594 52.46,-61.3825 52.46,-108.8975c0,-30.34187 -24.69812,-55.04 -55.04,-55.04zM86,41.28c11.395,0 20.64,9.245 20.64,20.64c0,11.395 -9.245,20.64 -20.64,20.64c-11.395,0 -20.64,-9.245 -20.64,-20.64c0,-11.395 9.245,-20.64 20.64,-20.64z"></path></g>
                        </g>
                    </g>
                </svg>
              `,
    });

class NewFibreSite extends Component {
    render() {
        const { data } = this.props;
        const MyMarker = props => {
            const initMarker = ref => {
                if (ref) {
                    ref.leafletElement.closePopup = () => {};
                    ref.leafletElement.openPopup();
                }
            };

            return <Marker ref={initMarker} {...props} />;
        };
        return (
            <Styled>
                {({ classes }) => (
                    <div className={classes.mapWrapper}>
                        <Container maxWidth="lg">
                            <Paper>
                                <Map
                                    center={[data.location.latitude, data.location.longitude]}
                                    zoom={10}
                                    className={classes.fibreMap}
                                    attributionControl={false}
                                >
                                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                                    <MyMarker position={[data.location.latitude, data.location.longitude]} icon={markerIcon('#C39550')}>
                                        <Popup>
                                            <Grid container>
                                                <Grid xs={5} item>
                                                    <img className={classes.imgIcon} alt="map-imagez" src={data.location.mapImage._meta.Location} />
                                                </Grid>
                                                <Grid xs={7} item>
                                                    <span className={classes.popupText}>
                                                        <strong>{data.location.shortDescription}</strong>
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        </Popup>
                                    </MyMarker>
                                </Map>
                            </Paper>
                        </Container>
                    </div>
                )}
            </Styled>
        );
    }
}

export default NewFibreSite;
