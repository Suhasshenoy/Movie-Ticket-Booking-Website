const express = require("express");
const router = express.Router();

const {getTheatreById,
    createTheatre,
    getTheatre,
    getAllTheatres,
    getTheatresWithMovie
} = require("../controllers/theatre");

const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");

const { getMovieById } = require("../controllers/movie");

router.param("userId", getUserById);
router.param("movieId",getMovieById);
router.param("theatreId",getTheatreById);

//create
router.post("/theatre/create/:userId", isSignedIn, isAuthenticated, isAdmin, createTheatre);

//read
router.get("/theatre/:theatreId",getTheatre);
router.get("/theatres",getAllTheatres);


router.get("/theatres/:movieId",getTheatresWithMovie)

module.exports = router;

