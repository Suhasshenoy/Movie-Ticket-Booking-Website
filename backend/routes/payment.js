const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router = express.Router();


const {makepayment} = require("../controllers/payment");
const { getShowById } = require("../controllers/show");
const { getTheatreById } = require("../controllers/theatre");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("showId",getShowById);
router.param("theatreId",getTheatreById);

router.post("/stripepayment/:userId/:showId",isSignedIn,isAuthenticated,makepayment)

module.exports = router;