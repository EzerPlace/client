import { useMemo, useState, useCallback, useRef, useEffect, Key } from 'react';
import { Box, Button } from '@mui/material';
import { AddMarker } from '../markers/addMarker';
import RoomIcon from '@mui/icons-material/Room';
import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer, MarkerClustererProps } from '@react-google-maps/api';
import AutoComplete from './autoComplete';
import markerStore from '../../store/MarkerStore';
import { toJS } from 'mobx';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export const Map = () => {
  const [directions, setDirections] = useState<DirectionsResult | any>();
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(() => ({ disableDefaultUI: true, clickableIcons: false, }), []);
  const [isHovering, setIsHovering] = useState(false);
  const [openAddMarker, setOpenAddMarker] = useState(false);
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const houses: LatLngLiteral[] = [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOffice({ lat: position.coords.latitude, lng: position.coords.longitude });
    })
  }, []);

  toJS(markerStore.markers).map(m => houses.push({ lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng }));

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: office,
        destination: house,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        console.log(result)
        if (status === 'OK' && result) {
          setDirections(result)
        }
      }
    )
  }

  return (
    <div className='container'>
      <Box sx={{ width: '20%', direction: 'rtl' }}>
        <AutoComplete helperText='Search for another starting location' setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position)
        }} />
      </Box>

      <Box onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}
        sx={{ zIndex: '1', position: 'absolute', bottom: '50px', right: '60px', width: '100%', display: 'flex', marginBottom: '0%' }}>
        <Button variant="outlined" onClick={() => setOpenAddMarker(true)}
          sx={{ marginTop: '30px', marginLeft: '70px' }}>
          <RoomIcon />
          {isHovering && 'add marker'}
        </Button>
      </Box>
      {openAddMarker && <AddMarker setOpenAdd={setOpenAddMarker} />}

      <div className='map' >
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
              {houses.length > 0 &&
                <MarkerClusterer>
                  {(clusterer: any | MarkerClustererProps | Readonly<MarkerClustererProps>): any =>
                    houses.map((house: any, index) => (
                      <Marker
                        key={index}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(house);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
              }
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

