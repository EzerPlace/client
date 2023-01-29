import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { AddMarker } from '../markers/addMarker';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer, MarkerClustererProps } from '@react-google-maps/api';
import AutoComplete from './autoComplete';
import markerStore from '../../store/MarkerStore';
import { toJS } from 'mobx';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface LatLngDuration {
  latLng: LatLngLiteral,
  duration: { value: number, text: string },
}

export const Map = () => {
  const [directions, setDirections] = useState<DirectionsResult | any>();
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(() => ({ disableDefaultUI: true, clickableIcons: false, }), []);
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);
  const [isHovering3Place, setIsHovering3Place] = useState(false);
  const [openAddMarker, setOpenAddMarker] = useState(false);
  const [nearLocation, setNearLocation] = useState(false);
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const houses: LatLngLiteral[] = [];
  // const nearbyLocations: LatLngLiteral[] = [{ lat: 31.7, lng: 35.167252 }];
  const nearbyLocations: LatLngDuration[] = [];
  // const markers: google.maps.Marker[] = [];
  // const map: google.maps.Map;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOffice({ lat: position.coords.latitude, lng: position.coords.longitude });
    })
  }, []);

  // useEffect(() => {
  //   mapRef.current?.render();
  // }, [nearLocation, office]);

  // toJS(markerStore.markers).map(m => markers.push(new Marker(opts: { lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng })));
  // toJS(markerStore.markers).map(m => markers.push(new Marker(opts: { lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng }));
  toJS(markerStore.markers).map(m => houses.push({ lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng }));

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    setDirections(office);
    service.route(
      {
        origin: office,
        destination: house,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK' && response) {
          setDirections(response);
        }
      }
    );
  }

  const fetchDistanceMatrixService = () => {
    debugger
    if (!office || houses.length <= 3) return;
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [office],
      destinations: [...houses],
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK' && response) {
        NearbyLocations(response.rows[0].elements);
        console.log(nearbyLocations);
        // houses.forEach((house: LatLngLiteral) => {
        //   // house.
        // });
        setNearLocation(true);
      }
    });
  }

  const NearbyLocations = (elements: google.maps.DistanceMatrixResponseElement[]) => {
    nearbyLocations.length = 0;
    const nearLocation: LatLngDuration = { latLng: houses[0], duration: { text: '', value: Number.MAX_VALUE } };
    nearbyLocations.push(nearLocation);
    nearbyLocations.push(nearLocation);
    nearbyLocations.push(nearLocation);

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].distance.value < nearbyLocations[0].duration.value) {
        nearbyLocations[2] = nearbyLocations[1];
        nearbyLocations[1] = nearbyLocations[0];
        nearbyLocations[0] = { latLng: houses[i], duration: elements[i].distance };
      }
      else if (elements[i].distance.value < nearbyLocations[1].duration.value) {
        nearbyLocations[2] = nearbyLocations[1];
        nearbyLocations[1] = { latLng: houses[i], duration: elements[i].distance };
      }
      else if (elements[i].distance.value < nearbyLocations[2].duration.value) {
        nearbyLocations[2] = { latLng: houses[i], duration: elements[i].distance };
      }
    };
  }

  return (
    <div className='container'>
      <Box sx={{ width: '20%', direction: 'rtl' }}>
        <AutoComplete helperText='Search for another starting location' setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position)
        }} />
      </Box>

      <Box onMouseOver={() => setIsHoveringAdd(true)} onMouseOut={() => setIsHoveringAdd(false)}
        sx={{ zIndex: '1', position: 'absolute', bottom: '100px', right: '60px', display: 'flex', marginBottom: '0%' }}>
        <Button variant="outlined" onClick={() => setOpenAddMarker(true)}
          sx={{ marginTop: '30px', marginLeft: '70px' }}>
          <AddLocationAltIcon />
          {isHoveringAdd && 'add marker'}
        </Button>
      </Box>
      {openAddMarker && <AddMarker setOpenAdd={setOpenAddMarker} />}

      <Box onMouseOver={() => setIsHovering3Place(true)} onMouseOut={() => setIsHovering3Place(false)}
        sx={{ zIndex: '1', position: 'absolute', bottom: '50px', right: '60px', display: 'flex', marginBottom: '0%' }}>
        <Button variant="outlined" onClick={() => {
          debugger
          if (!nearLocation)
            fetchDistanceMatrixService();
          setNearLocation(!nearLocation);
        }}
          sx={{ marginTop: '30px', marginLeft: '70px' }}>
          {!nearLocation ?
            <ShareLocationIcon sx={{ marginLeft: '3px' }} /> :
            <ModeOfTravelIcon />
          }
          {isHovering3Place && (nearLocation ? 'all places' : 'nearby places')}

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
              {/* {!nearLocation && */}
              <MarkerClusterer>
                {(clusterer: any | MarkerClustererProps | Readonly<MarkerClustererProps>): any =>
                (!nearLocation ?
                  houses.map((house: LatLngLiteral, index: number) => (
                    <Marker
                      key={index}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  )) :
                  nearbyLocations.map((house: LatLngDuration, index: number) => (
                    <Marker
                      key={index}
                      position={house.latLng}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house.latLng);
                      }}
                    />
                  ))
                )
                }
              </MarkerClusterer>
              <Circle center={office} radius={1500}
                options={{ fillColor: 'green', fillOpacity: 0.1, strokeColor: 'green' }} />
              <Circle center={office} radius={7000}
                options={{ fillColor: 'orange', fillOpacity: 0.1, strokeColor: 'orange' }} />
              <Circle center={office} radius={15000}
                options={{ fillColor: 'red', fillOpacity: 0.1, strokeColor: 'red' }} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>

  )

};

