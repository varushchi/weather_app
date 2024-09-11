import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Map from './Map';
import DayButtons from './DayButtons';
import './Weather.css'

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
    hourly_units?: {
      time: string
      temperature_2m: string
      precipitation_probability:string
      rain: string
      snowfall: string
      cloud_cover: string
      wind_speed_10m: string
    }
    hourly?:
    {
      time: [string]
      temperature_2m: [number]
      precipitation_probability: [number]
      rain: [number]
      snowfall: [number]
      cloud_cover: [number]
      wind_speed_10m: [number]
    }
  }

  interface GeoData{
    continent: string
    countryName: string
    city: string
  }

  const [position, setPosition] = useState<{lat: number, lng: number}>({lat: 55.751, lng: 37.617})
  const [weather, setWeather] = useState<undefined | WeatherData>()
  const [geoData, setGeoData] = useState<undefined | GeoData>()
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    async function getWeather(){
      const lat = position.lat
      const lng = position.lng
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&hourly=temperature_2m,precipitation_probability,rain,snowfall,cloud_cover,wind_speed_10m`)
      if (res.status === 200)
        setWeather(res.data)
      else if (res.status === 400)
        setWeather({current: {temperature_2m: 0}, current_units: {temperature_2m: '°C'}})
    }
    getWeather()

    async function getGeoData(){
      const lat = position ? position.lat : 50
      const lng = position ? position.lng : 0
      const res = await axios.get(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
      if (res.status === 200)
        setGeoData(res.data)
    }
    getGeoData()
  },[position])

  useEffect(() => {
    
  }, [position])

  const maxTemp: string[] = []
  const minTemp: string[] = []
  let tempTempratureArr: number[] = []
  let tempWindArr: number[] = []
  let tempRainArr: number[] = []
  const Temperature: number[][] = []
  const Wind: number[][] = []
  const Rain: number[][] = []
  if (weather && weather.hourly)
  {
    for (let i = 0; i < weather.hourly.time.length; i++){
      tempTempratureArr.push(weather.hourly.temperature_2m[i])
      tempWindArr.push(weather.hourly.wind_speed_10m[i])
      tempRainArr.push(weather.hourly.rain[i])
      if ((i + 1) % 24 === 0){
        maxTemp.push(Math.max.apply(null,tempTempratureArr).toFixed(0))
        minTemp.push(Math.min.apply(null,tempTempratureArr).toFixed(0))
        Temperature.push(tempTempratureArr)
        Wind.push(tempWindArr)
        Rain.push(tempRainArr)
        tempTempratureArr = []
        tempWindArr = []
        tempRainArr = []
      }
        
    }
  }

  return (
    <div className='Weather'>
      <header>
        {geoData && `Temperature in ${geoData.countryName}, ${geoData.city} is: `}
        {geoData?.city && weather && `${weather.current.temperature_2m}${weather.current_units.temperature_2m}`}
        <button className='map-button' onClick={() => setShowMap(!showMap)}>
          {showMap ? 'Hide map' : 'Set location'}
        </button>
      </header>
      
      {showMap && <Map center={position} handlePosition = {(position: {lat: number, lng: number}) => setPosition(position)}/>}
      {weather && <DayButtons Temp = {Temperature} Wind = {Wind} Rain = {Rain} maxTemp = {maxTemp} minTemp = {minTemp}/>}
    </div>
  )
}
