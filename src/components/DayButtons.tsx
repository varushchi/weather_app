import React, { useState } from 'react'
import './DayButtons.css'
import HourWeather from './HourWeather'
import cloudy from '../svgs/partially cloudy.svg'

interface Props{
  Temp: number[][]
  Wind: number[][]
  Rain: number[][]
  maxTemp: string[]
  minTemp: string[]
}

export default function DayButtons(props: Props) {

  const [selectDay, setSelectDay] = useState([
    false, false, false, false, false, false, false,
  ])
  
  function handleClick(e: any)
  {
    setSelectDay(() => {
      const day = Number(e.target.className)
      return(
        selectDay.map((elem, index) => {
          return(
            index === day ? !selectDay[day] : false
          )
        })
      )
    })
  }


  const currentDate = new Date()
  const dayButtons = [
    <div key={currentDate.toLocaleDateString()} className='DayButton'>
      <button className='0' onClick={(e) => handleClick(e)}>
          <span className='0'>
            {currentDate.toLocaleDateString().split('.').slice(0,2).join('.')} (Today)
          </span>
          <img  src={cloudy} className='0'/>
          <span className='0'>
            {props.maxTemp[0]}°C/{props.minTemp[0]}°C
          </span>
      </button>
      {selectDay[0] && <HourWeather Temp={props.Temp[0]} Wind = {props.Wind[0]} Rain = {props.Rain[0]}/>}
    </div>
    ]
  for (let i = 0; i < 6; i++)
  {
    currentDate.setDate(currentDate.getDate() + 1)
    dayButtons.push(
      <div key={currentDate.toLocaleDateString()} className='DayButton'>
        <button className={`${i+1}`} onClick={(e) => handleClick(e)}>
          <span className={`${i+1}`}>
            {currentDate.toLocaleDateString().split('.').slice(0,2).join('.')}
          </span>
          <img  src={cloudy} className={`${i+1}`}/>
          <span className={`${i+1}`}>
            {props.maxTemp[i+1]}°C/{props.minTemp[i+1]}°C
          </span>
        </button>
        {selectDay[i+1] && <HourWeather Temp={props.Temp[i+1]} Wind = {props.Wind[i+1]} Rain = {props.Rain[i+1]}/>}
      </div>
    )
  }

  return (
    <div className='DayButtons'>{dayButtons}</div>
  )
}
