
// import { useRef, useEffect } from 'react';

// interface props {
//     setCenter: React.Dispatch<React.SetStateAction<{lat: number, lng: number}>>;
// }

// export const AutoComplete = ( { setCenter }: props) => {

//     const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
//     const inputRef = useRef<any>();

//     const options = {
//         componentRestrictions: { country: 'ng' },
//         fields: ['address_components', 'geometry', 'icon', 'name'],
//         types: ['establishment']
//     };

//     useEffect(() => {
//         autoCompleteRef.current = new window.google.maps.places.Autocomplete(
//             inputRef.current,
//             // options
//         );

//         autoCompleteRef.current.addListener('place_changed', async function () {
//             const place = await autoCompleteRef.current?.getPlace();
//             const center = await place?.geometry?.viewport?.getCenter();
//             const lat = center?.lat() || 0;
//             const lng = center?.lng() || 0;
//             setCenter({ lat: lat, lng: lng });
//         });

//     }, []);

//     return (
//         <div>
//             <label>enter address :</label><br />
//             <input ref={inputRef} />
//         </div>
//     );
// };

import { FormControl, TextField, MenuItem } from '@mui/material';
import { GoogleMap } from '@react-google-maps/api';
import { observer } from 'mobx-react';
import { useRef, useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import markerStore from '../../store/MarkerStore';
import '../../style/map.css';
// import { Distance } from './distance';


// type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;

interface props {
    helperText: string;
    setCenter: React.Dispatch<React.SetStateAction<{
        lat: number;
        lng: number;
    }>>;
}

export const AutoComplete = ({ helperText, setCenter }: props) => {

    // const [office, setOffice] = useState<LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();
    // const [directions, setDirections] = useState<DirectionsResult | any>();
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();
    const inputRef = useRef<any>();
    const [position, setPosition] = useState<DirectionsResult | any>();

    useEffect(() => {
        if (mapRef.current?.panTo && position)
            mapRef.current?.panTo(markerStore.autoCompleteMarker)

    }, [position]);

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        markerStore.autoCompleteMarker.lat = lat;
        markerStore.autoCompleteMarker.lng = lng;
        setPosition({ lat: lat, lng: lng });
        setCenter(position);
    }



    // const fetchDirections=(house:LatLngLiteral)=>
    //   {
    //     if(!office) return;
    //     const service=new google.maps.DirectionsService();
    //     service.route(
    //       {
    //         origin:house,
    //         destination:office,
    //         travelMode:google.maps.TravelMode.DRIVING
    //       },
    //       (result,status)=>
    //       {
    //         if(status==='OK' &&result){
    //           setDirections(result)
    //         }
    //       }
    //     )
    //   }

    return (
        <>
            <FormControl fullWidth >
                <TextField
                    ref={inputRef}
                    value={value}
                    helperText={helperText}
                    onChange={(e) => { setValue(e.target.value) }}
                    disabled={!ready} />
                {status === 'OK' && data.map(({ place_id, description }) =>
                    <MenuItem key={place_id} onClick={() => { handleSelect(description) }}
                        value={description} >
                        {description}
                    </MenuItem>
                )}
            </FormControl>
        </>

    )
}
export default observer(AutoComplete)
