const express = require("express");

const middleware = require("./middleware");
const router = express.Router();

router.get("/", middleware.getAirLineData);

router.post('/airlinelist/editedData', middleware.postAirlineData);

router.post("/user", middleware.postUserData);

router.get("/passengers/:id", middleware.getPassengersData);

router.post('/passengers/checkedIn', middleware.postCheckedInData);

router.post('/passengers/editedData', middleware.postPassengerData);

module.exports = router;