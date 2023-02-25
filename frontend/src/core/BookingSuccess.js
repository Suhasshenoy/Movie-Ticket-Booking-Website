import React ,{useState}from 'react'
import { Redirect } from 'react-router-dom';

import { isAuthenticated } from '../auth/helper';
import Base from './Base';


const BookingSuccess = () => {

    const [redirect,setRedirect] = useState(false);
    const {user} = isAuthenticated();
    
    const countTime = () => {
        setTimeout(()=>{
            setRedirect(true);
        },5000)
    }

    const getRedirect = () => {
        if(redirect){
            return <Redirect to= "/" />
        }
    }
   
    return (
        <Base >
            {countTime()}
            {getRedirect()}
            <div className="container-fluid py-5 offset-md-1 ">
                <h3 className='text-warning'>Ticket Confirmed</h3>
                <p className="col-8 fs-5 mt-3">Your Payment is Successfull and the ticket is sent to your email id {user.email}. <br/>You will be redirected to Home Page.</p>
                
            </div>
        </Base>
    )
}
export default BookingSuccess;


