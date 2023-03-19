const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    title : {
        type: String,
        trim: true,
        required:true
    },
    description : {
        type: String,
        trim: true,
        required: true
    },
    user_id : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        trim: true
    },
    movie_id : {
        type: Number,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Review",reviewSchema);