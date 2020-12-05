import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import MapboxGLMap from "./map";
import geoData from "../../JSON/api_techician_response_data.json";

const MapModuleContainer = () => {
  const [geoDataPosition, setGeoDataPosition] = useState(0);
  const { data, updateLastDataRequest, updateGeoData } = useContext(
    GlobalContext
  );

  useEffect(() => {
    updateGeoData(geoData);
    updateLastDataRequest(new Date());
  }, []);

  useEffect(() => {
    if (geoDataPosition <= 15) {
      const interval = setInterval(() => {
        setGeoDataPosition(geoDataPosition + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [geoDataPosition]);


  return (
    <>
      {data && data?.length > 0 ? (
        <MapboxGLMap geoData={data[geoDataPosition]?.features} position={geoDataPosition} />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default MapModuleContainer;
