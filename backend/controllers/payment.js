const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
const { v4: uuidv4 } = require('uuid');

exports.makepayment = (req,res) => {

    const {seats,paymentToken} = req.body
    const noOfSeats = seats.length;

    let amount =  req.show.cost*noOfSeats
    

    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: paymentToken.email,
        source: paymentToken.id
    }).then(customer => {
        stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: paymentToken.email,
            description: "a test account",
            
        },{idempotencyKey})
        .then(result => {
            return res.status(200).json(result)})
        .catch(err=> console.log("ERR in backend stripe payment\n",err));
    })
    .catch(err=>console.log("ERR in creating customers"))
}