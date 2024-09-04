import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Map from './Map';

export default function Weather() {

  interface WeatherData{
    current: {
      interval?: number
      temperature_2m: number
      time?: string
    }
    current_units: {
      interval?: string
      temperature_2m: string
      time?: string
    }
  }

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
  const [position, setPosition] = useState<undefined | {lat: number, lng: number}>()
  const [weather, setWeather] = useState<undefined | WeatherData>()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    async function getLocation() {
      const res = await axios.get("https://ip-api.com/json");
      if (res.status === 200){
        setUserLocation(res.data)
      }
      else
        setUserLocation({lat: 50, lon: 0})
    }
    getLocation();
  }, []);


  useEffect(() => {
    async function getWeather(){
      const lat = position ? position.lat : 50
      const lon = position ? position.lng : 0
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`)
      if (res.status === 200)
        setWeather(res.data)
      else if (res.status === 400)
        setWeather({current: {temperature_2m: 0}, current_units: {temperature_2m: '°C'}})
    }
    getWeather()
  },[position])


  return (
    <div>
      {`${weather?.current.temperature_2m} ${weather?.current_units.temperature_2m}`}
      <button onClick={() => setShowMap(!showMap)}>set location</button>
      {showMap && userLocation && <Map userLocation={{lat: userLocation.lat , lon: userLocation.lon}} handlePosition = {(position: {lat: number, lng: number}) => setPosition(position)}/>}
    </div>
  )
}
