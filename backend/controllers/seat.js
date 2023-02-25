const Seat = require("../models/Seat");
const Ticket = require("../models/Ticket");
const QRCode = require('qrcode');
const transport = require("../config/mailer");

exports.getSeatById = async (req,res,next,id) => {

    try{
        let [result, a] = await Seat.findById(id);
        let seat = result[0];
        req.seat = seat;
        next();
    }
    catch(err){
        return res.status(400).json({
            error: "SEAT WITH GIVEN ID WAS NOT FOUND"
        });
    }
}

exports.getCost = async (req,res) => {
    let cost = req.show.cost;
    let no_of_seats = req.body.no_of_seats;

    let totalCost = cost* no_of_seats;

    return res.json(totalCost);
}

exports.bookSeat = async (req,res) => {
    
    let seat_ids = req.body.seat_ids;
    let no_of_seats = seat_ids.length;
    let amount_paid = no_of_seats* req.show.cost;
    let show_id = req.show.show_id;
    let user_id = req.profile.user_id;
    //generate ticket
    try{
        let ticket = new Ticket(amount_paid,no_of_seats,show_id,user_id);
        ticket = await ticket.save();

        let ticket_id = ticket[0].insertId;

        for(let i = 0;i<no_of_seats ; i++){
            let result = await Seat.bookSeat(seat_ids[i],ticket_id);
        }
        //todo 
        //mail the ticket to the user
        QRCode.toDataURL(`${ticket_id}`, function (err, url) {
            if(err){
                console.log(err);
            }
            const message = {
                from:`${process.env.EMAIL_USER}`,
                to: `${req.profile.email}`,
                subject: `Ticket for the movie Booked`,
                text: `Your ticket is Booked. \n \n Thank you for booking your movie ticket with us.\n If there are any queries, write back to us.\n Download your ticket.`,
                attachments: [{
                    path: `${url}`
                }]
                
            }
            transport.sendMail(message,(err,info)=>{
                if(err){
                    throw err
                }
            })
        })
        return res.status(200).json({
            ticket_id,
            message:"Successfully booked the seats"
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            error:"NOT able to book seat"
        });
    }
  


    
}