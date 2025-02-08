import {  useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

 

const PrivateRouter = ({children}) => {

    const {user,loading} = useContext(AuthContext);

    if(loading)
    {
        return <h2>LOading</h2>;
    }
      
    if(user)
    {
        return children;
    }
    return (
         <Navigate to='/'></Navigate>
    );
};

export default PrivateRouter;