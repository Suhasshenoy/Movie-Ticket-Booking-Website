import { API } from "../../backend";

export const getMovies = () => {
    return fetch(`${API}/movies`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}
export const getTheatres = () => {
    return fetch(`${API}/theatres`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
//ROUTE -/screens/:theatreId
export const getScreenInTheatre = (theatreId) => {
    return fetch(`${API}/screens/${theatreId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//get a movie - route -/movie/:movieId

export const getAMovie = (movieId) => {
    return fetch(`${API}/movie/${movieId}`,{
        method:"GET"
    })
    .then(response => {

        return response.json();
    })
    .catch(err => console.log(err));
}
//get theatres with a movie - /theatres/:movieId
export const getTheatresWithMovie = (movieId) => {
    return fetch(`${API}/theatres/${movieId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
// route- /shows/:movieId/:theatreId
export const getShowsWithMovieTheatre = (movieId,theatreId) => {
    return fetch(`${API}/shows/${movieId}/${theatreId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
export const getATheatre = (theatreId) => {
    return fetch(`${API}/theatre/${theatreId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getReviewsForMovie = (movieId) => {
    return fetch(`${API}/reviews/${movieId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//route- /review/post/:userId/:movieId
export const postReview = (userId,movieId,review,token) => {
    return fetch(`${API}/review/post/${userId}/${movieId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(review)
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getShow = (showId) => {
    return fetch(`${API}/show/${showId}`,{
        method:"GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const paymentStripe = (seats,paymentToken,userId,signinToken,showId) =>{
    const body = {
        paymentToken,
        seats
    }
    const headers = {
        Accept: "application/json",
        "Content-Type" :"application/json",
        Authorization: `Bearer ${signinToken}`
    }
    console.log("HI");
    return fetch(`${API}/stripepayment/${userId}/${showId}`,{
        method: "POST",
        headers,
        body : JSON.stringify(body)
    })
    .then(response => {
        console.log(response)
        return response.json();

    })
    .catch(err => console.log(err))
}
///book/seat/:showId/:userId
// body -  let seat_ids = req.body.seat_ids;
    // let no_of_seats = seat_ids.length;
export const bookSeats = (userId,showId,seat_ids,token) => {
    return fetch(`${API}/book/seat/${showId}/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({seat_ids})
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}   
