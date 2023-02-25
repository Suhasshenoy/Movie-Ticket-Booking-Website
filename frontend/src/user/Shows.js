import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Base from "../core/Base";
import { getShowsWithMovieTheatre,getATheatre } from "../core/helper/coreapicalls";
import ShowCard from "../core/ShowCard";
import MovieDescription from "./MovieDescription";


// route- /shows/:movieId/:theatreId

const Shows = () => {

    const {movieId,theatreId} = useParams();
    const [shows,setShows] = useState([]);
    const [theatre,setTheatre] = useState("");
    
      const preload = () => {
        getShowsWithMovieTheatre(movieId,theatreId)
        .then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else{
          
                setShows([...data]);
            }
        })
    }
    const preload1 = () => {
      getATheatre(theatreId)
      .then(data=> {
          if(data.error){
              console.log(data.error);
          }
          else{
              setTheatre(data);
          }
      })
  }
    useEffect(()=> {
        preload();
        preload1();
    },[]);

    const rightSide = () => {
        return <div className='text-white'>
          {shows && shows.map((show,index) => {
            return (
              <div key = {index} className='row'>
                <ShowCard show = {show} theatreId={theatreId} />
              </div>
            )
          })}
        </div>
      }

    return (
        <Base > 
            
              <div className="row text-white">
                  <div className='col-3'>
                    <MovieDescription movieId = {movieId} />
                  </div>
                  <div className='col-9'>
                  <h3 className="mb-3 text-warning">Shows in the theatre {theatre.name}</h3>
                    {rightSide()}
                  </div>
              </div>



            </Base>
    )
}

export default Shows;