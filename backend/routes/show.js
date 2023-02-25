const express = require("express");
const router = express.Router();

const {getShowById,
    createShow,
    deleteShow,
    updateShow,
    getShow,
    getShowsForMovieTheatre
} = require("../controllers/show");

const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");

const { getMovieById } = require("../controllers/movie");
const { getTheatreById } = require("../controllers/theatre");

router.param("userId", getUserById);
router.param("movieId",getMovieById);
router.param("theatreId",getTheatreById);
router.param("showId",getShowById);

//create
router.post("/show/create/:userId", isSignedIn, isAuthenticated, isAdmin, createShow);

//delete
router.delete("/show/:showId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteShow);

//update
router.put("/show/:showId/:userId", isSignedIn, isAuthenticated, isAdmin, updateShow);

//read
router.get("/show/:showId",getShow);
router.get("/shows/:movieId/:theatreId",getShowsForMovieTheatre);

module.exports = router;