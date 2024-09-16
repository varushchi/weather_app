import React, { useState } from 'react'
import './HourWeather.css'
import { LineChart } from '@mui/x-charts'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props{
  Temp: number[]
  Wind: number[]
  Rain: number[]
}

export default function HourWeather(props: Props) {

  const [dataForGraf, setDataForGraf] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setDataForGraf(event.target.value as string);
  }

  const selectData = (data: string) => {
    switch(data){
      case 'temp':
        return props.Temp
      case 'wind':
        return props.Wind
      case 'rain':
        return props.Rain
      default:
        return []
    }
  }

  const selectMetric = (data: string) => {
    switch(data){
      case 'temp':
        return '°C'
      case 'wind':
        return 'km/h'
      case 'rain':
        return 'mm'
      default:
        return ''
    }
  }

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="graf-label">select data to display</InputLabel>
          <Select
            labelId="graf-label"
            id="graf"
            value={dataForGraf}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'temp'}>Temp</MenuItem>
            <MenuItem value={'wind'}>Wind</MenuItem>
            <MenuItem value={'rain'}>Rain</MenuItem>
          </Select>
        </FormControl> 
      </Box>
      <LineChart
        xAxis={[{data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], label: 'h'}]}
        yAxis={[{label: selectMetric(dataForGraf)}]}
        series={[{data: selectData(dataForGraf)}]}
        width={400}
        height={300}
      />
    </div>
  )
}
