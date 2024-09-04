import React, { useEffect, useState } from 'react'
import axios from 'axios';

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

export default function Weather() {

  const [weather, setWeather] = useState<undefined | WeatherData>()

  useEffect(() => {
    async function getWeather(){
      const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&current=temperature_2m')
      if (res.status === 200)
        setWeather(res.data)
        
    }
    getWeather()
  },[])

  console.log(weather)

  return (
    <div>
      {`${weather?.current.temperature_2m} ${weather?.current_units.temperature_2m}`}
    </div>
  )
}
