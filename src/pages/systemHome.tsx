import React, { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api';
import { Nav } from '../components/Nav';
import { SystemHeader } from '../components/systemHeader';
import { Map } from '../components/map';
import { Box } from '@mui/material';
import { env } from 'process';
// import { AutoComplete } from './autoComplete';

export const SystemHome = () => {
  const [center, setCenter] = useState<{ lat: number, lng: number }>({
    lat: 31.75,
    lng: 35.2
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBhHuFEgM-VdB2zKR_jEhWO0LONQmYt-CY',
    libraries: ['places']
  })
  // useEffect(() => {
  //   const currentLocation = async () => {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //   } else {
  //     console.log("Not Available");
  //   }
  //   try{
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  //   });
  // }
  //  catch(err :any) {
  //     console.error("Error Code = " + err.code + " - " + err.message);
  // }
  // }
  // currentLocation();
  //  },[])


  if (!isLoaded) {
    return <div>loading...</div>
  };


  return (
    <>
    <Nav />
      {center &&
        <>
          <Box sx={{ textAlign: 'center' }}>
            <SystemHeader />
          </Box>
          <Box >
            <Box >
              <Map />
            </Box>
            {/* <Box sx={{ width: '20%', direction: 'rtl' }}>
          <AutoComplete setCenter= {setCenter} />
        </Box> */}
          </Box>
        </>
      }
    </>
  )
}

