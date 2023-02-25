import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Base from '../core/Base';
import { getTheatresWithMovie } from '../core/helper/coreapicalls';
import MovieDescription from './MovieDescription';
import TheatreCard from '../core/TheatreCard'


export default function Movie() {

  let {movieId} = useParams();

  const [values,setValues] = useState({
    theatres:[],
    error:""
  });
  const {theatres,error} = values;

  const preload = () => {
    getTheatresWithMovie(movieId)
    .then(data=> {
        if(data.error){
            setValues(prevValues=>({...prevValues,error:data.error}));
        }
        else{
          setValues(prevValues=>({...prevValues,theatres:[...data]}));
        }
    })
}
useEffect(()=> {
    preload();
},[]);

  const rightSide = () => {
    return <div className='text-white'>
      {theatres && theatres.map((theatre,index) => {
        return (
          <div key = {index} className='row'>
            <TheatreCard movieId = {movieId} theatre = {theatre} />
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
                  <h3 className='mb-3 text-warning'>Theatres with movie</h3>
                    {rightSide()}
                  </div>
              </div>



            </Base>

    
  )
}
