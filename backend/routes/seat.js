const express = require("express");
const router = express.Router();

const {getSeatById,bookSeat,getCost} = require("../controllers/seat");

const {
    isSignedIn,
    isAuthenticated
} = require("../controllers/auth");

const {
    getUserById
} = require("../controllers/user");

const {getShowById} = require("../controllers/show");

router.param("userId", getUserById);
router.param("seatId",getSeatById);
router.param("showId",getShowById);




router.get("/seat/cost/:showId",isSignedIn,isAuthenticated,getCost);

router.post("/book/seat/:showId/:userId",isSignedIn,isAuthenticated,bookSeat);

module.exports = router;