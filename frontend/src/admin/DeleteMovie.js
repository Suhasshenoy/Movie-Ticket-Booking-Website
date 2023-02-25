import { isAuthenticated } from '../auth/helper';
import React,{ useState,useEffect} from 'react'
import { deleteMovie } from './helper/adminapicalls';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';
import { getMovies } from '../core/helper/coreapicalls';
import {Redirect, withRouter } from 'react-router-dom';


const DeleteMovie = (props) => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        movie_id:"",
        movies:[],
        loading: false,
        error: "",
        message:"",
        didRedirect:false,
        formData: new FormData()
    })
    const [redirect,setRedirect] = useState(false);

    const {movie_id, movies, loading, error,didRedirect,
    message, formData} = values;

    const preload =  () => {
        getMovies()
        .then(data=> {
            
            if(data.error){
                setValues(prevValues=>({...prevValues,error:data.error}));
            }
            else{
                
                setValues(prevValues=>({...prevValues,movies:[...data]}));
            }
        })
    }

    useEffect(()=> {
        preload();
    },[]);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues(prevValues =>({...prevValues,error:"",loading:true}))
        deleteMovie(movie_id,user.user_id,token)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues(prevValues=>({
                    ...prevValues,
                    movie_id:"",
                    loading:false,
                    didRedirect:true,
                    message:data.message
                }))
            }
        })
    }
    
    const handleChange = name => event => {
        const value = name=== "photo"?event.target.files[0]:event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})
    }

    const successMessage = () => (
        <div className="alert alert-dark mt-3"
            style={{display: message ?"":"none"}}
        >
            {message}

        </div>
    );
    const loadingMessage = () => (
        <div className="alert alert-dark mt-3"
            style={{display: loading ?"":"none"}}
        >
            Loading...

        </div>
    );
    const erorMessage = () => (
        <div className="alert alert-danger mt-3"
            style={{display: error ?"":"none"}}
        >
            {error}

        </div>
    );
   
    const getRedirect1 = () => {
        if(redirect){
            return <Redirect to = "/admin/add/movie" />
        }
    }
    
    const getRedirect =  () => {
        if(didRedirect){
          
             setTimeout(()=>{
                setRedirect(true);
            },3000)
            
        }
    }
    const createProductForm = () => (
        <form >
        <label className='mt-2'>Select Movie to delete</label>

        <div className="form-group mb-2">
        <select
            onChange={handleChange("movie_id")}
            className="form-control"
            placeholder="Movie"
            value={movie_id}
            
        >
            <option>Select</option>
            {movies &&
            movies.map((movie,index) => {
                return(
                    <option  key={index} value={movie.movie_id}>
                        {movie.movie_name}
                    </option>
                )
            })
            }
        </select>
        </div>
         
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4">
            Delete Movie
          </button>
        </form>
      );
      

        return (

            <Base > 
                
            
              <div className="row  text-white rounded">
                  <div className='col-2'>
                      <LeftMenu />
                  </div>
              
                  <div className="col-7 offset-md-1">
                      {getRedirect1()}
                      {getRedirect()}

                      {loadingMessage()}
                      {erorMessage()}
                      {successMessage()}
                      {createProductForm()}
                  </div>
              </div>

            </Base>
        )
    
}
export default withRouter(DeleteMovie);
    