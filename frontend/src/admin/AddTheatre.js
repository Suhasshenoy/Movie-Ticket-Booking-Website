import { isAuthenticated } from '../auth/helper';
import React,{ useState} from 'react'
import { createTheatre } from './helper/adminapicalls';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';

const AddTheatre = () => {

    const {user,token} = isAuthenticated();

    const [values,setValues] = useState({
        name:"",
        description:"",
        city:"",
        address:"",
        no_of_screens:"",
        loading: false,
        error: "",
        message:"",
        formData: new FormData()
    })

    const {name,description, city, 
        address, no_of_screens, loading, error,
    message, formData} = values;

   

   

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:"",loading:true})
        createTheatre(user.user_id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }
            else{
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    city:"",
                    address:"",
                    no_of_screens:"",
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
          
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Theatre Name"
              value={name}
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
              onChange={handleChange("city")}
              name="city"
              className="form-control"
              placeholder="City"
              value={city}
            />
          </div>
          
          <div className="form-group mb-2">
            <input
              onChange={handleChange("address")}
              name="address"
              className="form-control"
              placeholder="Address"
              value={address}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("no_of_screens")}
              type="number"
              className="form-control"
              placeholder="Number of Screens"
              value={no_of_screens}
            />
          </div>
          
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4">
            Add Theatre
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
export default AddTheatre;