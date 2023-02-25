const db = require("../config/db");

class Movie{
    constructor(name,description,duration,rating,genre,director){
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.rating = rating;
        this.genre = genre;
        this.director = director;
    }

    save(){
        let sql = `
        INSERT INTO movie(
            movie_name,
            description,
            duration,
            rating,
            genre,
            director
        )
        VALUES(
            '${this.name}',
            '${this.description}',
            '${this.duration}',
            ${this.rating},
            '${this.genre}',
            '${this.director}'
        );
        `;
        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM movie WHERE movie_id = '${id}';`;

        return db.execute(sql);
    }
    static getAllMovies(){
        let sql = `SELECT * FROM movie;`;

        return db.execute(sql);
    }
    static deleteMovie(movie){
        let sql = `DELETE FROM movie WHERE movie_id =${movie.movie_id};`;

        return db.execute(sql);
    }

}

module.exports = Movie;