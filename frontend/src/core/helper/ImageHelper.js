import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({movie}) =>{
    const imageurl = movie?`${API}/movie/photo/${movie.movie_id}`:"";
  return (
    <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}  className="rounded border border-dark p-2">
        <img
            src={imageurl}
            alt = "movie"
            style={{ height: "250px", width: "60%"  }}
            className="mb-3 rounded"
        />
    </div>
  )
}

export default  ImageHelper;