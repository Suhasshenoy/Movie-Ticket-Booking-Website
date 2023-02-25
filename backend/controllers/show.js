const Show = require("../models/Show");
const formidable = require("formidable");
const Screen = require("../models/Screen");
const Seat = require("../models/Seat");

exports.getShowById =  async (req,res,next,id) => {

    try{
        let [result, a] = await Show.findById(id);
        let show = result[0];
        req.show = show;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "SHOW WITH GIVEN ID WAS NOT FOUND"
        });
    }
}

exports.createShow = (req,res) => {
    let form = formidable({ multiples: true });
    form.parse(req,async(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        console.log(fields);
        const {date_of_show , time_of_show , language , movie_id ,screen_id,cost} =fields;

        if(!date_of_show || !time_of_show || !language || !movie_id || !screen_id || !cost){
            return res.status(400).json({
                error:" Please include all fields"
            });
        }

        

        try {
            //saving show
            let show = new Show(date_of_show, time_of_show, language, movie_id, screen_id,cost);
            show =  await show.save();


            // inserting seats for that show.
            let show_id = show[0].insertId
            let [result,_] = await Screen.findNoOfSeats(screen_id);
            let no_of_seats = result[0].no_of_seats;

            let rows = Math.floor(no_of_seats/8);
            let remainingSeats = no_of_seats%8;

            for(let i = 0; i<rows;i++){
                for(let j = 0;j<8;j++){
                    let seat = new Seat(i,j,show_id);
                    seat = await seat.save();
                }
            }
            let col = 0;
            for(let i = 0; i<remainingSeats;i++){
                let seat = new Seat(rows,col,show_id);
                seat = await seat.save();
                col = col+1;
            }
            res.json({
                message:`show added successfully with show id ${show_id}`
            });
        } catch (error) {
            // console.log(error);
            res.status(400).json({
                
                error:"NOT able to add show to DB"
            });
        }
    });

}

exports.deleteShow = async (req,res) => {

    try{
        let result  = await Show.deleteShow(req.show.show_id);

        return res.status(200).json({
            message:"Successfully deleted the show"
        })
    }
    catch(err){
        return res.status(400).json({
            error: "Failed to delete the show"
        }) 
    }
}

exports.updateShow = (req,res) => {
    let form = formidable({ multiples: true });
    form.parse(req,async(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        const {date_of_show , time_of_show , language , movie_id ,screen_id,cost} =fields;
        const show_id = req.show.show_id;
        try {

            let result = await Show.updateShow(show_id,date_of_show , time_of_show , language , movie_id ,screen_id,cost)

            return res.status(200).json({
                message:"Successfully updated the show"
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                
                error:"NOT able to update show in DB"
            });
        }
    });
}

exports.getShow  = async (req,res) => {
    let [seats,_] = await Seat.findByShowId(req.show.show_id);

    return res.json({showDetails:req.show,
        seats: seats
    });
}

exports.getShowsForMovieTheatre = async (req,res) => {

    try{
        let theatre_id = req.theatre.theatre_id;
        let movie_id = req.movie.movie_id;

        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let date = `${yyyy}-${mm}-${dd}`;
        
        let hh = d.getHours();
        let min = d.getMinutes();
        let ss = d.getSeconds();
        let time = `${hh}:${min}:${ss}`;
        let [result,a] = await Show.getShowsForMovieTheatre(theatre_id,movie_id,date,time);
        return res.json(result);
    }
    catch(err){
        console.log(err);
        return res.json(400).json({
            error: "NO Shows FOUND for given theatre and movie"
        });
    }
}