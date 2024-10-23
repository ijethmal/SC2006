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
            "pk.eyJ1Ijoid2ludnN3b243OCIsImEiOiJjbTI5bnZjMGowN3FmMnFvcHgxNTQwZzlhIn0.CcCoZGOApaW_DxtDiWWpyA";

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
        mapRef.current.on("load", () => {
            /* Add the data to your map as a layer */
            mapRef.current.addLayer({
                id: "locations",
                type: "fill",
                /* Add a GeoJSON source containing place coordinates and information. */
                paint: {
                    "fill-color": "#FF69B4", // Màu hồng (hot pink)
                    "fill-opacity": 0.8, // Độ trong suốt
                },
                source: {
                    type: "geojson",
                    data: geoData,
                },
            });

            mapRef.current.on("click", "locations", (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties["Description"];
                console.log(description);

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] +=
                        e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(description)
                    .addTo(mapRef.current);
            });
        });

        mapRef.current.on("mouseenter", "locations", () => {
            mapRef.current.getCanvas().style.cursor = "pointer";
        });

        mapRef.current.on("mouseleave", "locations", () => {
            mapRef.current.getCanvas().style.cursor = "";
        });

        // Add navigation control (the +/- zoom buttons)
        mapRef.current.addControl(
            new mapboxgl.NavigationControl(),
            "top-right"
        );

        return () => {
            mapRef.current.remove();
        };
    }, []);

    return (
        <div id="page-container">
            <NaviBar />
            <div class="sidebar">
                <div class="heading">
                    <h1>Locations</h1>
                </div>
                <div id="listings" class="listings"></div>
            </div>
            <div id="map-container" ref={mapContainerRef}></div>
        </div>
    );
};

export default MapBoxSearch;
