const crypto = require('crypto');
const db = require('../DBConnection');

module.exports = class {
    #passwordHash;
    #salt;
    constructor(data) {
        this.id = data.coachId;
        this.name = data.name;
        this.teamId = data.teamId;
        this.wins = data.wins;
        this.losses = data.losses;
        this.ties = data.ties;
        this.username = data.username;
        this.avatar = data.avatar;
        
        if(data.salt == null) {
            this.#salt = crypto.randomBytes(16).toString("hex");
            this.#passwordHash = crypto.pbkdf2Sync(data.password, this.#salt, 100000, 64, 'sha512').toString('hex');
        } else {
            this.#salt = data.salt;
            
            this.#passwordHash = data.password;
        }
    }

    validatePassword(password) {
      return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, this.#salt, 100000, 64, 'sha512', (err, derivedKey) => {
          if (err) {
            reject("Error: " +err);
          }
    
          const digest = derivedKey.toString('hex');
          if (this.#passwordHash == digest) {
            resolve(this);
          }
          else {
            reject("Invalid username or password");
          }
        });
      });
    }

    createUser() {
      return db.query("INSERT INTO coaches VALUES(?,?,?,?,?,?,?,?,?,?)",
      [this.id, this.name, this.teamId, this.wins, this.losses, this.ties, this.username, this.#salt, this.#passwordHash, this.avatar])
      .then(results => {
        this.id = results.insertId;
        return this.toJSON();
      }).catch(err => {
        return err;
      });
    }
    
    toJSON() {
      return {
        "id": this.id,
        "name": this.name,
        "teamId": this.teamId,
        "wins": this.wins,
        "losses": this.losses,
        "ties": this.ties,
        "username": this.username,
        "avatar": this.avatar
      }
    }
};

