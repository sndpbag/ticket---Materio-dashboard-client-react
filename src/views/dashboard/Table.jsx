// MUI Imports
import React from "react";
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button';

// modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


 

// Third-party Imports
import classnames from 'classnames'

// Components Imports
// import CustomAvatar from '@core/components/mui/Avatar'
import CustomAvatar from '../../core/components/mui/Avatar'

// Styles Imports
// import tableStyles from '../../core/styles/table.module.css'
import tableStyles from '../../core/styles/table.module.css'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider'
import Swal from "sweetalert2";
import { Grid2 } from "@mui/material";

// Vars
// const rowsData = [
//   {
//     avatarSrc: '/images/avatars/1.png',
//     name: 'Jordan Stevenson',
//     username: '@amiccoo',
//     email: 'Jacinthe_Blick@hotmail.com',
//     iconClass: 'text-primary',
//     roleIcon: 'ri-vip-crown-line',
//     role: 'Admin',
//     status: 'pending'
//   },
//   {
//     avatarSrc: '/images/avatars/2.png',
//     name: 'Richard Payne',
//     username: '@brossiter15',
//     email: 'Jaylon_Bartell3@gmail.com',
//     iconClass: 'text-warning',
//     roleIcon: 'ri-edit-box-line',
//     role: 'Editor',
//     status: 'active'
//   },
//   {
//     avatarSrc: '/images/avatars/3.png',
//     name: 'Jennifer Summers',
//     username: '@jsbemblinf',
//     email: 'Tristin_Johnson@gmail.com',
//     iconClass: 'text-error',
//     roleIcon: 'ri-computer-line',
//     role: 'Author',
//     status: 'active'
//   },
//   {
//     avatarSrc: '/images/avatars/4.png',
//     name: 'Mr. Justin Richardson',
//     username: '@justin45',
//     email: 'Toney21@yahoo.com',
//     iconClass: 'text-warning',
//     roleIcon: 'ri-edit-box-line',
//     role: 'Editor',
//     status: 'pending'
//   },
//   {
//     avatarSrc: '/images/avatars/5.png',
//     name: 'Nicholas Tanner',
//     username: '@tannernic',
//     email: 'Hunter_Kuhic68@hotmail.com',
//     iconClass: 'text-info',
//     roleIcon: 'ri-pie-chart-2-line',
//     role: 'Maintainer',
//     status: 'active'
//   },
//   {
//     avatarSrc: '/images/avatars/6.png',
//     name: 'Crystal Mays',
//     username: '@crystal99',
//     email: 'Norene_Bins@yahoo.com',
//     iconClass: 'text-warning',
//     roleIcon: 'ri-edit-box-line',
//     role: 'Editor',
//     status: 'pending'
//   },
//   {
//     avatarSrc: '/images/avatars/7.png',
//     name: 'Mary Garcia',
//     username: '@marygarcia4',
//     email: 'Emmitt.Walker14@hotmail.com',
//     iconClass: 'text-info',
//     roleIcon: 'ri-pie-chart-2-line',
//     role: 'Maintainer',
//     status: 'inactive'
//   },
//   {
//     avatarSrc: '/images/avatars/8.png',
//     name: 'Megan Roberts',
//     username: '@megan78',
//     email: 'Patrick.Howe73@gmail.com',
//     iconClass: 'text-success',
//     roleIcon: 'ri-user-3-line',
//     role: 'Subscriber',
//     status: 'active'
//   }
// ]




const Table = () => {


  
   const {user} = useContext(AuthContext);
   const [rowData, setRowData] = useState([]);
   const [showData,setShowData] = useState([]);

   const fetchTickets = async () => {
    if (!user?.email) return; // Prevent API call if user is not logged in

    try {
      const response = await axios.get(`http://localhost:8000/tickets/${user.email}`);
      setRowData(response.data); // Store data in state
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

   useEffect(() => {
   
 
     fetchTickets();
   }, [user,rowData]); // Runs when `user` changes

  //  console.log(rowData);

//  handel modal
   const [open, setOpen] = React.useState(false);
   const handleClose = () => {
     setOpen(false);
   };

   const handelEdit = (id)=>{
    alert(id)
   }


   const handeldeletet = (id)=>{
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axios.delete(`http://localhost:8000/ticket-delete/${id}`);

        if(res.status == 200)
        {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

          fetchTickets();
        }
       
       

   
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

    
 
   }

   const handelview =async (id)=>{

    const response = await axios.get(`http://localhost:8000/ticket-show/${id}`)
    // console.log(response.data);
    setShowData(response.data);
    setOpen(true);
   }

 


  return (
    <Card className=' '>
      
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>title</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    {/* <CustomAvatar src={row?.avatarSrc} size={34} /> */}
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.title}
                      </Typography>
                      <Typography variant='body2'>{row.username}</Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.contactEmail}</Typography>
                </td>
                <td className='!plb-1'>
                  <div className='flex gap-2'>
                    <i className={classnames(row.roleIcon, row.iconClass, 'text-[22px]')} />
                    <Typography color='text.primary'>{row.date}</Typography>
                  </div>
                </td>
                <td className='!pb-1'>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={row.status === 'pending' ? 'warning' : row.status === 'inactive' ? 'secondary' : 'success'}
                    label={row.status}
                    size='small'
                  />
                </td>

                <td colSpan={3}>
              
                  <Button variant="contained" size="small" onClick={()=>handelEdit(row?.id)} sx={{ marginRight: 2 }} >Edit</Button>
                  <Button variant="outlined"   onClick={()=>handeldeletet(row?.id)} sx={{ marginRight: 2 }} >Delete</Button>
                  <Button variant="contained"   onClick={()=>handelview(row?.id)} sx={{ marginRight: 2 }}>view</Button>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


{/* start view modal */}
      <React.Fragment>
{/* <Button variant="outlined" >
  Open alert dialog
</Button> */}
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {showData.title}
  </DialogTitle>
  {/* <DialogContent>
    <DialogContentText id="alert-dialog-description">
    {showData.description}
    </DialogContentText>
  </DialogContent> */}
  <DialogContent dividers>
  <DialogTitle>
    <Typography variant="h5" fontWeight="bold" color="primary">
      {showData.title}
    </Typography>
  </DialogTitle>

  <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
    {showData.description}
  </DialogContentText>

  <Grid2 container spacing={2}>
    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Category:</Typography>
      <Typography color="text.secondary">{showData.category}</Typography>
    </Grid2>

    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Priority:</Typography>
      <Chip label={showData.priority} color={showData.priority === "high" ? "error" : "warning"} />
    </Grid2>

    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Date:</Typography>
      <Typography color="text.secondary">{showData.date}</Typography>
    </Grid2>

    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Ticket ID:</Typography>
      <Typography color="text.secondary">{showData.id}</Typography>
    </Grid2>

    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
      <Typography color="text.secondary">{showData.contactEmail}</Typography>
    </Grid2>

    <Grid2 item xs={6}>
      <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
      <Typography color="text.secondary">{showData.phone}</Typography>
    </Grid2>
  </Grid2>
</DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Exit</Button>
    
  </DialogActions>
</Dialog>
</React.Fragment>

{/*  end model for view */}

    </Card>



  )
}

export default Table
