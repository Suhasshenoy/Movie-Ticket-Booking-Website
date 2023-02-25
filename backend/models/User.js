const db = require("../config/db");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const securePassword = (plainpassword,salt) => {
    if(!plainpassword) return "";
        try{
            return (crypto.createHmac('sha256', salt)
            .update(plainpassword)
            .digest('hex'));
             
        }
        catch(err){
            return "";
        }
}

class User {
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.salt = uuidv1();
        // console.log("PASSWORD",password);
        this.encry_pass = securePassword(password,this.salt);
    }

    static authenticate(plainpassword,salt,encry_pass){
        let val =  securePassword(plainpassword,salt) == encry_pass;
        // console.log(securePassword(plainpassword,salt));
        // console.log(encry_pass);
        return val;
    }

    save(){
        let sql = `
        INSERT INTO user(
            name,
            email,
            encry_pass,
            salt
        )
        VALUES(
            '${this.name}',
            '${this.email}',
            '${this.encry_pass}',
            '${this.salt}'
        );
        `;
        return db.execute(sql);
    }

    static findByEmail(email){
        let sql = `SELECT * FROM user WHERE email = '${email}';`;
        
        return db.execute(sql);
    }
    static findById(id){
        let sql = `SELECT * FROM user WHERE user_id = '${id}';`;

        return db.execute(sql);
    }


}
module.exports = User;