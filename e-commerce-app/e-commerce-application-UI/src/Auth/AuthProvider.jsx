import React,{createContext,useContext,useState} from 'react'

//Context holding the auth user details
export const authContext=createContext({})

const AuthProvider = ({child}) => {
 const [user,setUser]=useState({
    userId: "123",
    userName: "akshaya",
    accessexpiration: 3600,
    refreshexpiration: 1296000,
    authenticated: false,
    role: "CUSTOMER"
  })
  return(
      //returning the AuthContext with valuse user and setUser
      //by enclosing the child component within it
      <authContext.Provider value={{user, setUser}}>{child}</authContext.Provider>
  )
}

export default AuthProvider
//custom hook that returns the context value
export const useAuth = () => useContext(authContext);
