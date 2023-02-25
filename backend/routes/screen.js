const express = require("express");
const router = express.Router();

const {getScreenById,createScreen,getScreen,getScreensInTheatre} = require("../controllers/screen");
const {getTheatreById}  = require("../controllers/theatre");
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");

router.param("userId", getUserById);
router.param("theatreId",getTheatreById);
router.param("screenId",getScreenById);

//create 
router.post("/screen/create/:userId", isSignedIn, isAuthenticated, isAdmin, createScreen);

//read
router.get("/screen/:screenId",getScreen);
router.get("/screens/:theatreId",getScreensInTheatre);



module.exports = router;