import { API } from "../../backend";

//route -/movie/create/:userId
export const createMovie = (userId,token,movie) => {
    return fetch(`${API}/movie/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: movie
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//route -/movie/:movieId/:userId
export const deleteMovie = (movieId,userId,token) => {
    return fetch(`${API}/movie/${movieId}/${userId}`,{
        method:"DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
//route- /screen/create/:userId
export const createScreen = (userId,token,screen) => {
    return fetch(`${API}/screen/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: screen
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//create -/show/create/:userId
export const createShow = (userId,token,show) => {
    return fetch(`${API}/show/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: show
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//delete - /show/:showId/:userId
export const deleteShow = (showId,userId,token) => {
    return fetch(`${API}/show/${showId}/${userId}`,{
        method:"DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//update - /show/:showId/:userId
export const updateProduct = (showId,userId,token,show) => {
    return fetch(`${API}/show/${showId}/${userId}`,{
        method:"PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: show

    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//route - /theatre/create/:userId
export const createTheatre = (userId,token,theatre) => {
    return fetch(`${API}/theatre/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:theatre
        
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

