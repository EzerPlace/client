import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import markerStore from '../../store/MarkerStore';
import swal from 'sweetalert';
import AutoComplete from '../perSystem/autoComplete';
// import { useNavigate } from 'react-router-dom';
import systemStore from '../../store/SystemStore';

interface props {
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddMarker: React.FC<props> = ({ setOpenAdd }: props) => {

    const inputDescription = useRef<HTMLInputElement>();
    const inputLocation = useRef<HTMLInputElement>();
    const inputName = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();

    // const navigate = useNavigate();

    const [center, setCenter] = useState<{ lat: number, lng: number }>({
        lat: 31.75,
        lng: 35.2
    });

    const handleCloseAndSave = async () => {
        close();
        const markerToSave = {
            description: inputDescription.current?.value,
            location: center,
            name: inputName.current?.value,
            notes: inputNotes.current?.value,
            communicationDetails: {
                email: inputEmail.current?.value,
                phone: inputPhone.current?.value,
            }
        }

        try {
            await axios.post(`http://localhost:3333/marker`, markerToSave)
            swal({
                title: 'Saved!',
                text: 'your marker added ',
                icon: 'success',
                button: 'ok!',
            } as any);
        } catch (err) {
            console.log(err);
        }
    };

    const close = () => {
        // navigate(`/${systemStore.currentSystem?.urlName}`)
        setOpenAdd(false);
    }

    return (
        <Dialog
            open={true}
            onClose={close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {'Add your system details'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description' />
                    <TextField id='outlined-basic' inputRef={inputDescription} label='Description' variant='outlined' sx={{ margin: '3%' }} />
                    <AutoComplete helperText='Place' setCenter={setCenter} />
                    <TextField id='outlined-basic' inputRef={inputName} label='Name' variant='outlined' sx={{ margin: '3%' }} />
                    <TextField id='outlined-basic' inputRef={inputNotes} label='Notes' variant='outlined' sx={{ margin: '3%' }} />
                    <TextField id='outlined-basic' inputRef={inputEmail} label='Email system' variant='outlined' sx={{ margin: '3%' }} />
                    <TextField id='outlined-basic' inputRef={inputPhone} label='Phone system' variant='outlined' sx={{ margin: '3%' }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleCloseAndSave} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default observer(AddMarker);