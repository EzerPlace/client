// import { useState } from 'react'
// import { useLoadScript } from '@react-google-maps/api';
// import { Nav } from '../components/Nav';
// import { SystemHeader } from '../components/perSystem/systemHeader';
// import { Map } from '../components/perSystem/map';
// import { Box } from '@mui/material';

// export const SystemHome = () => {
//   const [center, setCenter] = useState<{ lat: number, lng: number }>({
//     lat: 31.75,
//     lng: 35.2
//   });


//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//     libraries: ['places']
//   })

//   if (!isLoaded) {
//     return <div className='loader-container'>loading
//       <span className='loadingAnim1'>.</span>
//       <span className='loadingAnim2'>.</span>
//       <span className='loadingAnim3'>.</span>
//     </div>
//   };


//   return (
//     <>
//       <Nav />

//       {center &&
//         <>
//           <Box sx={{ textAlign: 'center' }}>
//             <SystemHeader />
//           </Box>
//           <Box >
//             <Box >
//               <Map />
//             </Box>
//             {/* <Box sx={{ width: '20%', direction: 'rtl' }}>
//           <AutoComplete setCenter= {setCenter} />
//         </Box> */}
//           </Box>
//         </>
//       }

//     </>
//   )
// }



import React, { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api';
import { Nav } from '../components/Nav';
import { SystemHeader } from '../components/perSystem/systemHeader';
import { Map } from '../components/perSystem/map';
import { Box } from '@mui/material';
import { AutoComplete } from '../components/perSystem/autoComplete';

type LatLngLiteral = google.maps.LatLngLiteral;

export const SystemHome = () => {
  const [center, setCenter] = useState<LatLngLiteral>({
    lat: 31.75,
    lng: 35.2
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
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
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <SystemHeader />
          </Box>
          <Box sx={{ display: 'flex' }} >
            <Box sx={{ width: '80%', direction: 'rtl' }} >
              <Map  />
            </Box>
            <Box sx={{ width: '20%', direction: 'rtl' }}>
              <AutoComplete setCenter={setCenter} />
            </Box>
          </Box>
        </>
      }
    </>
  )
}

// center={center}
// import { useState } from 'react'
// import { useLoadScript } from '@react-google-maps/api';
// import { Nav } from '../components/Nav';
// import { SystemHeader } from '../components/perSystem/systemHeader';
// import { Map } from '../components/perSystem/map';
// import { Box } from '@mui/material';

// export const SystemHome = () => {
//   const [center, setCenter] = useState<{ lat: number, lng: number }>({
//     lat: 31.75,
//     lng: 35.2
//   });

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//     libraries: ['places']
//   })

//   if (!isLoaded) {
//     return <div className='loader-container'>loading
//       <span className='loadingAnim1'>.</span>
//       <span className='loadingAnim2'>.</span>
//       <span className='loadingAnim3'>.</span>
//     </div>
//   };


//   return (
//     <>
//       <Nav />
//       {center &&
//         <>
//           <Box sx={{ textAlign: 'center' }}>
//             <SystemHeader />
//           </Box>
//           <Box >
//             <Box >
//               <Map />
//             </Box>
//             {/* <Box sx={{ width: '20%', direction: 'rtl' }}>
//           <AutoComplete setCenter= {setCenter} />
//         </Box> */}
//           </Box>
//         </>
//       }
//     </>
//   )
// }

