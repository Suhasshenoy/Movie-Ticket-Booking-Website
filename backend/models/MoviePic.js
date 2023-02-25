const mongoose = require("mongoose");

const moviePicSchema = new mongoose.Schema({
    movie_id: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},
{timestamps:true}
);

module.exports = mongoose.model("MoviePic",moviePicSchema);