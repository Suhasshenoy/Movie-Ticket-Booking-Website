const express = require("express");
const router = express.Router();

const {postReview , getReviewsForAMovie} = require("../controllers/review");

const {
    isSignedIn,
    isAuthenticated,
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");
const { getMovieById } = require("../controllers/movie");

router.param("userId", getUserById);
router.param("movieId",getMovieById);

router.post("/review/post/:userId/:movieId", isSignedIn, isAuthenticated, postReview);


router.get("/reviews/:movieId",getReviewsForAMovie);

module.exports = router;