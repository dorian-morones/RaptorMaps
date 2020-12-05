import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-115.606391900599817, 32.673693943392962],
        zoom: 12,
      });

      map.on("load", function () {
        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          // Add an image to use as a custom marker
          function (error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);

            map.addSource("places", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    "type": "Feature",
                    "properties": {
                      "id": 0,
                      "name": "Tech 3",
                      "tsecs": 1592078400,
                      "bearing": 0
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -115.606391900599817,
                        32.673693943392962
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {
                      "id": 0,
                      "name": "Tech 1",
                      "bearing": 87.0,
                      "tsecs": 1592078400
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -115.585908073767968,
                        32.679083641964432
                      ]
                    }
                  }
                ],
              },
            });

            // Add a layer showing the places.
            map.addLayer({
              id: "places",
              type: "symbol",
              source: "places",
              layout: {
                "icon-image": "custom-marker",
                "icon-allow-overlap": true,
              },
            });
          }
        );

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mouseenter", "places", function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.name;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseleave", "places", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
