import React from 'react'
import './HourWeather.css'
import { LineChart } from '@mui/x-charts'

interface Props{
  Temp: number[]
  Wind: number[]
  Rain: number[]
}

export default function HourWeather(props: Props) {

  return (
      <LineChart
        xAxis={[{data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}]}
        series={[
          {data: props.Temp},
          {data: props.Wind},
          {data: props.Rain}
        ]}
        width={500}
        height={300}
      />
  )
}
