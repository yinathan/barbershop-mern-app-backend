// Dependencies 
require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const logger = require("morgan")
const DATABASE_URL = process.env.DATABASE_URL





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})