require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const cors = require ('cors');
const Travel = require("./models/travelThingsdb");
const TravelThings = require("./data/TravelThingsData");
const travelThingsController = require('./controllers/travelThings')
app.use(cors({ origin: '*' }));
const db = mongoose.connection


;
//#region //GLOBAL CONFIGURATION
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connect to mongo");
});
//#endregion

//MIDDLEWARE
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static("public")); // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors());

// // Environmental Varibles
// const app = express();
// const mongoURI = process.env.MONGO_URI
// const PORT = process.env.PORT || 3001
  
//TO MAKE SURE THE NODEMON IS RUNNING
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

app.use("/travel",travelThingsController)


app.get('/seed', async (req, res) => {
    await Travel.deleteMany({});
    await Travel.insertMany(TravelThings);
    res.send('done!');
  })

app.listen(3001, () => {
    console.log('listening');
})

// //#region SEEDING DATA TO MONGO
// //TESTER FOR MONGOOSE
// db.on("error", (err) => console.log(err.message + " is mongod not running?"));
// db.on("open", () => console.log("mongo connected: ", mongoURI));
// db.on("close", () => console.log("mongo disconnected"));

// // // //THIS CODE WAS ALSO USED TO CONNECT DATA TO MONGO DB
// Travel.insertMany(TravelThings)
// // if database transaction succeeds
// .then((travelThingsData) => {
//   console.log(travelThingsData)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
// //  db.close()
// })

