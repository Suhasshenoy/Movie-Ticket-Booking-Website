const db = require("../config/db");

class Show{
    constructor(date_of_show, time_of_show, language, movie_id, screen_id,cost){
        this.date_of_show=date_of_show;
        this.time_of_show=time_of_show;
        this.language=language;
        this.movie_id=movie_id;
        this.screen_id=screen_id;
        this.cost = cost;
    }
    save(){
        let sql = `
        INSERT INTO shows(
            date_of_show,
            time_of_show,
            language,
            movie_id,
            screen_id,
            cost
        )
        VALUES(
            '${this.date_of_show}',
            '${this.time_of_show}',
            '${this.language}',
            ${this.movie_id},
            ${this.screen_id},
            ${this.cost}
        );
        `;
        return db.execute(sql);
    }
    static findById(id) {
        let sql = `SELECT * FROM shows WHERE show_id = ${id};`;

        return db.execute(sql);
    }
    static deleteShow(id){
        let sql = `DELETE FROM shows WHERE show_id = ${id};`;

        return db.execute(sql);
    }
    static updateShow(id,date_of_show , time_of_show , language , movie_id ,screen_id,cost){
        let sql = `UPDATE shows SET
        date_of_show = '${date_of_show}',
        time_of_show = '${time_of_show}',
        language = '${language}',
        movie_id = ${movie_id},
        screen_id = ${screen_id},
        cost = ${cost}        
        WHERE show_id = ${id};`;

        return db.execute(sql);
    }
    static getShowsForMovieTheatre(theatre_id,movie_id,date,time){

        let sql = `SELECT * FROM shows s1 WHERE
        s1.screen_id IN (
            SELECT s2.screen_id FROM screen s2 WHERE theatre_id = ${theatre_id}
        )
        AND movie_id = ${movie_id} AND
        (date_of_show > '${date}' OR (date_of_show = '${date}' AND time_of_show > '${time}')) ;
        `;

        return db.execute(sql);
    }
}
module.exports = Show;