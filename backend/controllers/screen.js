const Screen = require("../models/Screen");
const formidable = require("formidable");

exports.getScreenById = async(req,res,next,id) => {
    try{
        let [result, a] = await Screen.findById(id);
        let screen = result[0];
        req.screen = screen;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "SCREEN WITH GIVEN ID WAS NOT FOUND"
        });
    }
}

exports.createScreen = (req,res) => {
    let form = formidable({ multiples: true });
    form.parse(req,async(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        const {screen_no, no_of_seats ,screen_type,theatre_id} =fields;
        if(!screen_no || !no_of_seats || !screen_type || !theatre_id){
            return res.status(400).json({
                error:" Please include all fields"
            });
        }
        try {

            let screen = new Screen(screen_no, no_of_seats ,screen_type,theatre_id);

            screen =  await screen.save();
            res.json({
                message:"screen added successfully"
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                
                error:"NOT able to add screen to DB"
            });
        }
    });
}

exports.getScreen = (req,res) => {
    return res.json(req.screen);
}

exports.getScreensInTheatre = async (req,res) => {
    try{
        let [result, a]  = await Screen.getScreensInTheatre(req.theatre.theatre_id);
        return res.json(result);
    }
    catch(err){
      
        return res.json(400).json({
            error: "NO Theatres FOUND"
        });
    }
}
