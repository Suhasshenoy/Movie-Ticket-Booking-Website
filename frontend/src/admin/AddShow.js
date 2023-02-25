import { isAuthenticated } from '../auth/helper';
import React,{ useState,useEffect} from 'react'
import { createShow } from './helper/adminapicalls';
import { getMovies,getTheatres,getScreenInTheatre } from '../core/helper/coreapicalls';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';

const AddShow = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        movie_id:"",
        theatre_id:"",
        screen_id:"",
        cost:"",
        date_of_show:"",
        time_of_show:"",
        movies:[],
        theatres:[],
        screens:[],
        language:"",
        loading: false,
        error: "",
        message:"",
        formData: new FormData()
    })

    const {movie_id,theatre_id, screen_id,cost,
        date_of_show, time_of_show,movies,theatres,screens,language, loading, error,
    message, formData} = values;
    
    const preload0 =  () => {
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

    const preload1 =  () => {

        getTheatres()
        .then(data=> {
            
            if(data.error){
                console.log("THEATRES");
                setValues(prevValues=>({...prevValues,error:data.error}));
            }
            else{
                setValues(prevValues=>({...prevValues,theatres:[...data]}));
                // console.log(categories);

            }
        })
    }
    const preload2 = (theatre_id) => {
        getScreenInTheatre(theatre_id)
        .then(data=> {
            if(data.error){
                setValues(prevValues=>({...prevValues,error:data.error}));
            }
            else{
                
                setValues(prevValues=>({...prevValues,screens:[...data]}));
                
            }
        })
    }
    useEffect(()=> {
        preload0();
        preload1();
    },[]);
    
    


    useEffect(()=>{
        preload2(theatre_id);
    },[theatre_id])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createShow(user.user_id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({
                    ...values,
                    movie_id:"",
                    theatre_id:"",
                    screen_id:"",
                    date_of_show:"",
                    time_of_show:"",
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
          <label className='mt-2'>Select Movie</label>
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

          <label className='mt-2'>Select Theatre</label>

          <div className="form-group mb-2">
            <select
              onChange={handleChange("theatre_id")}
              className="form-control"
              placeholder="Theatre"
              value={theatre_id}
              
            >
              <option>Select</option>
              {theatres &&
                theatres.map((t,index) => {
                    return(
                        <option  key={index} value={t.theatre_id}>
                            {t.name}
                        </option>
                    )
                })
              }
            </select>
          </div>

          <label className='mt-1'>Select Screen</label>
          <div className="form-group mb-2">
            <select
              onChange={handleChange("screen_id")}
              className="form-control"
              placeholder="Screen"
              value={screen_id}
              
            >
              <option>Select</option>
              {screens &&
                screens.map((screen,index) => {
                    return(
                        <option  key={index} value={screen.screen_id}>
                            {screen.screen_no}
                        </option>
                    )
                })
              }
            </select>
          </div>


          <div className="form-group mb-2">
            <input
              onChange={handleChange("cost")}
              type="number"
              className="form-control"
              placeholder="Cost"
              value={cost}
            />
          </div>

          
          <div className="form-group mb-2">
            <input
              onChange={handleChange("date_of_show")}
              name="date_of_show"
              className="form-control"
              placeholder="Date of Show"
              value={date_of_show}
            />
          </div>

          <div className="form-group mb-2">
            <input
              onChange={handleChange("time_of_show")}
              name="time_of_show"
              className="form-control"
              placeholder="Time of Show"
              value={time_of_show}
            />
          </div>

          <div className="form-group mb-2">
            <input
              onChange={handleChange("language")}
              name="language"
              className="form-control"
              placeholder="Language"
              value={language}
            />
          </div>
          
          
          
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4">
            Add Show
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
export default AddShow;