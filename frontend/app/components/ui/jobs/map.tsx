"use client";

import { PositionType } from "@/app/lib/types";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ position }: { position: LatLngExpression }) => {
  const icon = new Icon({
    iconUrl: "/marker-jobportal.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom
      attributionControl={false}
      className="block h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={icon}></Marker>
    </MapContainer>
  );
};

export default Map;
