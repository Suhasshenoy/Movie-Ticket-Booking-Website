import React from "react";
import {Link} from 'react-router-dom';

import ImageHelper from './helper/ImageHelper';

const Card = ({movie}) => {
    const cardTitle = movie?movie.movie_name:"Movie name";
    const cardDescription = movie?movie.genre:"Movie genre";
    

    return (
        <div style = {{background:"#000000"}} className="card text-white border border-light ">
            <ImageHelper movie = {movie}/>
           
            <div className="card-body">
                <h5 className="card-title text-warning">{cardTitle}</h5>
                <p className="card-text">{cardDescription}</p>
                
                <Link to = {`/movie/${movie.movie_id}`}>
                    <button className ="btn col-12 btn-block btn-warning mt-2">Book Tickets</button>
                </Link>

                <br />

                  <div className="d-grid gap-2 d-md-flex mt-3">
                    <Link className="col-6" to = {`/review/post/${movie.movie_id}`}>
                      <button  className ="btn  btn-block btn-dark col-12   mb-2">Write Review</button>
                    </Link>
                    <Link className="col-6" to = {`/reviews/${movie.movie_id}`}>
                      <button  className ="btn  btn-block btn-dark col-12  mb-2">Read Reviews</button>
                    </Link>
                  </div>
                
                
                
                
                
                 
          </div>
        </div>
      );
}

export default Card;