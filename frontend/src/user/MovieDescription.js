import React,{useState,useEffect} from "react";
import { getAMovie } from "../core/helper/coreapicalls";
import ImageHelperForMovie from "../core/helper/ImageHelperForMovie";



const MovieDescription = ({movieId}) => {


    const [value,setValue] = useState({
        movie:"",
        error:""

    })

    const {movie} = value;


    const preload = (movieId) => {
        getAMovie(movieId)
        .then(data=> {
            if(data.error){
                setValue(prevValue=>({...prevValue,error:data.error}));
            }
            else{
                setValue(prevValue=>({...prevValue,movie:data}));
            }
            
        })
    }
    const getRounded = (num) => {
        let rounded = Math.round(num * 10) / 10;
        return rounded
    }


    useEffect(() => {
        preload(movieId);
    },[movieId])


    return (
        <div className="text-white "> 
            <div className="row">
                <ImageHelperForMovie movie = {movie} />
            </div>
            <div className="row mt-4">
                <h3 className="text-warning">{movie.movie_name}</h3>

            </div>
            <div  className="row mt-3 ">
                <h5 className="text-warning">Description</h5>
                <p>{movie.description}</p>
            </div>
            <div className="row mt-3">
                <h5 className="text-warning">Duration</h5>
                <p>{movie.duration} minutes</p>
            </div>
            <div className="row mt-3">
                <h5 className="text-warning">Rating</h5>
                <p>{getRounded(movie.rating)}</p>
            </div>
            <div className="row mt-3">
                <h5 className="text-warning">Genre</h5>
                <p>{movie.genre}</p>
            </div>
            <div className="row mt-3">
                <h5 className="text-warning">Director</h5>
                <p>{movie.director}</p>
            </div>

        </div>
    )
}

export default MovieDescription;