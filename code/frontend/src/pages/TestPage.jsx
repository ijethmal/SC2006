import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapHDB from "../components/MapHDB";

const TestPage = () => {
  console.log("Hehe");
  return (
    <div className="test-page">
      <MapHDB />
    </div>
  );
};

export default TestPage;
