

import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap, LayerGroup, Tooltip, SVGOverlay, GeoJSON } from 'react-leaflet'
import 'leaflet-arrowheads'
import AIR_DATA from "../libs/constants.js"

const ControlLayerMap = ({offHandle}) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      if(layer._leaflet_id != 25){
        console.log(layer)
        map.removeLayer(layer);
      }
    })
    offHandle()
  }, [])

  return null
}

const MapBox = ({ myFP, conflicts }) => {
  const [routes, setRoutes] = useState([])

  const [clearMapFlag, setClearMapFlag] = useState(false)

  const clearMapHandle = () => setClearMapFlag(true)

  const yellowOptions = { color: 'yellow' }

  useEffect(() => {
    const newRoutes = AIR_DATA.OTHERS_FP.map(r => {
      return {
        R: r.R,
        name: r.AI,
        main: false,
      }
    })

    setRoutes(newRoutes)
  }, [])

  useEffect(() => {
    if(routes.length && myFP){
      clearMapHandle();
      if(routes[routes.length-1].main){
        setRoutes(arr => {
          arr.pop();
          arr.push({
            R: myFP.R,
            name: myFP.AI,
            main: true,
          })
          return arr;
        })
      }else{
        setRoutes(arr => {
          arr.push({
            R: myFP.R,
            name: myFP.AI,
            main: true,
          })
          return arr;
        })
      }
    }
    
  }, [myFP])
  
  const drawRoute = (route, routeName, mainFlag) => {

    const coordinates = []
    const multiLine = [];

    for (let i = 0; i < route.length; i++) {
      coordinates.push([AIR_DATA.COORDINATES_POINTS[route[i]].longitude, AIR_DATA.COORDINATES_POINTS[route[i]].latitude])
    }
    const GeoJson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": coordinates
          }
        }
      ]
    }


    for (let i = 0; i < route.length - 1; i++) {
      multiLine.push([
        [AIR_DATA.COORDINATES_POINTS[route[i]].latitude, AIR_DATA.COORDINATES_POINTS[route[i]].longitude],
        [AIR_DATA.COORDINATES_POINTS[route[i + 1]].latitude, AIR_DATA.COORDINATES_POINTS[route[i + 1]].longitude]
      ])
    }

    return (
      <LayerGroup>
        {route.map((point, i) => (
          <CircleMarker center={[AIR_DATA.COORDINATES_POINTS[point].latitude, AIR_DATA.COORDINATES_POINTS[point].longitude]} pathOptions={yellowOptions} radius={2} >
            <Tooltip direction="left" sticky>{point}</Tooltip>
          </CircleMarker>
        ))}

        <GeoJSON style={mainFlag ? { color: "green" } : null} data={GeoJson} arrowheads={{ size: "10px" }} >
          <Tooltip sticky>{routeName}</Tooltip>
        </GeoJSON>

      </LayerGroup>
    )
  }

  const drawConflictDot = (conflict) => {
    return (
      <LayerGroup>
          <CircleMarker center={[conflict.latitude, conflict.longitude]} pathOptions={{ color: 'red' }} radius={10} >
              <Tooltip direction="left" sticky>Conflict</Tooltip>
          </CircleMarker>
      </LayerGroup>
    )
  }

  return (
    <MapContainer
      id="map"
      className='h-[40rem] w-full border border-slate-400 rounded z-0'
      center={[49.84032239009007, 24.01840394328422]}
      zoom={10}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      {clearMapFlag ? 
        <ControlLayerMap offHandle={() => {setClearMapFlag(false)}} /> 
        : null
      }

      {!clearMapFlag && routes.length > 1 ? 
        routes.map(route => drawRoute(route.R, route.name, route.main)) : null
      }
      {conflicts.length && !clearMapFlag ? conflicts.map(conflict => drawConflictDot(conflict)) : null}
    </MapContainer>
  )

}

export { MapBox }
