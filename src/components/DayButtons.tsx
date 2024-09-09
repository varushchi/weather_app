import React, { useState } from 'react'
import './DayButtons.css'
import cloudy from '../svgs/partially cloudy.svg'

export default function DayButtons(props: {data:JSX.Element[], maxTemp: string[], minTemp: string[]}) {

  const dataForDays = [
    props.data.slice(0*24, 24*0 + 24),
    props.data.slice(1*24, 24*1 + 24),
    props.data.slice(2*24, 24*2 + 24),
    props.data.slice(3*24, 24*3 + 24),
    props.data.slice(4*24, 24*4 + 24),
    props.data.slice(5*24, 24*5 + 24),
    props.data.slice(6*24, 24*6 + 24)
  ]

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
      {selectDay[0] && dataForDays[0]}
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
        {selectDay[i+1] && dataForDays[i+1]}
      </div>
    
    )
  }

  return (
    <div className='DayButtons'>{dayButtons}</div>
  )
}
