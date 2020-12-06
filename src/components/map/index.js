import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import MapboxGLMap from "./map";
import geoData from "../../JSON/api_techician_response_data.json";
import Turf from "turf";
import { Loading } from './styles/loading';
import {
  Container,
  MapModule,
  AlertModule
} from './styles/mapContainer';

const MapModuleContainer = () => {
  const [geoDataPosition, setGeoDataPosition] = useState(0);
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { data, updateLastDataRequest, updateGeoData } = useContext(
    GlobalContext
  );


  const handleDistance = (data) => {
    data?.map(tech => {
      data.filter(elm => elm.properties.name !== tech.properties.name).map(techAlt => {
        let line = Turf.lineString([tech.geometry.coordinates, techAlt.geometry.coordinates]);
        let distance = Turf.lineDistance(line, 'meters');
        if (distance < 304.8) {
          console.log(`${tech.properties.name} and ${techAlt.properties.name} are ${distance.toFixed(2)} meters apart`)
          setAlert(`${tech.properties.name} and ${techAlt.properties.name} are ${distance.toFixed(2)} meters apart`)
        }
      })
    })
  };

  useEffect(() => {
    updateGeoData(geoData);
    updateLastDataRequest(new Date());
  }, []);

  useEffect(() => {
    setShowAlert(true)
    if(alert !== ''){
      setTimeout(() => {
        setAlert('')
        setShowAlert(false)
      }, 2000);
    }
  }, [alert])

  useEffect(() => {
    if (geoDataPosition <= 15) {
      const interval = setInterval(() => {
        setGeoDataPosition(geoDataPosition + 1);
        handleDistance(data[geoDataPosition + 1]?.features)
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [geoDataPosition]);

  return (
    <Container>
      <MapModule>
        {data && data?.length > 0 ? (
          <MapboxGLMap geoData={data[geoDataPosition]?.features} position={geoDataPosition} />
        ) : (
            <Loading />
          )}
      </MapModule>
      {showAlert && <AlertModule><span>{alert}</span></AlertModule>}
    </Container>
  );
};

export default MapModuleContainer;
