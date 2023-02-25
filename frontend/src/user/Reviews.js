import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Base from "../core/Base";
import {getReviewsForMovie} from "../core/helper/coreapicalls";
import ReviewCard from "../core/ReviewCard";

import MovieDescription from "./MovieDescription";



const Reviews = () => {
    
    const {movieId} = useParams();
    const [reviews,setReviews] = useState([]);
    
      const preload = () => {
        getReviewsForMovie(movieId)
        .then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else{
          
                setReviews([...data]);
            }
        })
    }
    
    useEffect(()=> {
        preload();
    },[]);

    const rightSide = () => {
        return <div className='text-white'>
          {/* {shows && shows.map((show,index) => {
            return (
              <div key = {index} className='row'>
                <ShowCard show = {show} theatreId={theatreId} />
              </div>
            )
          })} */}
          {
            reviews.length? (
              reviews.map((review,index) => {
                return <div key = {index} className="row">
                  <ReviewCard review = {review} />
                </div>
              })
            ) : (
              <h3 className="text-warning">No reviews are posted for this movie </h3>
            )
          }
        </div>
      }

    return (
        <Base > 
              <div className="row text-white">
                  <div className='col-3'>
                    <MovieDescription movieId = {movieId} />
                  </div>
                  <div className='col-9'>
                    {rightSide()}

                  </div>
                  
              </div>



            </Base>
    )
}

export default Reviews;