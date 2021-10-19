var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://airline-checkin-24383.firebaseio.com",
});

var db = admin.database();
var airlineRef = db.ref("airlinelist");
var userRef = db.ref("users");
var passengerRef = db.ref("passengers");

exports.getAirLineData = (req, res, next) => {
  airlineRef.once("value", function (snapshot) {
    res.send(snapshot.val());
    next();
  });
};

exports.postAirlineData = (req, res, next) => {
  airlineRef
    .orderByChild("flightnumber")
    .equalTo(req.body.flightId)
    .once("value", function (snapshot) {
      console.log(snapshot.val());
      if (snapshot.exists()) {
        snapshot.ref
          .child(Object.keys(snapshot.val())[0])
          .update(req.body.data);
      }
      res.send({ message: "success" });
      next();
    });
};

exports.getPassengersData = (req, res, next) => {
  console.log("req.params----------------->", req.params);
  passengerRef
    .orderByChild("flightId")
    .equalTo(req.params.id)
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        res.send(snapshot.val());
        next();
      } else {
        res.status(500);
        next();
      }
    });
};

exports.postUserData = (req, res, next) => {
  const email = req.body.email;
  userRef
    .orderByChild("email")
    .equalTo(email)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.send(snapshot.val());
        next();
      } else {
        const user = {
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          role: "user",
        };
        userRef.push(user);
        res.send({ created: user });
        next();
      }
    });
};

exports.postCheckedInData = (req, res, next) => {
  passengerRef
    .orderByChild("flightId_passport")
    .equalTo(req.body.flightId + "_" + req.body.passport)
    .once("value", function (snapshot) {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.ref
          .child(Object.keys(snapshot.val())[0])
          .update({ checkedIn: req.body.checkedIn });
      }
      res.send({ message: "success" });
      next();
    });
};

exports.postPassengerData = (req, res, next) => {
  passengerRef
    .orderByChild("flightId_passport")
    .equalTo(req.body.flightId + "_" + req.body.passport)
    .once("value", function (snapshot) {
      console.log(snapshot.val());
      if (req.body.data.seatNumber) {
        req.body.data.seatNumber = req.body.data.seatNumber.toUpperCase();
      }
      if (snapshot.exists()) {
        snapshot.ref
          .child(Object.keys(snapshot.val())[0])
          .update(req.body.data);
      } else {
        passengerRef.push(req.body.data);
      }
      res.send({ message: "success" });
      next();
    });
};
