import React from 'react'
import './HourWeather.css'

interface Props{
  key : string
  time: string
  temperature_2m: number
  wind_speed_10m: number
  rain: number
}

export default function HourWeather(props: Props) {

  const hour = props.time.split('-')[2].split('T')[1]

  return (
    <div className='HourWeather'>
      <ul>
        <li>
          Time: {hour[0] === '0' ? hour.slice(1) : hour}
        </li>
        <li>
          Temperature: {props.temperature_2m}°C
        </li>
        <li>
          Wind speed: {props.wind_speed_10m}km/h
        </li>
        <li>
          Rain: {props.rain}mm
        </li>
      </ul>
    </div>
  )
}
