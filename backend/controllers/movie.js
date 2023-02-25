const Movie = require("../models/Movie");
const formidable = require("formidable");
const MoviePic = require("../models/MoviePic");
const fs = require("fs")

exports.getMovieById =  async (req,res,next,id) => {

    try{
        let [result, a] = await Movie.findById(id);
        let movie = result[0];
        req.movie = movie;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "MOVIE WITH GIVEN ID WAS NOT FOUND"
        });
    }
}

exports.createMovie =  (req,res) => {
    
    
    let form = formidable({ multiples: true });

    form.parse(req,async(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        const {movie_name,description,duration,rating,genre,director} =fields;
        if(!movie_name || !description || !duration || !genre || !director){
            return res.status(400).json({
                error:" Please include all fields"
            });
        }


        try {
            

            let movie = new Movie(movie_name,description,duration,rating,genre,director);

            movie =  await movie.save();
            let movie_id = movie[0].insertId;
            let moviePic = new MoviePic({movie_id});

            if(file.photo){
                if(file.photo.size >3000000){
                    return res.status(400).json({
                        error:"File size too big!"
                    });
                }
                moviePic.photo.data = fs.readFileSync(file.photo.path);
                moviePic.photo.contentType = file.photo.type;
            }
            moviePic.save((err,moviePic) => {
                if(err){
                    return res.status(400).json({
                        error: "Saving moviePic to DB failed"
                    });
                }
                
            })

            return res.json({
                message:"movie added successfully"
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                
                error:"NOT able to add movie to DB"
            });
        }
    });
}

exports.getMovie = (req,res) => {
    return res.json(req.movie);
}

exports.photo = (req,res) => {
    let movie_id = req.movie.movie_id;
    MoviePic.findOne({movie_id:movie_id},(err,result) => {
        res.set("Content-Type",result.photo.contentType);
        return res.send(result.photo.data);
    });
    
}


exports.getAllMovies = async (req,res) => {

    try{
        let [result, a]  = await Movie.getAllMovies();
        return res.json(result);
    }
    catch(err){
        return res.json(400).json({
            error: "NO movies FOUND"
        });
    }
}

exports.deleteMovie = async (req,res) => {
    try{
        let result = await Movie.deleteMovie(req.movie);
        
        return res.status(200).json({
            message:"Successfully deleted the movie"
        })
    }
    catch(err){
        return res.status(400).json({
            error: "Failed to delete the product"
        }) 
    }
}