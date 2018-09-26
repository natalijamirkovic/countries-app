import React from 'react';
import GoogleMapReact from 'google-map-react';
import CountryMapName from './CountryMapName';

const CountryMap = (props) => {

    const { map, name } = props;

    return (
        <div id="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB3BZN3ak7KFO9VwsU2HwwbBKAvmWQwkkQ" }}
                defaultCenter={map}
                defaultZoom={6}
            >
                <CountryMapName
                    lat={map.lat}
                    lng={map.lng}
                    text={name}
                />
            </GoogleMapReact>
        </div>
    );
}

export default CountryMap;