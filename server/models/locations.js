const mongoose = require("mongoose");
const location = new mongoose.Schema({

    continent: {
        type: String,
        require: true,
        min: 5,
        max: 30
    },
    country: {
        type: String,
        require: true,
        min: 3,
        max: 100
    },
    city: {
        type: String,
        require: true,
        min: 3,
        max: 100
    },
    name: {
        type: String,
        require: false,
        min: 3,
        max: 255,
    },
    visited: {
        type: Boolean,
        require: true
    },
    blogPosts: {
        type: Array,
        require: false
    },
    keywords: {
        type: Array,
        require: false
    },
    year: {
        type: String,
        require: false,
        min: 4,
        max: 12,
    },
    month: {
        type: String,
        require: false,
        min: 3,
        max: 50,
    },
    bucketPriority: {
        type: Number,
        require: false,
        default: -1
    },
    notes: {
        type: String,
        require: false,
    }
});

module.exports = mongoose.model("Model", location, "Locations");