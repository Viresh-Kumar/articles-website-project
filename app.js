require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const routes = require("./routes/articles")

const app = express()

app.set("view engine", "ejs")

const dbURI = process.env.dbURI

const PORT = process.env.PORT || 3000

mongoose
    .connect(dbURI)
    .then(() => app.listen(PORT))
    .then(console.log("listening to port 3000..."))
    .catch((error) => console.log(error))

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.use("/", routes)

app.use((req, res) => {
    res.sendFile(path.resolve("views/404.html"))
})
