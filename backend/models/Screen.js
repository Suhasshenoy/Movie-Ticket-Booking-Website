const db = require("../config/db");

class Screen{
    constructor(screen_no,no_of_seats,type,theatre_id){
        this.screen_no = screen_no;
        this.no_of_seats = no_of_seats;
        this.screen_type = type;
        this.theatre_id = theatre_id;
    }

    save() {
        let sql = `
        INSERT INTO screen(
            screen_no,
            no_of_seats,
            screen_type,
            theatre_id
        )
        VALUES(
            ${this.screen_no},
            ${this.no_of_seats},
            '${this.screen_type}',
            ${this.theatre_id}
        );
        `;
        return db.execute(sql);
    }
    static findById(id) {
        let sql = `SELECT * FROM screen WHERE screen_id = '${id}';`;

        return db.execute(sql);
    }
    static getScreensInTheatre(id){
        let sql = `
        SELECT * FROM screen WHERE theatre_id = ${id};
        `;
        return db.execute(sql);
    }
    static findNoOfSeats(id){
        let sql = `SELECT no_of_seats FROM screen WHERE screen_id = '${id}';`;

        return db.execute(sql);
        
    }
    
}
module.exports = Screen;