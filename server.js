// Dependencies 
require("dotenv").config()

const express = require("express")
const app = express()
const { PORT = 3001 , DATABASE_URL } = process.env
const mongoose = require("mongoose")
const logger = require("morgan")
const cors = require("cors")

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL)

mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

// MODELS
const BarberSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const Barbers = mongoose.model("Barbers", BarberSchema)

// Middleware
app.use(cors())
app.use(logger("dev"))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("working")
})

// IDUCS

// Index
app.get("/barbers", async (req, res) => {
    try{
        res.json(await Barbers.find({}));
    } catch(err) {
        res.status(400).json(err)
    }
})

//Delete
app.delete("/barbers/:id", async (req, res) => {
    try{
        res.json( await Barbers.findByIdAndDelete(req.params.id))
    } catch(err) {
        res.status(400).json(err) 
    }
})
// get - barbers/:id

//get - barbers/new

//Update
app.put("/barbers/:id", async (req, res) => {
    try{
        res.json( await Barbers.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch(err) {
        res.status(400).json(err)
    }
})

// Create
app.post("/barbers", async (req, res) => {
    try {
        //do this code
        res.json(await Barbers.create(req.body))
    } catch (err) {
        res.status(400).json(err)
        // do this code if try fails
    }
})

// Show
 
app.get("/barbers/:id", async (req, res) => {
    try {
        res.json( await Barbers.findById(req.params.id))
    } catch(err) {
        res.status(400).json(err)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})