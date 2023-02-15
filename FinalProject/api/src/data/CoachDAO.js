const db = require("./DBConnection");
const Coach = require("./models/Coach");

function validateCredentials(username, password) {
    return db.query('SELECT * FROM coaches where username=?', [username]).then(({results}) => {
        if (!results[0]) throw new Error("Invalid Username or Password");
        else {
            let coach = new Coach(results[0]);
            return coach.validatePassword(password).catch(err => {
                throw new Error("Invalid Username or Password");
            })
        }
    });
}

function registerUser(coach) {
    let user = new Coach(coach);
    return user.createUser().catch(err => {
        throw new Error("Username already exists.");
    });
}


module.exports = {
    validateCredentials: validateCredentials,
    registerUser: registerUser
}