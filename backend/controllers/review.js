const Review = require("../models/Review");
const User = require("../models/User");

exports.postReview = async (req,res) => {
    const {title, description} = req.body;
    const user_id = req.profile.user_id;
    const movie_id = req.movie.movie_id

    try{
        let [result, a] = await User.findById(user_id);
        let user = result[0];
        console.log(user);
        let review = new Review({title,description,user_id, name:user.name ,movie_id});
            review.save((err,review) => {
            if(err){
                throw err;
            }
            return res.status(200).json({
                message: "Review successfully posted"
            })
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error: "Saving review in DB failed"
        });
    }
   
    

   
    
   
}

exports.getReviewsForAMovie = async (req,res) => {
    let movie_id = req.movie.movie_id;

    Review.find({movie_id:movie_id},(err,result) => {
        if(err){
            return res.status(400).json({
                error: "Getting reviews for a movie failed"
            });
        }
        return res.json(result);
    });

}