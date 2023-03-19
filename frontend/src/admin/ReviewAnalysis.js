
import React,{ useState,useEffect} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import Base from '../core/Base';
import LeftMenu from './LeftMenu';
import { getMovies, getReviewsForMovie } from '../core/helper/coreapicalls';
import {withRouter } from 'react-router-dom';
import "../user/seatstyles.css"

const ReviewAnalysis = (props) => {



    const [values,setValues] = useState({
        movie_id:"",
        movies:[],
        reviews:[],
        positive:0,
        negative:0,
        nuetral:0,
        loading: false,
        submit:false,
        error: "",
        message:"",
        formData: new FormData()
    })
    


    const {movie_id, movies,reviews,positive, negative, 
        nuetral, loading,submit, error,
    message, formData} = values;

    const preload1 =  () => {
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
    const preload2 = (movie_id) => {
        getReviewsForMovie(movie_id)
        .then(data=>{
            if(data.error){
                setValues(prevValues=>({...prevValues,error:data.error}));
            }
            else{
                
                setValues(prevValues=>({...prevValues,reviews:[...data]}));
            }
        })
    }

    useEffect(()=> {
        preload1();
    },[]);

    useEffect(()=> {
        preload2(movie_id);
    },[movie_id]);

    const onSubmit = (event) => {
        event.preventDefault();
        setValues(prevValues =>({...prevValues,error:"",loading:true}))
        let p = 0;
        let n = 0;
        let nu = 0;
        reviews.forEach((review)=>{
            if(review.score>0){
                p = p+1;
            }
            else if(review.score === 0){
                nu = nu+1;
            }
            else{
                n = n+1;
            }
        });
        setValues(prevValues=>({
            ...prevValues,
            loading:false,
            submit:true,
            positive:p,
            negative:n,
            nuetral:nu
        }));

    }
    
    const handleChange = name => event => {
        const value = event.target.value;
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
        <label className='mt-2'>Select Movie to Analyze</label>

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
         
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark mb-4 mt-2">
            Analyze Movie Reviews
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
                      
                     
                    

                    <div className='col-6 offset-md-3' style={{display: submit ?"":"none"}}>
                        <PieChart
                            data={[
                                { title: 'One',value: positive, color: '#E38627' },
                                { title: 'Two', value: negative, color: '#C13C37' },
                                { title: 'Three', value: nuetral, color: '#cd5c5c	' },
                            ]}
                            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                            labelStyle={{
                                fontSize:'5px',
                                fontFamily:'sans-serif'
                            }}
                            
                        />
                        <div className='seats mt-5 offset-md-2'>
                            <span
                                tabIndex="0"
                                style = {{backgroundColor:"#E38627"}}
                                className='seat'
                            />
                            <span style = {{color:"#E38627"}} className='ps-3 pe-3'>Positive</span>
                            <span
                                tabIndex="0"
                                style = {{backgroundColor:'#C13C37'}}
                                className='seat'
                            />
                            <span style = {{color:"#C13C37"}} className='ps-3 pe-3'>Negative</span>
                            <span
                                tabIndex="0"
                                style = {{backgroundColor:'#cd5c5c'}}
                                className='seat ps-3'
                            />
                            <span style = {{color:"#cd5c5c"}} className='ps-3'>Neutral</span>
                        </div>
                    </div>
                    
                       
                    
                  </div>
              </div>

            </Base>
        )
    
}
export default withRouter(ReviewAnalysis);
    