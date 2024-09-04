import React, { useState, useEffect } from 'react'
import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import MyMarker from './MyMarker';

interface Props{
  userLocation: {
    lat: number
    lon: number
  }
  handlePosition: (position: {lat: number, lng: number}) => void
}

function Map({userLocation, handlePosition}: Props){

  const [position, setPosition] = useState<undefined | {lat: number, lng: number}>()

  return (
    <div className='Map'>
        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={7} scrollWheelZoom={true} style={{ height: "100%", minHeight: "100px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarker center = {{lat: userLocation.lat, lng: userLocation.lon}} handleDrag = {(position: {lat: number, lng: number}) => {
            setPosition({lat: Number(position.lat.toFixed(3)), lng: Number(position.lng.toFixed(3))})
            handlePosition(position)
          }}/>
        </MapContainer>
      <div className='position-div'>
        {position && position.lat}   {position && position.lng}
      </div>
    </div>
  )
}

export default Map
