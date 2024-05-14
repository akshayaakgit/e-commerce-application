import React from 'react'
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Explore from '../Private/Customer/Explore';
import Cart from '../Private/Customer/Cart';
import AddProduct from '../Private/Seller/AddProduct';
import SellerDashBord from '../Private/Seller/SellerDashBord';
import AddAddress from '../Private/Common/AddAddress';
import AddAddressForm from '../Private/Common/AddAddressForm';
import ContactForm from '../Private/Common/ContactForm';
import EditProfile from '../Private/Common/EditProfile';
import Wishlist from '../Private/Customer/Wishlist';
import Home from '../Public/Home';
import Login from '../Public/Login';
import Logout from '../Public/Logout';
import SearchFilter from '../Public/SearchFilter';
import Register from '../Public/Register';
import ImageUpload from '../images/ImageUpload';
import OTPVerification from '../Public/OTPVerification';
import { useAuth } from '../auth/AuthProvider';

const AllRoutes = () => {

    const {user}=useAuth();
    const{userRole, authenticated}=user;
    let routes=[];

if(authenticated)
{
    // Private Routes

    routes.push(
        <Route key={'/addaddress'} path='/addaddress' element={ <AddAddress />}/>,
        <Route key={'/addaddress'}path='/editprofile' element={ <EditProfile />}/>
    )

    if(userRole==="CUSTOMER") 
    {
        // Private Customer Routes
        routes.push(             
            <Route key={'/wishlist'} path='/wishlist' element={ <Wishlist />}/>,
            <Route key={'/explore'} path='/explore' element={ <Explore />}/>,
            <Route key={'/cart'} path='/cart' element={ <Cart />}/>,
            <Route key={'/logout'} path='/logout' element={ <Logout />}/>
        ) 
    }
    else if(userRole==="SELLER")
    {
        // Private Seller Routes
        routes.push(
            <Route key={'/add-product'} path='/add-product' element={ <AddProduct />}/>,
            <Route key={'/seller-dashbord'} path='/seller-dashbord' element={ <SellerDashBord />}/>,
            <Route key={'/logout'} path='/logout' element={ <Logout />}/>
        )
    }
}
else{

    // Public Routes
    routes.push(
        
        <Route key={'/'} path='/' element={ <Home/>}/>,
        <Route key={'/login'} path='/login' element={ <Login />}/>,
        <Route key={'/logout'} path='/logout' element={ <Logout />}/>,
        <Route key={'/customer/register'} path='/customer/register' element={ <Register role={"CUSTOMER"} />}/>, 
        <Route key={'/seller/register'} path='/seller/register' element={ <Register role={"SELLER"} />}/>, 
        <Route key={'/explore'} path='/explore' element={ <Explore />}/>, 
        <Route key={'/otpverification'} path='/otpverification' element={ <OTPVerification />}/>,
        <Route key={'/addaddress'} path='/addaddress' element={ <AddAddressForm />}/>, 
        <Route key={'/contactform'} path='/contactform' element={ <ContactForm />}/>,
        <Route key={'/search'} path='/search' element={ <SearchFilter />}/>,
        <Route key={'/image'} path='/image' element={ <ImageUpload />}/>,
        <Route key={'/addproduct'} path='/addproduct' element={ <AddProduct />}/>,
        <Route key={'/sellerdash'} path='/sellerdash' element={ <SellerDashBord />}/>
    ) ; 

}

return (
    <Routes> <Route path='/' element={<App/>}>{routes}</Route></Routes>

);

}

export default AllRoutes