const db = require('./DBConnection');
const Injury = require('./models/Injury');

function getInjuries() {
    return db.query('SELECT * FROM injuries').then(({results}) => {
        return results.map(injury => new Injury(injury));
    });
}

function getInjuriesByTeam(teamId) {
    return db.query('SELECT * from injuries WHERE teamId=?', [teamId]).then(({results}) => {
        return results.map(injury => new Injury(injury));
    });
}

function getInjuryByPlayer(playerId) {
    return db.query('SELECT * from injuries WHERE playerId=?', [playerId]).then(({results}) => {
        if (results[0]) {
            return new Injury(results[0]);
        }
    });
}

function getInjuryById(injuryId) {
    return db.query('SELECT * from injuries WHERE injuryId=?', [injuryId]).then(({results}) => {
        if (results[0]) {
            return new Injury(results[0]);
        }
    });
}

function createInjury(injury) {
    return db.query('INSERT INTO injuries VALUES (?,?,?,?,?)',
    [injury.injuryId, injury.playerId, injury.teamId, injury.injuryDesc, injury.recoveryTime]).then(({results}) => {
        if (results.insertId) {
            injury.injuryId = results.insertId;
        }
        
        // Updates players with injuries, then updates team_injuries.
        db.query('UPDATE players SET injuryId=? WHERE playerId=?', [injury.injuryId, injury.playerId])
        .then(db.query('INSERT INTO team_injuries VALUES (?,?)', [injury.teamId, injury.injuryId]));
        
        
        return getInjuryById(injury.injuryId);
    });
}

module.exports = {
    getInjuries : getInjuries,
    getInjuriesByTeam : getInjuriesByTeam,
    getInjuryById : getInjuryById,
    getInjuryByPlayer : getInjuryByPlayer,
    createInjury : createInjury
};