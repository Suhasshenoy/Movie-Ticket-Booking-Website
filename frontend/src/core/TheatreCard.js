import React,{useState} from "react";
import { Redirect } from "react-router-dom";




const TheatreCard = ({theatre,movieId}) => {
    const [redirect,setRedirect] = useState(false);
    const handleClick = () => {
        setRedirect(true)
    }
    const getRedirect = () => {
        if(redirect){
            return <Redirect to ={`/select/show/${movieId}/${theatre.theatre_id}`} />
        }       
       
    }
    return (
        <div  className="card bg-dark text-white border-white mb-3">
            <div className="card-body">
                {getRedirect()}
                <h5 className="card-title text-warning">{theatre.name}</h5>
                <p className="card-text">{theatre.description}</p>
                <p className="card-text">{theatre.address}</p>
                <p className="card-text">{theatre.city}</p>

                <button onClick={handleClick} className ="btn  btn-block btn-warning mt-2 mb-2">Select Show</button>
            </div>
        </div>
    );
}

export default TheatreCard;