import React from "react";


const ReviewCard = ({review}) => {
    
    
    return (
        <div style={{background:"#000000"}} className="card  mb-3 border-white">
            <div className="card-header p-2 text-warning border-white ">
                {review.name}
            </div>
            <div className="card-body">
                <h5 className="card-title text-warning">{review.title}</h5>
                <p className="card-text">{review.description}</p>
    
            </div>
        </div>
    );
}

export default ReviewCard;