import React from 'react'

interface Props{
  key : string
  time: string
  temperature_2m: number
  wind_speed_10m: number
  rain: number
}

export default function HourWeather(props: Props) {
  return (
    <div className='HourWeather'>
      <ul>
        <li>
          Time: {props.time}
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
