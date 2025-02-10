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
 
import CardContent from '@mui/material/CardContent'
 
import TextField from '@mui/material/TextField'
 
import Checkbox from '@mui/material/Checkbox'
 
import FormControlLabel from '@mui/material/FormControlLabel'
 
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'


 

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
   const [editData,setEditData] = useState([]);
   

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


  //   update form 


  //  handel modal
  const [openform, setOpenform] = React.useState(false);
  const handleCloseform = () => {
    setOpenform(false);
  };

  const handelEdit =async (id)=>{
    setOpenform(true);
   const response = await axios.get(`http://localhost:8000/ticket-show/${id}`)

   setEditData(response.data,id);
 
  }


   // State Management
   const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    ticketType: '',
    date: '',
    contactEmail: '',
    phone: '',
    agreeTerms: '',
    attachment: ''
  })

 

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (reload)
    // Create FormData object for file upload
    const id = e.target.id.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const priority = e.target.priority.value;
    const category = e.target.category.value;
    const ticketType = e.target.ticketType.value;
    const contactEmail = e.target.contactEmail.value;
    const phone = e.target.phone.value;
    const agreeTerms = e.target.agreeTerms.value;
    const attachment = e.target.attachment.value;
    const date = e.target.date.value;
     
   
    console.log()

    const data = {id,title,description,priority,category,ticketType,contactEmail,phone,agreeTerms,attachment,date};
 
    axios.put(`http://localhost:8000/ticket-update`,data)
    .then(response=>{

      if(response.status === 200)
      {
        setOpenform(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })


      }
       
    })


  };
  
 


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



{/* start update  modal */}
<React.Fragment>
{/* <Button variant="outlined" >
  Open alert dialog
</Button> */}
<Dialog
  open={openform}
  onClose={handleCloseform}
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

 

  <Card className='flex flex-col sm:w-[450px] shadow-lg'>
        <CardContent className='p-6 sm:p-12'>
          
          <Typography variant='h4' className='text-center mb-4'>Ticket Submission Form 🚀</Typography>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <TextField type='hidden' name='id'  value={editData.id} onChange={handleChange} />
            <TextField name='title' label='Title' fullWidth required defaultValue={editData.title} onChange={handleChange} />
            <TextField name='description' label='Description' fullWidth multiline rows={3} required defaultValue={editData.description} onChange={handleChange} />
            
            <TextField select name='priority' label='Priority' fullWidth required defaultValue={editData.priority} onChange={handleChange}>
              <MenuItem value='low'>Low</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='high'>High</MenuItem>
            </TextField>

            <TextField select name='category' label='Category' fullWidth required defaultValue={editData.category} onChange={handleChange}>
              <MenuItem value='bug'>Bug Report</MenuItem>
              <MenuItem value='feature'>Feature Request</MenuItem>
              <MenuItem value='support'>General Support</MenuItem>
            </TextField>

            <Typography>Ticket Type:</Typography>
            <RadioGroup row name='ticketType' defaultValue={editData.ticketType} onChange={handleChange}>
              <FormControlLabel value='bug' control={<Radio />} label='Bugs' />
              <FormControlLabel value='feature' control={<Radio />} label='Feature Request' />
              <FormControlLabel value='support' control={<Radio />} label='Support' />
            </RadioGroup>

            <TextField type='date' name='date' fullWidth required defaultValue={editData.date} onChange={handleChange} />

            <Button variant='outlined' component='label'>
              Upload Attachment
              <input type='file' hidden name='attachment' onChange={handleChange} />
            </Button>

            <TextField type='email' name='contactEmail'   fullWidth required value={editData.contactEmail} onChange={handleChange} />
            <TextField type='tel' name='phone' label='Phone Number' fullWidth required defaultValue={editData.phone} onChange={handleChange} />
            
            <FormControlLabel control={<Checkbox name='agreeTerms' checked={editData.agreeTerms} onChange={handleChange} />} label='I agree to the Privacy Policy & Terms' />

            <Button type='submit' variant='contained' fullWidth>Submit Ticket</Button>

      
          </form>
        </CardContent>
      </Card>
 
</DialogContent>
  <DialogActions>
    <Button onClick={handleCloseform}>Exit</Button>
    
  </DialogActions>
</Dialog>
</React.Fragment>

{/*  end model for update*/}

    </Card>



  )
}

export default Table
