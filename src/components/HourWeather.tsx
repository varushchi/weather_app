import React from 'react'
import './HourWeather.css'
import { LineChart } from '@mui/x-charts'

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
      <LineChart
        xAxis={[{data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}]}
        series={[{data: [1,2,3,4,5,6,7,8,20,1,30]}]}
        width={500}
        height={300}
      />
    </div>
  )
}
