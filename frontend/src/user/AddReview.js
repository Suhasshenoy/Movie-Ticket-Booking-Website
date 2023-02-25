import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { postReview } from "../core/helper/coreapicalls";
import MovieDescription from "./MovieDescription";


const AddReview = () => {

    const {movieId} = useParams();
    const {user,token} = isAuthenticated();
    const userId = user.user_id;

    const [values,setValues] = useState({
        title: "",
        description:"",
        redirect:false
    });

    const [performRedirect,setPerformRedirect] = useState(false);

    const {title,description,redirect} = values;


    const handleChange = name => event => {
        const value =event.target.value;
       
        setValues(prevValues=>({...prevValues,[name]:value}))
    }
    const onSubmit = event=> {
        event.preventDefault();
        postReview(userId,movieId,values,token)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setValues(prevValues => (
                    {   ...prevValues,
                        title:"",
                        description:"",
                        redirect:true
                    }
                ));
            }
        })
        .catch(err=>(console.log("Posting review failed",err)));
    }
    const successMessage = () => (
        <div className="alert alert-dark mt-3"
            style={{display: redirect ?"":"none"}}
        >
            Successfully posted your review.

        </div>
    );

    const getRedirect = () => {
        if(redirect){
            setTimeout(()=>{
                setPerformRedirect(true)
            },3000);
        }
    }
    const redirectToHome = () => {
        if(performRedirect)
            return <Redirect to = "/" />
    }


    const rightSide = () => {
        return(
        
        <div className="text-white mt-5">
            {successMessage()}
            {getRedirect()}
            {redirectToHome()}
            <label className='mt-1'>Title</label>
            <div className="form-group mt-2 mb-2">
            <input
              onChange={handleChange("title")}
              name="title"
              className="form-control "
              placeholder="Review Title "
              value={title}
            />
          </div>
          <label className='mt-2'>How was the movie?</label>
          <div className="form-group mt-2 mb-2">
            <textarea
            
              onChange={handleChange("description")}
              name="description"
              className="form-control "
              placeholder="Write review"
              value={description}
              rows ="6"
            />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-dark mt-2 mb-4">
            Post Review
          </button>
        </div>
        );
    }

    return (
        
        <Base>
            <div className="row text-white">
                  <div className='col-3'>
                    <MovieDescription movieId = {movieId} />
                  </div>
                  <div className='col-7 offset-md-1'>
                    {rightSide()}
                  </div>
            </div>
        </Base>
    )
}

export default AddReview;