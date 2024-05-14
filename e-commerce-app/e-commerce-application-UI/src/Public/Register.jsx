// import React,{useEffect,useState} from "react";
// import axios from "axios";
// import Input from "../Util/Input.jsx";
// import Button from "../Util/Button.jsx";

// const Register = ({ role }) => {
//   const [formData, setFormData] = useState({
//     displayName: "",
//     email: "",
//     password: "",
//     userRole: role
//   });
//   const handleInputChange = (name, value) => {
//     if (name === "displayName") setFormData({ ...formData, displayName: value });
//     if (name === "email") setFormData({ ...formData, email: value });
//     if (name === "password") setFormData({ ...formData, password: value });
//   };
//   const handleSubmit = async () => {
//     alert("Submitted");
//     console.log(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/vl/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );
//       if (response.status === "202") {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert(error.response.data.rootCause);
//     }
//   };
//   return (
//     // <div class="grid grid-rows-3 grid-flow-col gap-4">
//     //   <div className="flex justify-center items-center h-screen bg-gray-100">
//     //     <div className="bg-white p-8 rounded-lg shadow-lg">
//     //       <h2 className="text-2xl font-semibold mb-4">
//     //         Create an account {role}
//     //       </h2>
//     //       <form>
//     //         <div className="mb-4">
//     //           <label htmlFor="name" className="block text-gray-700">
//     //             Name
//     //           </label>
//     //           <input
//     //             type="text"
//     //             id="name"
//     //             name="name"
//     //             className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
//     //           />
//     //         </div>
//     //         <div className="mb-4">
//     //           <label htmlFor="email" className="block text-gray-700">
//     //             Email
//     //           </label>
//     //           <input
//     //             type="email"
//     //             id="email"
//     //             name="email"
//     //             className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
//     //           />
//     //         </div>
//     //         <div className="mb-4">
//     //           <label htmlFor="password" className="block text-gray-700">
//     //             Password
//     //           </label>
//     //           <input
//     //             type="password"
//     //             id="password"
//     //             name="password"
//     //             className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
//     //           />
//     //         </div>
//     //         <button
//     //           type="submit"
//     //           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//     //         >
//     //           Sign Up
//     //         </button>
//     //       </form>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="h-5/6 flex justify-center items-center bg-transparent">
//      <div className="flex flex-col justify-center items-center border-2 px-10 py-8 w-5/12 rounded-mdbg-white shadow-Ig mt-20">
//         <h1 className="text-3x1text-slate-700 font-semibold mb-8">
//           Register as {role}
//         </h1>
//         <Input
//           onChange={handleInputChange}
//           name={"displayName"}
//           placeholder={"Enter your name: "}
//           value={formData.displayName}
//           type={"text"}
//         />
//         <Input
//           onChange={handleInputChange}
//           name={"email"}
//           placeholder={"Enter your email: "}
//           value={formData.email}
//           type={"email"}
//         />
//         <Input
//           onChange={handleInputChange}
//           name={"password"}
//           placeholder={"Enter your Password: "}
//           value={formData.password}
//           type={"password"}
//         />
//         <Button
//         text={"submit"}
//         onClick={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Header from '../Util/Header';
import axios from 'axios';

const Register = (props) => {
 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [submitButton, setSubmitButton] =useState(false);
  const navigate=useNavigate();
 


  const handleChangeEmail = (event) => {
      const inputValue = event.target.value;
      setEmail(inputValue);

      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(inputValue));
  };
  const handleChangePassword = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);

    // At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    setIsValidPassword(passwordRegex.test(inputValue));
  };  

  const handleChangeName = (event) => {
      // Convert the entered name to uppercase
      const inputValue = event.target.value.toUpperCase();
      setUsername(inputValue);
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(username,email,password,props.role)
    const formData={ name:username, email:email, password:password, userRole:props.role  }
    if(isValidEmail&&isValidPassword && formData)
    {
      setSubmitButton(true)     ;
    
      
      console.log(formData);
        try {
          // Send registration request to the backend server
          const response = await fetch('http://localhost:8080/api/v1/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          console.log(response.status)
          if(response.ok)
          {
            sessionStorage.setItem('email',email);
            navigate('/otpverification');

          }
        }
        catch(error){
          console.error("Message:",error.response.message );
          setSubmitButton(false)
        }
      
    }
    
  }

  return (
    <section className="mt-8 flex justify-center">
      <div className="flex-col justify-end   bg-blue-700 h-[500px] w-80">
        <div className=" flex-col h-[300px]">
          <div className="mt-8 pl-8 text-white text-3xl">Looks like you're new here!</div>
          <div className="mt-8 pl-8 text-gray-400 text-lg">             
          {props.role ==="SELLER"?(<p>Sign up with your email  to get Orders as a Seller </p> ):(<p>Sign up with your email to get started as Customer and Placed Orders </p> )}
          </div>
        </div>

        <div className="">
          <img
            className=" pl-12"
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          />
        </div>
      </div>
      <div className=" h-[500px] border-2 border-red-100 w-[500px]">
        <div className=" mt-8 pl-3 pr-2 ">
          <form  onSubmit={handleSubmit} >   
            <input type="text" placeholder='Enter your Name' value={username} onChange={handleChangeName} className='p-2 border-b-2  w-full outline-none focus:border-blue-700'/>
            
            <input placeholder='Enter Your Email'  type="email" value={email}  onChange={handleChangeEmail} className={!isValidEmail ? 'mt-2 p-2 border-b-2  w-full outline-none border-red-500' : 'mt-2 p-2 border-b-2  w-full outline-none focus:border-blue-700'} />          
            {console.log(isValidEmail)}
            {!isValidEmail && (<p className="text-red-500 text-sm">Please enter a valid email address</p> )}
             
             <input type="text" placeholder='Enter Your Password' value={password} onChange={handleChangePassword} className={!isValidPassword?'mt-2 p-2 border-b-2  w-full outline-none focus:border-red-700':'mt-2 p-2 border-b-2  w-full outline-none focus:border-blue-700' }/>
             {!isValidPassword && (<p className="text-red-500 text-sm">At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character</p> )}
            
            <div className='mt-8 text-xs'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</div>
            <div className='mt-4 w-full h-12 bg-orange-500' >
              <Link aria-disabled={submitButton} onClick={handleSubmit} className=" flex justify-center w-full h-12" >
                <span className='mt-3  w-28 whitespace-nowrap   text-white font-bold'>Sign Up</span>
              </Link>
            </div>
            <div className='mt-4 w-full h-12 bg-white shadow-lg'>
              <Link onClick={()=>window.location.href="/login"} className=" flex justify-center w-full h-12">
                <span className='text-blue-500 mt-3 whitespace-nowrap font-bold'>Existing User? Login</span>
              </Link>
            </div>

          </form>
        </div>
      
      </div>
    </section>
  )
}

export default Register
