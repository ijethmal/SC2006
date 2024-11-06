import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "./MapBoxSearch.css";
import NaviBar from "../components/NaviBar";
import geoData from "../data/sports_data.json";

mapboxgl.accessToken = "access token"; // Add your mapbox access token here


const MapBoxSearch = () => {
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const [instructions, setInstructions] = useState([
        "Please select a destination",
    ]);
    const [duration, setDuration] = useState(12);

    const start = [103.68163638786746, 1.3462156563070138];

    useEffect(() => {
        // map initialization
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

        // add geocoder: COMMENT THIS LINE FOR SEEING the code
        //---------------------------------------------
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                color: "orange",
            },
            placeholder: "Search for locations",
        });
        mapRef.current.addControl(geocoder, "top-left");
        geocoder.on("result", (e) => {
            const { center } = e.result;
            mapRef.current.flyTo({
                center: center,
                essential: true,
                zoom: 14,
            });
        });
        // ---------------------------------------------

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
                    "fill-color": "#FF69B4",
                    "fill-opacity": 0.8,
                },
                source: {
                    type: "geojson",
                    data: geoData,
                },
            });

            // Add a layer for the start point
            mapRef.current.addLayer({
                id: "point",
                type: "circle",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: "Point",
                                    coordinates: start,
                                },
                            },
                        ],
                    },
                },
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#3887be",
                },
            });

            mapRef.current.on("mouseover", "locations", (e) => {
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

        mapRef.current.on("click", (event) => {
            const coords = Object.keys(event.lngLat).map(
                (key) => event.lngLat[key]
            );
            const end = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: coords,
                        },
                    },
                ],
            };
            if (mapRef.current.getLayer("end")) {
                mapRef.current.getSource("end").setData(end);
            } else {
                mapRef.current.addLayer({
                    id: "end",
                    type: "circle",
                    source: {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "Point",
                                        coordinates: coords,
                                    },
                                },
                            ],
                        },
                    },
                    paint: {
                        "circle-radius": 10,
                        "circle-color": "#f30",
                    },
                });
            }
            getRoute(coords);
        });

        return () => {
            mapRef.current.remove();
        };
    }, []);

    // route request function
    async function getRoute(end) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: "GET" }
        );
        const json = await query.json();
        const data = json.routes[0];
        const steps = data.legs[0].steps;
        let currentInstructions = [];
        for (const step of steps) {
            currentInstructions.push(step.maneuver.instruction);
        }
        setInstructions(currentInstructions);
        setDuration(data.duration);
        // let tripInstructions = [];
        // for (const step of steps) {
        //     tripInstructions += `<li>${step.maneuver.instruction}</li>`;
        // }
        // instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        //     data.duration / 60
        // )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
        const route = data.geometry.coordinates;
        const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: route,
            },
        };
        // if the route already exists on the map, we'll reset it using setData
        if (mapRef.current.getSource("route")) {
            mapRef.current.getSource("route").setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            mapRef.current.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: geojson,
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75,
                },
            });
        }
        // add turn instructions here at the end
    }

    return (
        <div id="page-container">
            <NaviBar />
            <div className="sidebar">
                <div className="heading">
                    <h1>🚲 Where you want to go 🚲</h1>
                </div>
                <div className="instructions">
                    <p>
                        {duration && (
                            <strong>
                                Trip duration: {Math.floor(duration / 60)} min
                                🚴{" "}
                            </strong>
                        )}
                    </p>
                    <ol>
                        {instructions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div id="map-container" ref={mapContainerRef}></div>
        </div>
    );
};

export default MapBoxSearch;
