const db = require("../config/db");

class Theatre{
    constructor(name,description,city,address,no_of_screens){
        this.name=name;
        this.description=description;
        this.city=city;
        this.address=address;
        this.no_of_screens=no_of_screens;
    }

    save(){
        let sql = `
        INSERT INTO theatre(
            name,
            description,
            city,
            address,
            no_of_screens
        )
        VALUES(
            '${this.name}',
            '${this.description}',
            '${this.city}',
            '${this.address}',
            ${this.no_of_screens}
        );
        `;
        return db.execute(sql);
    }
    static findById(id) {
        let sql = `SELECT * FROM theatre WHERE theatre_id = ${id};`;

        return db.execute(sql);
    }
    static getAllTheatres(){
        let sql = `SELECT * FROM theatre;`;

        return db.execute(sql);
    }

    static getTheatresWithMovie(id,date,time){
        let sql = `
        SELECT * FROM theatre t1 WHERE t1.theatre_id IN
        (SELECT s1.theatre_id FROM screen s1 WHERE s1.screen_id IN (
            SELECT sh.screen_id FROM shows sh WHERE sh.movie_id = ${id} AND
            (sh.date_of_show > '${date}' OR (sh.date_of_show = '${date}' AND sh.time_of_show > '${time}'))));` ;

        return db.execute(sql);
    }

}

module.exports = Theatre;