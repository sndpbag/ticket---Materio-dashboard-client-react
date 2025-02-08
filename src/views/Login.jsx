 

// // React Imports
// import { useState } from 'react'

// // Next Imports
// // import Link from 'next/link'
// import { Link, useNavigate } from 'react-router-dom'
// // import { useRouter } from 'next/navigation'

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
// // import Logo from '@components/layout/shared/Logo'
// import Logo from '../components/layout/shared/Logo'
// // import Illustrations from '@components/Illustrations'
// import Illustrations from '../components/Illustrations'

// // Config Imports
// // import themeConfig from '@configs/themeConfig'
// import themeConfig from '../configs/themeConfig'

// // Hook Imports
// // import { useImageVariant } from '@core/hooks/useImageVariant'
// import { useImageVariant } from '../core/hooks/useImageVariant'


// const Login = ({ mode }) => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const navigate = useNavigate() // Replace useRouter with useNavigate
//   // Vars
 
//   const darkImg = '/public/images/pages/auth-v1-mask-dark.png'
//   const lightImg = '/public/images/pages/auth-v1-mask-light.png'

//   // Hooks
//   // const router = useRouter()
//   const authBackground = useImageVariant(mode, lightImg, darkImg)
//   const handleClickShowPassword = () => setIsPasswordShown(show => !show)

//   const handleSubmit = e => {
//     e.preventDefault()
//     navigate('/') // Use navigate instead of router.push
//   }

//   return (
//     <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
//       <Card className='flex flex-col sm:is-[450px]'>
//         <CardContent className='p-6 sm:!p-12'>
//           <Link href='/' className='flex justify-center items-center mbe-6'>
//             <Logo />
//           </Link>
//           <div className='flex flex-col gap-5'>
//             <div>
//               <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
//               <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
//             </div>
//             <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
//               <TextField autoFocus fullWidth label='Email' />
//               <TextField
//                 fullWidth
//                 label='Password'
//                 id='outlined-adornment-password'
//                 type={isPasswordShown ? 'text' : 'password'}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position='end'>
//                       <IconButton
//                         size='small'
//                         edge='end'
//                         onClick={handleClickShowPassword}
//                         onMouseDown={e => e.preventDefault()}
//                       >
//                         <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
//                 <FormControlLabel control={<Checkbox />} label='Remember me' />
//                 <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
//                   Forgot password?
//                 </Typography>
//               </div>
//               <Button fullWidth variant='contained' type='submit'>
//                 Log In
//               </Button>
//               <div className='flex justify-center items-center flex-wrap gap-2'>
//                 <Typography>New on our platform?</Typography>
//                 <Typography component={Link} href='/register' color='primary'>
//                   Create an account
//                 </Typography>
//               </div>
//               <Divider className='gap-3'>or</Divider>
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
//             </form>
//           </div>
//         </CardContent>
//       </Card>
//       <Illustrations maskImg={{ src: authBackground }} />
//     </div>
//   )
// }

// export default Login


// React Imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

// Component Imports
import Logo from '../components/layout/shared/Logo';
// import Illustrations from '../components/Illustrations';

// Config Imports
import themeConfig from '../configs/themeConfig';
import axios from 'axios';
 

// Hook Imports
// import { useImageVariant } from '../core/hooks/useImageVariant';

const Login = ({ mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();

  const darkImg = '/public/images/pages/auth-v1-mask-dark.png';
  const lightImg = '/public/images/pages/auth-v1-mask-light.png';

  // const authBackground = useImageVariant(mode, lightImg, darkImg);
  const handleClickShowPassword = () => setIsPasswordShown(show => !show);

  const handleLogin = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {email,password};

   try {
    const res = await axios.post('http://localhost:8000/user-login',data)
   

    if(res.status === 200)
    {

       // Store user data (excluding password)
       const userData = {
        id: res.data.user.id,
        email: res.data.user.email,
        name: res.data.user.name,
        role: res.data.user.role, // 0 = customer, 1 = agent
        token: res.data.token, // Store JWT token if received
      };

      console.log(userData);
      // Save to localStorage or sessionStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to dashboard
      navigate('/dashboard');
    }
    
   } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    alert("Login failed");
   }

  
  
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full p-6'>
      <Card className='flex flex-col sm:w-[450px]'>
        <CardContent className='p-6 sm:p-12'>
          <Link to='/' className='flex justify-center items-center mb-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className='mb-1'>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form   noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
              <TextField name='email' autoFocus fullWidth label='Email' />
              <TextField
              name='password'
                fullWidth
                label='Password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className='flex justify-between items-center flex-wrap gap-3'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography color='primary' component={Link} to='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} to='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='my-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-blue-600'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-blue-400'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-gray-800'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-red-600'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      {/* <Illustrations maskImg={{ src: authBackground }} /> */}
    </div>
  );
};

export default Login;
