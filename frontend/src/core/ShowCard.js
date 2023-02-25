import React from "react";
import {Link } from "react-router-dom";





const ShowCard = ({show,theatreId}) => {
   
    const  tConvert  = (time) => {
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
    return (
        <div className="bg-dark card text-white border-white mb-3">
            <div className="card-body">
                
                <h5 className="card-title text-warning">{formatDate(show.date_of_show)}</h5>
    
                <p className="card-text">Time of Show: {removeSeconds(tConvert(show.time_of_show))}</p>
                <p className="card-text">Language: {show.language}</p>
                <p className="card-text">Seat Cost Rs. {show.cost}</p>
                <Link className="col-6" to = {`/select/seat/${show.show_id}/${theatreId}/${show.movie_id}`}>
                    <button  className ="btn  btn-block btn-warning mt-2 mb-2">Select seat</button>
                </Link>
            </div>
        </div>
    );
}

export default ShowCard;