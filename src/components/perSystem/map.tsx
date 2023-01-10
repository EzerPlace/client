import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  MarkerClustererProps,
} from '@react-google-maps/api';
import '../../style/map.css';
// import { TryTwoTone } from '@mui/icons-material';
// import PushPinIcon from '@mui/icons-material/PushPin';
import Places from './places'
// import cluster from 'cluster';
// import { color } from '@mui/system';
import { Distance } from './distance';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

// interface props {
//   center: { lat: number, lng: number };{ center }: props
// }

export const Map = () => {
  const [directions, setDirections] = useState<DirectionsResult | any>();
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 41, lng: -80 }), []);
  const options = useMemo<MapOptions>(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOffice({ lat: position.coords.latitude, lng: position.coords.longitude });
    })
  }, []);

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const houses = useMemo(() => generate(center), [center])

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
        }
      }
    )
  }
  
  return (
    <div className='container'>
      <div className='controls'>
        <h1> commute?</h1>
        <Places setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position)
        }} />
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      
      <div className='map'>
        <GoogleMap
          zoom={10}
          center={office}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2",
              strokeWeight: 5
            }
          }} />}
          {office && (
            <>
              <Marker
                position={office}
                icon={{ url: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png", scaledSize: new google.maps.Size(73, 70) }}
              />
              <MarkerClusterer>
                {(clusterer: any | MarkerClustererProps | Readonly<MarkerClustererProps>): any =>
                  houses.map((house: any) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle center={office} radius={1500}
                options={{ fillColor: 'green', fillOpacity: 0.1, strokeColor: 'green' }} />
              <Circle center={office} radius={3000}
                options={{ fillColor: 'orange', fillOpacity: 0.1, strokeColor: 'orange' }} />
              <Circle center={office} radius={4500}
                options={{ fillColor: 'red', fillOpacity: 0.1, strokeColor: 'red' }} />
            </>
          )}
        </GoogleMap>
      </div>

    </div>

  )

};

const generate = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];

  for (let i = 0; i < 8; i++) {
    const d = Math.random() < 0.5 ? -2 : 2;

    _houses.push({
      lat: position.lat + Math.random() / d,
      lng: position.lng + Math.random() / d,
    });
  }
  return _houses;
}

