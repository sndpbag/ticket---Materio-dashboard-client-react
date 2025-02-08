// 'use client'

// // React Imports
// import { useState } from 'react'

// // Next Imports
// // import Link from 'next/link'
// import { Link } from 'react-router-dom'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
// import InputAdornment from '@mui/material/InputAdornment'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Divider from '@mui/material/Divider'

// // Component Imports
// // import Illustrations from '@components/Illustrations'
// // import Illustrations from '../components/Illustrations'
// // import Logo from '@components/layout/shared/Logo'
// import Logo from '../components/layout/shared/Logo'

// // Hook Imports
// // import { useImageVariant } from '@core/hooks/useImageVariant'
// // import { useImageVariant } from '../core/hooks/useImageVariant'


// const Register = ({ mode }) => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)

//   // Vars
//   // const darkImg = '/images/pages/auth-v1-mask-dark.png'
//   // const lightImg = '/images/pages/auth-v1-mask-light.png'

//   // Hooks
//   // const authBackground = useImageVariant(mode, lightImg, darkImg)
//   const handleClickShowPassword = () => setIsPasswordShown(show => !show)

//   return (
//     <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
//       <Card className='flex flex-col sm:is-[450px]'>
//         <CardContent className='p-6 sm:!p-12'>
//           <Link href='/' className='flex justify-center items-start mbe-6'>
//             <Logo />
//           </Link>
//           <Typography variant='h4'> Ticket Submission Form  🚀</Typography>
//           <div className='flex flex-col gap-5'>
//             {/* <Typography className='mbs-1'>Make your app management easy and fun!</Typography> */}
//             {/* <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-5'>
//               <TextField autoFocus fullWidth label='Username' />
//               <TextField fullWidth label='Email' />
          
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label={
//                   <>
//                     <span>I agree to </span>
//                     <Link className='text-primary' to='/' onClick={e => e.preventDefault()}>
//                       privacy policy & terms
//                     </Link>
//                   </>
//                 }
//               />
//               <Button fullWidth variant='contained' type='submit'>
//               Ticket Submission 

//               </Button>
//               <div className='flex justify-center items-center flex-wrap gap-2'>
//                 <Typography>Already have an account?</Typography>
//                 <Typography component={Link} href='/login' color='primary'>
//                   Sign in instead
//                 </Typography>
//               </div>
//               <Divider className='gap-3'>Or</Divider>
//               <div className='flex justify-center items-center gap-2'>
//                 <IconButton size='small' className='text-facebook'>
//                   <i className='ri-facebook-fill' />
//                 </IconButton>
//                 <IconButton size='small' className='text-twitter'>
//                   <i className='ri-twitter-fill' />
//                 </IconButton>
//                 <IconButton size='small' className='text-github'>
//                   <i className='ri-github-fill' />
//                 </IconButton>
//                 <IconButton size='small' className='text-googlePlus'>
//                   <i className='ri-google-fill' />
//                 </IconButton>
//               </div>
//             </form> */}

// <form noValidate autoComplete="off"  className="flex flex-col gap-5 p-5 bg-gray-100 rounded-lg shadow-lg max-w-xl mx-auto">
//       <Typography variant="h5" className="text-center">Submit a Ticket</Typography>

//       {/* Title */}
//       <TextField name="title" label="Title" fullWidth required value={formData.title} onChange={handleChange} />

//       {/* Description */}
//       <TextField name="description" label="Description" fullWidth multiline rows={3} required value={formData.description} onChange={handleChange} />

//       {/* Priority Dropdown */}
//       <TextField select name="priority" label="Priority" fullWidth required value={formData.priority} onChange={handleChange}>
//         <MenuItem value="low">Low</MenuItem>
//         <MenuItem value="medium">Medium</MenuItem>
//         <MenuItem value="high">High</MenuItem>
//       </TextField>

//       {/* Category Dropdown */}
//       <TextField select name="category" label="Category" fullWidth required value={formData.category} onChange={handleChange}>
//         <MenuItem value="bug">Bug Report</MenuItem>
//         <MenuItem value="feature">Feature Request</MenuItem>
//         <MenuItem value="support">General Support</MenuItem>
//       </TextField>

//       {/* Ticket Type (Radio Buttons) */}
//       <Typography>Ticket Type:</Typography>
//       <RadioGroup row name="ticketType" value={formData.ticketType} onChange={handleChange}>
//         <FormControlLabel value="bug" control={<Radio />} label="Bug" />
//         <FormControlLabel value="feature" control={<Radio />} label="Feature Request" />
//         <FormControlLabel value="support" control={<Radio />} label="Support" />
//       </RadioGroup>

//       {/* Date Picker */}
//       <TextField type="date" name="date" fullWidth required value={formData.date} onChange={handleChange} />

//       {/* File Upload */}
//       <Button variant="outlined" component="label">
//         Upload Attachment
//         <input type="file" hidden name="attachment" onChange={handleChange} />
//       </Button>

//       {/* Contact Email */}
//       <TextField type="email" name="contactEmail" label="Contact Email" fullWidth required value={formData.contactEmail} onChange={handleChange} />

//       {/* Phone Number */}
//       <TextField type="tel" name="phone" label="Phone Number" fullWidth required value={formData.phone} onChange={handleChange} />

//       {/* Terms and Conditions */}
//       <FormControlLabel control={<Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />} label="I agree to the Privacy Policy & Terms" />

//       {/* Submit Button */}
//       <Button type="submit" variant="contained" fullWidth>Submit Ticket</Button>

//       {/* Social Media Sign-in */}
//       <Divider>Or</Divider>
//       <div className="flex justify-center gap-2">
//         <IconButton className="text-facebook"><i className="ri-facebook-fill" /></IconButton>
//         <IconButton className="text-twitter"><i className="ri-twitter-fill" /></IconButton>
//         <IconButton className="text-github"><i className="ri-github-fill" /></IconButton>
//         <IconButton className="text-googlePlus"><i className="ri-google-fill" /></IconButton>
//       </div>

//       {/* Already have an account */}
//       <div className="flex justify-center gap-2">
//         <Typography>Already have an account?</Typography>
//         <Typography component={Link} to="/login" color="primary">Sign in instead</Typography>
//       </div>
//     </form>



//           </div>
//         </CardContent>
//       </Card>
//       {/* <Illustrations maskImg={{ src: authBackground }} /> */}
//     </div>
//   )
// }

// export default Register

'use client'

// React Imports
import { useContext, useState } from 'react'

// Next Imports
import { Link } from 'react-router-dom'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
 
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
 
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// Component Imports
import Logo from '../components/layout/shared/Logo'
import axios from 'axios'
import { AuthContext } from '../Provider/AuthProvider'

const Register = () => {
  const {user} = useContext(AuthContext);
 

 
  // State Management
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    ticketType: '',
    date: '',
    contactEmail: user.email,
    phone: '',
    agreeTerms: false,
    attachment: null
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Data Submitted:', formData)
    // Handle form submission logic (e.g., API request)

    try {
      const res = await axios.post('http://localhost:8000/tickets',formData)
      console.log(res);
  
      if(res.status === 201)
      {
  
     
  
        alert(res.data.message)
      
      }
      
     } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("registration failed");
     }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-6'>
      <Card className='flex flex-col sm:w-[450px] shadow-lg'>
        <CardContent className='p-6 sm:p-12'>
          <Link to='/' className='flex justify-center items-start mb-6'>
            <Logo />
          </Link>
          <Typography variant='h4' className='text-center mb-4'>Ticket Submission Form 🚀</Typography>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <TextField name='title' label='Title' fullWidth required value={formData.title} onChange={handleChange} />
            <TextField name='description' label='Description' fullWidth multiline rows={3} required value={formData.description} onChange={handleChange} />
            
            <TextField select name='priority' label='Priority' fullWidth required value={formData.priority} onChange={handleChange}>
              <MenuItem value='low'>Low</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='high'>High</MenuItem>
            </TextField>

            <TextField select name='category' label='Category' fullWidth required value={formData.category} onChange={handleChange}>
              <MenuItem value='bug'>Bug Report</MenuItem>
              <MenuItem value='feature'>Feature Request</MenuItem>
              <MenuItem value='support'>General Support</MenuItem>
            </TextField>

            <Typography>Ticket Type:</Typography>
            <RadioGroup row name='ticketType' value={formData.ticketType} onChange={handleChange}>
              <FormControlLabel value='bug' control={<Radio />} label='Bug' />
              <FormControlLabel value='feature' control={<Radio />} label='Feature Request' />
              <FormControlLabel value='support' control={<Radio />} label='Support' />
            </RadioGroup>

            <TextField type='date' name='date' fullWidth required value={formData.date} onChange={handleChange} />

            <Button variant='outlined' component='label'>
              Upload Attachment
              <input type='file' hidden name='attachment' onChange={handleChange} />
            </Button>

            <TextField type='email' name='contactEmail'  label='Contact Email' fullWidth required value={formData.contactEmail} onChange={handleChange} />
            <TextField type='tel' name='phone' label='Phone Number' fullWidth required value={formData.phone} onChange={handleChange} />
            
            <FormControlLabel control={<Checkbox name='agreeTerms' checked={formData.agreeTerms} onChange={handleChange} />} label='I agree to the Privacy Policy & Terms' />

            <Button type='submit' variant='contained' fullWidth>Submit Ticket</Button>

            {/* <Divider>Or</Divider>
            <div className='flex justify-center gap-2'>
              <IconButton className='text-facebook'><i className='ri-facebook-fill' /></IconButton>
              <IconButton className='text-twitter'><i className='ri-twitter-fill' /></IconButton>
              <IconButton className='text-github'><i className='ri-github-fill' /></IconButton>
              <IconButton className='text-googlePlus'><i className='ri-google-fill' /></IconButton>
            </div> */}

            {/* <div className='flex justify-center gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} to='/login' color='primary'>Sign in instead</Typography>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
