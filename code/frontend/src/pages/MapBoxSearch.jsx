import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./MapBoxSearch.css";
import NaviBar from "../components/NaviBar";
import geoData from "../data/sports_data.json";
const MapBoxSearch = () => {
    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(() => {
        mapboxgl.accessToken =
            "MAPBOX_ACCESS_TOKEN";

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11", // Add map style
            center: [103.8198, 1.3521], // Set initial center coordinates (Singapore)
            zoom: 10.5, // Set initial zoom level
        });

        /**
         * Assign a unique id to each stadium. Use this `id`
         * later to associate each point on the map with a listing
         * in the sidebar.
         */
        geoData.features.forEach((stadium, i) => {
            stadium.properties.id = i;
        });

        // loading stadium data
        mapRef.current.on('load', () => {
            /* Add the data to your map as a layer */
            mapRef.current.addLayer({
              id: 'locations',
              type: 'fill',
              /* Add a GeoJSON source containing place coordinates and information. */
              source: {
                type: 'geojson',
                data: geoData
              }
            });
          });

        // Add navigation control (the +/- zoom buttons)
        mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");


        
        return () => {
            mapRef.current.remove();
        };
    }, []);

    return (
        <div id="page-container">
            <NaviBar />
            <div id="map-container" ref={mapContainerRef}></div>
        </div>
    );
};

export default MapBoxSearch;
