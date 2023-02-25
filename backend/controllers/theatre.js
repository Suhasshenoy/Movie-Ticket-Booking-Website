const Theatre = require("../models/Theatre");
const formidable = require("formidable");

exports.getTheatreById =  async (req,res,next,id) => {

    try{
        let [result, a] = await Theatre.findById(id);
        let theatre = result[0];
        req.theatre = theatre;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "THEATRE WITH GIVEN ID WAS NOT FOUND"
        });
    }
}

exports.createTheatre = (req,res) => {
    let form = formidable({ multiples: true });
    form.parse(req,async(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        const {name,description,city,address,no_of_screens} =fields;
        if(!name || !description || !city || !address || !no_of_screens){
            return res.status(400).json({
                error:" Please include all fields"
            });
        }
        try {

            let theatre = new Theatre(name,description,city,address,no_of_screens);

            theatre =  await theatre.save();
            return res.json({
                message:"theatre added successfully"
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                
                error:"NOT able to add theatre to DB"
            });
        }
    });

}

exports.getTheatre = (req,res) => {
    return res.json(req.theatre);
}

exports.getAllTheatres = async (req,res) => {

    try{
        let [result, a]  = await Theatre.getAllTheatres();
        return res.json(result);
    }
    catch(err){
      
        return res.json(400).json({
            error: "NO Theatres FOUND"
        });
    }
}



exports.getTheatresWithMovie = async (req,res) => {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let date = `${yyyy}-${mm}-${dd}`;
        
    let hh = d.getHours();
    let min = d.getMinutes();
    let ss = d.getSeconds();
    let time = `${hh}:${min}:${ss}`;

    // console.log(date,time);
    try{
        let [result, a]  = await Theatre.getTheatresWithMovie(req.movie.movie_id,date,time);
        return res.json(result);
    }
    catch(err){
        console.log(err);
        return res.json(400).json({
            error: "NO Theatres with MOVIE FOUND"
        });
    }
}