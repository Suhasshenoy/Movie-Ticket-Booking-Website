import React,{useState}  from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { signup } from "../auth/helper";


const Signup = () => {

    const [values,setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false

    });

    const {name,email,password,error,success} = values;

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
            error: false
        });
        signup({name,email,password})
        .then(data=> {
            if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                    success:false
                })
            }
            else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
        .catch(err=>(console.log("Error in signup",err)))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                {/* offset-sm-3 makes the text to be in center */}
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >
                        <div className="form-group">
                            <label  className="text-light">Name</label>
                            <input onChange={handleChange("name")} className="form-control" value = {name} type="text" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Email</label>
                            <input onChange={handleChange("email")} className="form-control" value = {email} type="email" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password</label>
                            <input onChange={handleChange("password")} className="form-control" value={password} type="password" />
                        </div>
                        <div className="form-group pt-3">
                            <button onClick={onSubmit} className="btn btn-dark btn-block">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
    const successMessage = ()=>{
        
        return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        
                <div className="alert alert-dark" style={{display:success?"":"none"}}>
                    New account was created successfully. Please{" "} 
                    <Link to = "/signin">Login Here</Link>
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
    
    return (

        <Base title="Sign up Page">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)} </p> */}
        </Base>
    );
}

export default Signup;