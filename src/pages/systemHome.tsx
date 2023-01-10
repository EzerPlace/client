import { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api';
import { Nav } from '../components/Nav';
import { SystemHeader } from '../components/perSystem/systemHeader';
import { Map } from '../components/perSystem/map';
import { Box } from '@mui/material';

export const SystemHome = () => {
  const [center, setCenter] = useState<{ lat: number, lng: number }>({
    lat: 31.75,
    lng: 35.2
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  })

  if (!isLoaded) {
    return <div className='loader-container'>loading
      <span className='loadingAnim1'>.</span>
      <span className='loadingAnim2'>.</span>
      <span className='loadingAnim3'>.</span>
    </div>
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

