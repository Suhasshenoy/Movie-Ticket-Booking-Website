const db = require("../config/db");

class Ticket{
    constructor(amount_paid, no_of_seats, show_id, user_id){
        this.amount_paid = amount_paid;
        this.no_of_seats = no_of_seats;
        this.show_id = show_id;
        this.user_id = user_id;
    }

    save() {
        let sql = `
        INSERT INTO ticket(
            amount_paid,
            no_of_seats,
            show_id,
            user_id
        )
        VALUES(
            ${this.amount_paid},
            ${this.no_of_seats},
            ${this.show_id},
            ${this.user_id}
        );
        `;
        return db.execute(sql);
    }
}

module.exports = Ticket;