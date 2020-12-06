import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContainer } from "./styles/map";

const MapboxGLMap = ({ geoData, position }) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  const handleMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-115.606391900599817, 32.673693943392962],
        zoom: 14,
      });
      setMap(map);

      map.on("load", function () {
        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          // Add an image to use as a custom marker
          function (error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);

            map.addSource("tech", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: geoData,
              },
            });

            // Add a layer showing the tech.
            map.addLayer({
              id: "tech",
              type: "symbol",
              source: "tech",
              layout: {
                "icon-image": "custom-marker",
                "icon-allow-overlap": true,
                "icon-rotate": ["get", "bearing"],
              },
            });
          }
        );

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mouseenter", "tech", function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.name;
          var lastUpdate = e.features[0].properties.tsecs;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup
            .setLngLat(coordinates)
            .setHTML(
              `<h4>${description}</h4> <p>last updated: ${Math.floor(
                lastUpdate / 60
              )}</p>`
            )
            .addTo(map);
        });

        map.on("mouseleave", "tech", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  };

  useEffect(() => {
    handleMap();
  }, [map]);

  useEffect(() => {
    if (map !== null && geoData !== undefined && position > 0) {
      map.getSource("tech").setData({
        type: "FeatureCollection",
        features: geoData,
      });
    }
  }, [geoData, position, map]);

  return <MapContainer ref={(el) => (mapContainer.current = el)} />;
};

export default MapboxGLMap;
