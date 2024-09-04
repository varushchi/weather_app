import React, { useState, useEffect } from 'react'
import './Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import MyMarker from './MyMarker';

function Map() {

  interface GetUserLocation{
    as?: string
    city?: string
    country?: string
    countryCode?: string
    isp?: string
    lat: number
    lon: number
    org?: string
    query?: string
    region?: string
    regionName?: string
    status?: string
    timezone?: string
    zip?:string
  }

  const [userLocation, setUserLocation] = useState<undefined | GetUserLocation>()

  useEffect(() => {
    async function getLocation() {
      const res = await axios.get("http://ip-api.com/json");
      if (res.status === 200)
        setUserLocation(res.data)
      else
        setUserLocation({lat: 50, lon: 0})
    }
    getLocation();
  }, []);

  console.log(userLocation?.lat, userLocation?.lon)

  return (
    <div className='Map'>
      {
        userLocation && 
        <MapContainer center={[userLocation.lat, userLocation.lon]} zoom={7} scrollWheelZoom={true} style={{ height: "100%", minHeight: "100px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarker center = {{lat: userLocation.lat, lng: userLocation.lon}}/>
        </MapContainer>
      }
    </div>
  )
}

export default Map
