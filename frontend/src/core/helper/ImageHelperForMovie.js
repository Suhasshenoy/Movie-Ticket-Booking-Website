import React from 'react'
import { API } from '../../backend';

const ImageHelperForMovie = ({movie}) =>{
    const imageurl = movie?`${API}/movie/photo/${movie.movie_id}`:"";
  return (
    <div  className="rounded   p-2">
        <img
            src={imageurl}
            alt = "movie"
            style={{ height: "100%", width: "100%%"  }}
            className="mb-3 rounded"
        />
    </div>
  )
}

export default  ImageHelperForMovie;