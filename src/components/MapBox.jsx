import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap, LayerGroup, Tooltip, SVGOverlay, GeoJSON } from 'react-leaflet'

import "../styles/MapBox.scss"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import 'leaflet-arrowheads'

const points = {
  "BUKOV": {
    latitude: 47.951667,
    longitude: 25.958333,
  },
  "OTRAK": {
    latitude: 48.948889,
    longitude: 26.686111,
  },
  "SORON": {
    latitude: 49.761667,
    longitude: 27.85,
  },
  "UKLI": {
    latitude: 48.884167,
    longitude: 24.686111,
  },
  "IVF": {
    latitude: 48.884167,
    longitude: 24.691389,
  },
  "VI": {
    latitude: 48.940833,
    longitude: 23.044444,
  },
  "LADOB": {
    latitude: 48.950278,
    longitude: 22.431944,
  },
  "GEMTO": {
    latitude: 48.133333,
    longitude: 22.594444,
  },
  "RULUT": {
    latitude: 48.648333,
    longitude: 23.638889,
  },
  "SOLNU": {
    latitude: 49.296667,
    longitude: 25.398333,
  },
  "TETNA": {
    latitude: 49.83333333,
    longitude: 26.41666667,
  },
  "PEVOT": {
    latitude: 50.181944,
    longitude: 27.043889,
  },
  "TADUN": {
    latitude: 51.90138889,
    longitude: 24.68805556,
  },
  "VABOD": {
    latitude: 50.75833333,
    longitude: 24.795,
  },
  "TOVNI": {
    latitude: 49.5375,
    longitude: 24.66916667,
  },
  "RUMUK": {
    latitude: 48.02666667,
    longitude: 23.34333333,
  },
  "DORER": {
    latitude: 50.46583333,
    longitude: 27.20777778,
  },
  "OSGAS": {
    latitude: 50.13333333,
    longitude: 25.5,
  },
  "KOVUS": {
    latitude: 50.14222222,
    longitude: 24.24138889,
  },
  "LIV": {
    latitude: 49.81194444,
    longitude: 23.95138889,
  },
  "UKLL": {
    latitude: 49.8125,
    longitude: 23.956111,
  },
  "LONLA": {
    latitude: 48.34,
    longitude: 22.31972222,
  },
  "TAKON": {
    latitude: 48.53666667,
    longitude: 23.18833333,
  },
  "GOTRA": {
    latitude: 48.91333333,
    longitude: 25.59833333,
  },
  "TAKET": {
    latitude: 48.97,
    longitude: 27.84166667,
  },
  "UNDOL": {
    latitude: 48.45222222,
    longitude: 27.72166667,
  },
  "POBED": {
    latitude: 48.72055556,
    longitude: 25.45722222,
  },
  "PIGUM": {
    latitude: 49.26472222,
    longitude: 24.01166667,
  },
  "KOKUP": {
    latitude: 49.52833333,
    longitude: 23.655,
  },
  "DIBED": {
    latitude: 49.88833333,
    longitude: 23.05833333,
  },
  "MALBE": {
    latitude: 48.82388889,
    longitude: 22.375,
  },
  "LOPNU": {
    latitude: 49.07416667,
    longitude: 26.68138889,
  },
  "SITBA": {
    latitude: 49.39083333,
    longitude: 27.84694444,
  },
  "EROMO": {
    latitude: 47.95361111,
    longitude: 23.94638889,
  },
}

const routes = [
  ["BUKOV", "OTRAK", "SORON"],
  ["UKLI", "IVF", "VI", "LADOB"],
  ["GEMTO", "RULUT", "SOLNU", "TETNA", "PEVOT"],
  ["TADUN", "VABOD", "TOVNI", "RULUT", "RUMUK"],
  ["DORER", "OSGAS", "KOVUS", "LIV", "UKLL"],
  ["LONLA", "TAKON", "RULUT", "IVF", "GOTRA", "OTRAK", "TAKET"],
  ["UNDOL", "POBED", "IVF", "PIGUM", "KOKUP", "DIBED"],
  ["MALBE", "RULUT", "POBED", "LOPNU", "SITBA"],
  ["EROMO", "RULUT", "KOKUP", "LIV"],
  ["RUMUK", "VI", "DIBED"]
]

const routesName = [
  "D-IABC",
  "PH-BDJ",
  "EC-JDT",
  "UR-16382",
  "UR-RTE",
  "UK-35262",
  "5B-TRE",
  "F-FZDA",
  "UR-TQQ",
  "SP-AGA"
]

const MapBox = () => {
  const limeOptions = { color: 'yellow' }
  const redOptions = { color: 'blue' }
  const greenOptions = {color: "red"}

  const drawRoute = (route, routeName, mainFlag) => {

    const coordinates = []
    const multiLine = [];

    for (let i = 0; i < route.length; i++) {
      coordinates.push([points[route[i]].longitude, points[route[i]].latitude])
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
        [points[route[i]].latitude, points[route[i]].longitude],
        [points[route[i + 1]].latitude, points[route[i + 1]].longitude]
      ])
    }

    return (
      <LayerGroup>
        {route.map(point => (
          <CircleMarker center={[points[point].latitude, points[point].longitude]} pathOptions={limeOptions} radius={2} >
            <Tooltip direction="left" sticky>{point}</Tooltip>
          </CircleMarker>
        ))}
        
        <GeoJSON style={mainFlag ? {color: "green"} : null}  data={GeoJson} arrowheads={{size: "10px"}} >
          <Tooltip sticky>{routeName}</Tooltip>
        </GeoJSON>

        

      </LayerGroup>
    )

  }

  return (
    <MapContainer id="map" className='h-[40rem] w-full border border-slate-400 rounded z-0' center={[49.84032239009007, 24.01840394328422]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {routes.map((route, i) => {
        const mainFlag = routesName[i] === "UR-RTE"? true : false
        return drawRoute(route, routesName[i], mainFlag)
      })}



    </MapContainer>
  )

}

export { MapBox }
