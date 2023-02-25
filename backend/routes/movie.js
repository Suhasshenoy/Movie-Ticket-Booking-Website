const express = require("express");
const router = express.Router();

const {
    getMovieById,
    createMovie,
    getMovie,
    deleteMovie,
    photo,
    // updateMovie,
    getAllMovies
} = require("../controllers/movie");

const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");

router.param("userId", getUserById);
router.param("movieId", getMovieById);

//create
router.post("/movie/create/:userId", isSignedIn, isAuthenticated, isAdmin, createMovie);

//read
router.get("/movie/:movieId",getMovie);
router.get("/movie/photo/:movieId",photo)
router.get("/movies",getAllMovies);

//delete 
router.delete("/movie/:movieId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteMovie);

//update route
// router.put("/movie/:movieId/:userId", isSignedIn, isAuthenticated, isAdmin, updateMovie);

module.exports = router;