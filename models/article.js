const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Author name must be provided"],
        },
        genre: {
            type: String,
        },
        title: {
            type: String,
            required: [true, "Article title must be provided"],
        },
        snippet: {
            type: String,
            required: [true, "Article snippet must be provided"],
        },
        body: {
            type: String,
            required: [true, "Article body must be provided"],
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Article", articleSchema)
