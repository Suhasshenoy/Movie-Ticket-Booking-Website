import { isAuthenticated } from '../auth/helper';
import React,{ useState} from 'react'
import { createMovie } from './helper/adminapicalls';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';

const AddMovie = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        movie_name:"",
        description:"",
        duration:"",
        rating:"",
        genre:"",
        director:"",
        loading: false,
        error: "",
        message:"",
        formData: new FormData()
    })

    const {movie_name,description, duration, 
    rating, genre, director, loading, error,
    message, formData} = values;

   

   

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createMovie(user.user_id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({
                    ...values,
                    movie_name:"",
                    description:"",
                    duration:"",
                    rating:"",
                    genre:"",
                    director:"",
                    loading:false,
                    message:data.message
                })
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
    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-dark form-label">
              <input
                className='form-control'
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("movie_name")}
              name="name"
              className="form-control"
              placeholder="Movie Name"
              value={movie_name}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("description")}
              name="description"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("duration")}
              type="number"
              className="form-control"
              placeholder="Duration"
              value={duration}
            />
          </div>
          
          <div className="form-group mb-2">
            <input
              onChange={handleChange("rating")}
              type="number"
              className="form-control"
              placeholder="Rating"
              value={rating}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("genre")}
              name="genre"
              className="form-control"
              placeholder="Genre"
              value={genre}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("director")}
              name="director"
              className="form-control"
              placeholder="Director"
              value={director}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4">
            Add Movie
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
                      {loadingMessage()}
                      {erorMessage()}
                      {successMessage()}
                      {createProductForm()}
                  </div>
              </div>

            </Base>
        )
    
}
export default AddMovie;