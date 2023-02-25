import React,{useState,useEffect} from 'react'
import Base from './Base';
import Card from "./Card";
import { getMovies } from './helper/coreapicalls';

const Home = () => {

  const [movies,setMovies] = useState([]);
  // const [error,setError] = useState(false);

  const loadAllMovies = () => {
    getMovies()
    .then(data => {
      // if(data.error){
      //   setError(data.error)
      // }
      setMovies(data);
    });
  }
  useEffect( () => {
    loadAllMovies();
  },[])

  return (
    <Base title = "Recommended Movies">
        <div className="row">
            {movies.map((movie,index) => {
              return (
                <div key = {index} className="col-3 mb-4">
                  <Card movie={movie}/>
                </div>
              )
            })}
          </div>
    </Base>
  )
}

export default  Home;