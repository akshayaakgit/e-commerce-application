import React, {useState,useContext,createContext, useEffect } from 'react'
import { Link, useNavigate,  } from "react-router-dom";
import axios from "axios";

const RefreshAuth = () => {
  const [Auth, SetAuth] = useState({
    userId:0,
    username:"",
    userRole:"CUSTOMER",
    authenticated: false,
    accessExpiration:0,
    refershExpiration:0
});
  const navigate = useNavigate();
  const doRefresh = async(e) => {
    //const response = axios.post('http://localhost:8080/api/v1/login'),
    try {
        // Send registration request to the backend server
        const response = axios.post('http://localhost:8080/api/v1/refreshlogin',
                                         {}, 
                                         {  headers: {'Content-Type': 'application/json'  },
                                            withCredentials:'true'
                                         });
       
        //console.log((await response).status)
        if((await response).status===202)
        {
          const currentDate = new Date();
          // setUser((await response).data.data);
       const   User={
            userId:(await response).data.data.userId,
            username:(await response).data.data.username,
            userRole:(await response).data.data.userRole,
            authenticated: true,
            accessExpiration: new Date(currentDate.getTime() + (await response).data.data.accessExpiration),   
            refershExpiration:new Date(currentDate.getTime() + (await response).data.data.refreshExpiration),
            //(await response).data.data.refreshExpiration
        }
        localStorage.setItem("authResponse",JSON.stringify(User));
        SetAuth(User);
         //  consoZle.log((await response).data.data)
         //alert((await response).data.data.username)
        // console.log(accessExpiration);
         navigate("/");
         //window.location.reload();           
          
        }      
      }
      catch(error){
        console.error("Message:",error);
      }  
  };
  const authResponseString = localStorage.getItem("authResponse");
  // Parse the JSON string back to a JavaScript object
  const user = JSON.parse(authResponseString);
  const handleRefresh = () => {
    const accessDate = new Date(user.accessExpiration);
    const refreshDate = new Date(user.refershExpiration);
      if(!accessDate===null&&!refreshDate===null){
    if (refreshDate > new Date()) {
      if (accessDate > new Date()) {
        SetAuth(user);
      } else doRefresh();
    } else navigate("/login");
}
  };
  let refresh = false;
  useEffect(() => {
    if (refresh) {
      handleRefresh();
      refresh = true;
    }
  }, []);
  return { Auth };
};

export default RefreshAuth;
