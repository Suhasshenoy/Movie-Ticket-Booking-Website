import React, { useState,useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import Base from "../core/Base";
import { getShow,getATheatre,getAMovie, bookSeats } from "../core/helper/coreapicalls";
import "./seatstyles.css"
import clsx from "clsx";
import { isAuthenticated } from "../auth/helper";
import StripeCheck from "../core/StripeCheck";

function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>N/A</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    );
  }

const  Cinema = ({ seats, selectedSeatIds, onSelectedSeatsChange }) =>{
    const handleSelectedState = (seatId) =>{
      const isSelected = selectedSeatIds.includes(seatId);
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeatIds.filter((selectedSeatId) => selectedSeatId !== seatId)
        );
      } else {
        onSelectedSeatsChange([...selectedSeatIds, seatId]);
      }
    }
  
    return (
      <div className="Cinema">
        <div className="screen" />
  
        <div className="seats">
          {seats.map((seat,index) => {
            const isSelected = selectedSeatIds.includes(seat.seat_id);
            const isOccupied = seat.isBooked;
            return (
              <span
                tabIndex="0"
                key={index}
                className={clsx(
                  "seat",
                  isSelected && "selected",
                  isOccupied && "occupied"
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat.seat_id)}
                
                
              />
            );
          })}
        </div>
      </div>
    );
  }

const SeatsForShow = () => {
    const {movieId,theatreId,showId} = useParams();
    const [values,setValues] = useState({
        theatre:"",
        movie:"",
        show:"",
        seats:[]
    });
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    const [paymentMade,setPaymentMade] = useState(false);
    const [redirect,setRedirect] = useState(false);

    const{show,seats,theatre,movie} = values;


    const {user,token} = isAuthenticated();

    const preload = () => {
        getShow(showId)
        .then(data=> {
            if(data.error){
                console.log(data.error);
            }
            else{
                setValues(prevValues=>({
                    ...prevValues,
                    show:data.showDetails,
                    seats:[...data.seats]
                }))
            }
        })
    }
    const preload1 = () => {
        getATheatre(theatreId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setValues(prevValues=>({
                    ...prevValues,
                    theatre:data
                }))
            }
        })
    }

    const preload2 = () => {
        getAMovie(movieId)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{

                setValues(prevValues=>({
                    ...prevValues,
                    movie:data
                }))
                
            }
        })
    }

    useEffect(()=> {
        preload();
        preload1();
        preload2();

    },[]);

    const  tConvert  = (time) => {
        if(!time){
            return "";
        }
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { 
          time = time.slice (1);  
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; 
          time[0] = +time[0] % 12 || 12; 
        }
        return time.join ('');
      }
      const removeSeconds = (time) => {
        let length = time.length;
        let flag = 0;
        let ans = "";
        for(let i = 0;i<length;i++){
            if(time[i]===":" && flag ===1){
                break;
            }
            if(time[i] ===":"){
                flag=1;
            }
            ans = ans+ time[i];
        }
        ans = ans+ " "+time.substring(length-2);
        return ans;

      }
      const formatDate = (d) => {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var t = new Date(d);
          return t.getDate()+'-'+monthNames[t.getMonth()]+'-'+t.getFullYear();
      }

      const handlePayment = () => {
        if(paymentMade){
          bookSeats(user.user_id,showId,selectedSeatIds,token)
          .then(response =>{
            setPaymentMade(false);
            setSelectedSeatIds([]);
            setRedirect(true);
          })
        }
      }
      const getRedirect = () => {
        if(redirect){
          return <Redirect to={`/ticket/booked/${movieId}`} />
        }
      }

      const alertUser = () => {
        
          return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
            
                    <div className="alert alert-dark" style={{display:paymentMade?"":"none"}}>
                        Processing your payment... Please wait...
                        
                    </div>
                </div>
            </div>
        );
        
      }
        
                
        
    return(
                    
        <Base title={`${movie.movie_name?movie.movie_name:""}`}>
            {getRedirect()}
            <div className="row text-center ">
               <div className="col-3">
                    <strong>Theatre Name:</strong> {theatre.name}
               </div>
               <div className="col-3">
                    <strong>Show Date:</strong> {formatDate(show.date_of_show)}
               </div>
               <div className="col-3">
                    <strong>Show Time:</strong> {removeSeconds(tConvert(show.time_of_show))}
               </div>
               <div className="col-3">
                    <strong>Cost per seat:</strong> &#8377;{show.cost}
               </div>
            </div>
            {handlePayment()}
            {alertUser()}
            
            <div className="App  mt-5">
            <ShowCase />
                <Cinema
                    seats={seats}
                    selectedSeatIds={selectedSeatIds}
                    onSelectedSeatsChange={(selectedSeatIds) =>
                    setSelectedSeatIds(selectedSeatIds)
                    }
                />

                <p className="info mt-2">
                    You have selected <span className="text-warning">{selectedSeatIds.length}</span>{" "}
                    seats for the price of{" "}
                    <span className="text-warning">&#8377;{selectedSeatIds.length * show.cost}</span>
                    <br />
                    <StripeCheck 
                        selectedSeatIds={selectedSeatIds}          
                        setPaymentMade = {setPaymentMade}

                        show = {show}
                    />
                </p>
            </div>


        </Base>
    )



}

export default SeatsForShow;