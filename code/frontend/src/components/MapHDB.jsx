import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import hdb from "../data/hdb.json";
import "./MapHDB.css";

const MapComponent = () => {
  console.log(hdb);
  return (
    <div>
      <div>A Map</div>
      <MapContainer center={[1.3521, 103.8198]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
