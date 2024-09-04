import React, { useState, useRef, useMemo } from 'react'
import {Marker} from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


export default function MyMarker(props: {center: {lat: number, lng: number}, handleDrag: (position: {lat: number, lng: number}) => void}) {

  const [position, setPosition] = useState(props.center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current
        if (marker) {
          setPosition(marker.getLatLng())
          props.handleDrag(marker.getLatLng())
        }
      },
    }),
    [],
  )
  

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
    </Marker>
  )
}

