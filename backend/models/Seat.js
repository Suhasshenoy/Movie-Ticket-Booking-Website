const db = require("../config/db");

class Seat{
    constructor(row,column,show_id){
        this.row_no = row;
        this.column_no = column;
        this.show_id = show_id;
    }
    save(){
        let sql = `
        INSERT INTO seat(
            row_no,
            column_no,
            show_id
        )
        VALUES (
            ${this.row_no},
            ${this.column_no},
            ${this.show_id}
        );
        `;
        return db.execute(sql);
    }
    static findById(id){
        let sql = `SELECT * FROM seat WHERE seat_id = ${id};`;
        return db.execute(sql);
    }
    static findByShowId(id){
        let sql = `SELECT * FROM seat WHERE show_id = ${id};`;
        return db.execute(sql);
    }
    static bookSeat(seat_id,ticket_id){
        let sql = `
        UPDATE seat SET 
        isBooked = 1,
        ticket_id = ${ticket_id}
        WHERE seat_id = ${seat_id};
        `;
        return db.execute(sql);
    }
}

module.exports = Seat;