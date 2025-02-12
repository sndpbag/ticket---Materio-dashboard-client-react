import { Button, Card, CardContent, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/photo/payment.png";
import { useForm } from "react-hook-form";


const Payment = () => {

    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };


    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-6'>
        <Card className='flex flex-col sm:w-[450px] shadow-lg '>
          <CardContent className='p-6 sm:p-12'>
            <Link to='/' className='flex justify-center items-start mb-6'>
              <img src={Logo} className="w-32" alt="" />
            </Link>
            <Typography variant='h4' className='text-center mb-4'>Payment Submission Form 🚀</Typography>
  
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-5'>
              <TextField  {...register("name",{required:true})} label='name'  fullWidth     />
              {
                errors.name && (<Typography>Name Field is Required!</Typography>)
              }
              <TextField {...register("email",{required:true})} label='email' fullWidth   />
              {
                errors.email && ( <p className="text-red-500">Email Field is Required!</p>)
              }
              <TextField {...register("transaction_no")} label='Transaction No' fullWidth   />
              <TextField {...register("fee")} label='fee' fullWidth   />
            
  
             
  
              <Button variant='outlined' component='label'>
              Transaction Screenshot
                <input type='file'  hidden {...register("attachment")}   />
              </Button>
  
              <TextField type='text'  {...register("mobile")}  label='Mobile No' fullWidth   />
              <TextField type='text' {...register("address")} label='Enter Address' fullWidth multiline rows={3} />
              
              <FormControlLabel control={<Checkbox  {...register("agreeTerms",{required:true})} />} label='I agree to the Privacy Policy & Terms' />
                {
                    errors.agreeTerms && (<p className="text-red-600">Click on Check Box</p>)
                }
              <Button type='submit' variant='contained' fullWidth>Submit Payment</Button>
  
           
            </form>
          </CardContent>
        </Card>
      </div>
    );
};

export default Payment;