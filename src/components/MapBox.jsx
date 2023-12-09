import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

import  "../styles/MapBox.scss"
import { useCallback, useEffect, useMemo, useState } from 'react'

const MapBox = () => {
  const [map, setMap] = useState(null)

  function DisplayPosition({ map }) {
    const [position, setPosition] = useState(() => map.getCenter())
  
    const onClick = useCallback(() => {
      map.setView(center, zoom)
    }, [map])
  
    const onMove = useCallback(() => {
      setPosition(map.getCenter())
    }, [map])
  
    useEffect(() => {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }, [map, onMove])

    
  
    return (
      <p>
        atitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
        <button onClick={onClick}>reset</button>
      </p>
    )
  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        id="map" className='h-[40rem] w-full border border-slate-400 rounded z-0'
        center={[49.84032239009007, 24.01840394328422]}
        zoom={10}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[49.84032239009007, 24.01840394328422]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
        </Marker>
      </MapContainer>
    ),
    [],
  )

    const polyline = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
      ]
      
      const multiPolyline = [
        [
          [51.5, -0.1],
          [51.5, -0.12],
          [51.52, -0.12],
        ],
        [
          [51.5, -0.05],
          [51.5, -0.06],
          [51.52, -0.06],
        ],
      ]
    const limeOptions = { color: 'lime' }
    const redOptions = { color: 'red' }
    /*
    return (
        <MapContainer id="map" className='h-full border border-slate-400 rounded'  center={[50.2041, 30.5336]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[50.27, 30.31]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            <CircleMarker center={[50.27, 30.31]} pathOptions={redOptions} radius={20}>
                <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>

            <Polyline pathOptions={limeOptions} positions={polyline} />
            <Polyline pathOptions={limeOptions} positions={multiPolyline} />
        </MapContainer>
    )*/

    return (
      <div>
        {false ? <DisplayPosition map={map} /> : null}
        {displayMap}
      </div>
    )
}

export {MapBox}
