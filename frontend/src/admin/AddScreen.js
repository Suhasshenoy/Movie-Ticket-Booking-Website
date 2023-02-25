import { isAuthenticated } from '../auth/helper';
import React,{ useState,useEffect} from 'react'
import { createScreen } from './helper/adminapicalls';
import { getTheatres } from '../core/helper/coreapicalls';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';

const AddScreen = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        screen_no:"",
        no_of_seats:"",
        screen_type:"",
        theatre_id:"",
        theatres:[],
        loading: false,
        error: "",
        message:"",
        formData: new FormData()
    })

    const {screen_no,no_of_seats, screen_type, 
        theatre_id, theatres,loading, error,
    message, formData} = values;
    
    const preload = () => {
        getTheatres()
        .then(data=> {
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({...values,theatres:[...data]});
                // console.log(categories);
            }
        })
    }
    useEffect(()=> {
        preload();
    },[]);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createScreen(user.user_id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({
                    ...values,
                    screen_no:"",
                    no_of_seats:"",
                    screen_type:"",
                    theatre_id:"",
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
          <label className='mt-2'>Select Theatre</label>
          <div className="form-group mb-2 mt-2">
          
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
          <div className="form-group mb-2">
            <input
              onChange={handleChange("screen_no")}
              type="number"
              className="form-control"
              placeholder="Screen number"
              value={screen_no}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("no_of_seats")}
              name="no_of_seats"
              className="form-control"
              placeholder="Number of Seats"
              value={no_of_seats}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("screen_type")}
              name="screen_type"
              className="form-control"
              placeholder="Screen type"
              value={screen_type}
            />
          </div>
          

          
          
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4">
            Add Screen
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
export default AddScreen;