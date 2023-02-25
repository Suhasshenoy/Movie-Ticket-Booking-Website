import React,{Fragment} from "react";
import {Link,withRouter} from "react-router-dom"
import { isAuthenticated, signout } from '../auth/helper';

const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return {color: "#E4A11B"}
    }
    else if(path === "/admin/add/movie" && history.location.pathname.includes("admin") ){
        
        return {color: "#E4A11B"}
    }
    else{
        return {color: "#A9A9A9" } 
    }
}


const Menu = ({history}) => {
    return (
        <div className="text-white">
            <ul className="nav nav-tabs p-3">
            <li className="nav-item">
                <Link style = {currentTab(history,"/")} className='nav-link' to="/">
                    Home
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style = {currentTab(history,"/admin/add/movie")} className='nav-link' to="/admin/add/movie">
                        Dashboard
                    </Link>
                </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style = {currentTab(history,"/signin")} className='nav-link' to="/signin">
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style = {currentTab(history,"/signup")} className='nav-link' to="/signup">
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <button style = {{color: "#A9A9A9"}} className='nav-link' onClick={()=>{
                        signout(()=>{
                            history.push("/")
                        });
                    }}>
                        Signout
                    </button>
                </li>
            )}
            
        </ul>
        </div>
    )
}
export default withRouter(Menu);