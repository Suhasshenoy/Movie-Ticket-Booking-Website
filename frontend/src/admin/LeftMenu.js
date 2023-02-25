import React from "react";
import {Link,withRouter} from "react-router-dom"

const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return {color: "#E4A11B"}
    }
    else{
        return {color: "#A9A9A9" } 
    }
}

const LeftMenu = ({history}) => {
    return (
    <div className="text-white ">
        <div className="row">
            <h5>Admin Dashboard</h5>
        </div>
        <div className="nav row pt-3">
            <li className="nav-item">
                <Link className='nav-link' style = {currentTab(history,"/admin/add/movie")} to = "/admin/add/movie">
                    Add Movie
                </Link>
            </li>
        </div>
        
        <div className="row nav">
            <li className="nav-item"> 
                <Link className='nav-link' style = {currentTab(history,"/admin/delete/movie")} to = "/admin/delete/movie">
                    Delete Movie
                </Link>
            </li>
        </div>
        <div className="row nav">
            <li className="nav-item">
                <Link className='nav-link' style = {currentTab(history,"/admin/add/screen")} to = "/admin/add/screen">
                    Add Screen
                </Link>
            </li>
        </div>
        <div className="row nav">
            <li className="nav-item">
                <Link className='nav-link' style = {currentTab(history,"/admin/add/theatre")} to = "/admin/add/theatre">
                    Add Theatre
                </Link>
            </li>
        </div>
        <div className="row nav">
            <li className="nav-item">
                <Link className='nav-link' style = {currentTab(history,"/admin/add/show")} to = "/admin/add/show">
                    Add Show
                </Link>
            </li>
        </div>
        
    </div>
    );
}

export default withRouter(LeftMenu);
