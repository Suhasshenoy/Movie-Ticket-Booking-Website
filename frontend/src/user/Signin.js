import React,{useState}  from "react";
import Base from "../core/Base";
import {Redirect} from "react-router-dom";

import {signin,authenticate,isAuthenticated} from "../auth/helper"

const Signin = () => {

    const [values,setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });
    const {email,password,error,loading,didRedirect} = values;
    
    const {user} = isAuthenticated();

    const handleChange = name=>event=>{
         
        setValues((prevValues)=>({
           ...prevValues,
           error: false,
           [name]:event.target.value
        }));
    }
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error:false,
            loading:true
        });
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                    loading:false
                });
            }
            else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch(err =>(console.log("sign in request failed")))
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role ===1) {
                return <Redirect to="/admin/add/movie" />;
            }
            // if user exists or not is not tested
            else if(user){
                return <Redirect to="/" />;
            }
        }
        
        if(isAuthenticated()){
            return <Redirect to = "/" />
        }
    }

    const loadingMessage = ()=> {
    
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
            
                    <div className="alert alert-dark" style={{display:loading?"":"none"}}>
                        Loading...
                        
                    </div>
                </div>
            </div>
        );
    }
    const errorMessage = ()=>{
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger" style={{display:error?"":"none"}}>
                    {error}
                </div>
            </div>
        </div>);
    }

    const signInForm = () => {
        return (
            <div className="row">
                {/* offset-sm-3 makes the text to be in center */}
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label  className="text-light">Email</label>
                            <input onChange= {handleChange("email")} value = {email} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password</label>
                            <input  onChange= {handleChange("password")} value = {password}className="form-control" type="password" />
                        </div>
                        <div className="form-group pt-3">
                            <button onClick = {onSubmit} className="btn btn-dark btn-block">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Sign in Page" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    );
}

export default Signin;