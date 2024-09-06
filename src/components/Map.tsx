import React, { useState } from 'react'
import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import MyMarker from './MyMarker';

interface Props{
  center:{
    lat: number
    lng: number
  }
  handlePosition: (position: {lat: number, lng: number}) => void
}

function Map({handlePosition, center}: Props){

  const [position, setPosition] = useState<{lat: number, lng: number}>(center)

  return (
    <div className='Map'>
        <MapContainer center={position} zoom={7} scrollWheelZoom={true} style={{ height: "100%", minHeight: "100px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <MyMarker center = {position} handleDrag = {(position: {lat: number, lng: number}) => {
              setPosition({lat: Number(position.lat.toFixed(3)), lng: Number(position.lng.toFixed(3))})
              handlePosition(position)
            }}/>
          
        </MapContainer>
      <div className='position-div'>
        {position.lat.toFixed(3)}   {position.lng.toFixed(3)}
      </div>
    </div>
  )
}

export default Map
