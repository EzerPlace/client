/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditSystem } from './editSystem';
import { AddSystem } from './addSystem';
import { System } from '../utils/System';
import { auth } from '../config/firebase';
import systemStore from '../store/SystemStore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import '../style/ShowAllSystems.css';

import { SendGrid } from './sendGrid';

const ShowAllSystems = () => {
  const maxOfSystems: number = 4;
  const [systemIdTOEdit, setSystemIdTOEdit] = useState('1');
  const [systems, setSystems] = useState<System[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [allSystems, setAllSystems] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        allSystems ?
          await systemStore.getAllSystems() :
          await systemStore.getSystemsOfAdmin()
      } catch {
        navigate('/errorPage');
      }

      setSystems(systemStore.systems);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAdd, openEdit, allSystems]);

  const handleClickOpen = () => {
    if (!auth.currentUser)
      swal("You cannot add a new system", "You need to identify yourself")
    if (systems.length === maxOfSystems)
      swal("You cannot add a new system", "You have reached the maximum possible amount of systems")
    else setOpenAdd(true);
  };

  const deleteSystem = (id: any) => {
    const fetch = async () => {
      try {
        const willDelete = await swal({
          title: "Are you sure?",
          text: "You will not be able to recover this system!",
          buttons: ["cancel", "ok"],
        });
        if (willDelete) {
          await systemStore.removeSystem(id);
          swal("Deleted!", "Your system has been deleted.", "success");
        };
      } catch (error: any) {
        alert(error.message);
      }
    };
    fetch();
  }

  return (
    <>
      <SendGrid />      
      <Box sx={{ width: '100%' }} textAlign={'center'}>
        {
        auth.currentUser &&
        <Typography variant="h4" component="h2" >
        
        <Box sx={{ width: '100%', display: 'flex', marginBottom: '0%' }}>
          <Button variant="outlined" onClick={() => setAllSystems(!allSystems)}
            sx={{ marginTop: '30px', marginLeft: 'calc(50vw - 90px)' }}>
            {allSystems ? 'My Systems' : 'All Systems'}
          </Button>
        </Box>
      
        </Typography>}
        {systems && systems.map((systemCard: System, index: number) =>
          <Card
            key={index}
            sx={{ width: '210px', float: 'left', marginLeft: '5%', marginTop: '5%', }}
          >
            <CardMedia
              className='cardPointer'
              onClick={() => navigate(`/${systemCard.urlName}`)}
              width="350px"
              component="img"
              height="140"
              image={systemCard.urlImg}
              alt="green iguana" />
            <CardContent
              className='cardPointer'
              onClick={() => navigate(`/${systemCard.urlName}`)}
            >
              <Typography gutterBottom variant="h5" component="div">
                {systemCard.objectName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {systemCard.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" onClick={() => {
                setSystemIdTOEdit(systemCard._id || '0');
                setOpenEdit(true);
              }}>edit</Button>
              <Button variant="contained" size="small" onClick={() => deleteSystem(systemCard._id)}>delete</Button>
            </CardActions>
          </Card>
        )}
      </Box>


      <Box sx={{ width: '100%', display: 'flex', marginBottom: '0%' }}>
        <Button variant="outlined" onClick={handleClickOpen}
          sx={{ marginTop: '30px', marginLeft: 'calc(50vw - 90px)' }}>
          Add a new system
        </Button>
      </Box>

      {openEdit && <EditSystem systemUid={systemIdTOEdit} setOpenEdit={setOpenEdit} />}

      {openAdd && <AddSystem setOpenAdd={setOpenAdd} />}
    </>
  )

}
export default ShowAllSystems;