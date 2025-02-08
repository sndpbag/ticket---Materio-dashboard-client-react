import { createContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
 


export const AuthContext = createContext();

const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading,setLoding] = useState(true);

useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser)
    {
        setLoding(false)
      setUser(storedUser);
    }
  
  },[])




//       // handel logout
//   const handleLogout = ()=>{
//     localStorage.removeItem("user");
//     setUser(null);
//     Navigate("/login"); // Redirect to login page
    
//   }


    const authInfo = {
        user,
        loading,
        setUser

    }



    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;