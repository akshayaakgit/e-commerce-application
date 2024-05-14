import React from "react";
import axios from "axios";

const Logout = async() => {
  try {
    // Send registration request to the backend server
    const response = axios.post(
      "http://localhost:8080/api/v1/logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: "true"
      }
    ); 
    if((await response).status===200){ 
    alert(response.status);
    navigate("/");
    window.location.reload();
}
  } catch (error) {
    console.error("Message:", error);
  }
  //window.location.reload();
};
export default Logout;
