import React, {useState,useContext,createContext, useEffect } from 'react'
import RefreshAuth from './RefreshAuth'

//context holding the auth user details
export const authContext=createContext({});

//compponents that returns the AuthContext by enclosing its child components within the context
const AuthProvider = ({children}) => {
  const {Auth}=RefreshAuth()
    const [user,setUser]=useState({
        userId:0,
        username:"",
        userRole:"CUSTOMER",
        authenticated: false,
        accessExpiration:0,
        refershExpiration:0
    })

    // const [addressData, setAddressData] = useState({
    //   streetAddress: "",
    //   streetAddressAdditional: "",
    //   city: "",
    //   state: "",
    //   pincode: "",
    //   addressType: ""
    // });
    //console.log(authContext)
    useEffect(()=>{
      console.log(Auth);
      setUser(Auth);
    },[Auth])
  return (
    //returing the Authcontext  with values "user" and "setUser"
    //by enclosing the child components within it.
    //<div>   
    <authContext.Provider value={{user,setUser}}>{children}</authContext.Provider>
  
  )
}

export default AuthProvider

export const useAuth=()=>useContext(authContext);