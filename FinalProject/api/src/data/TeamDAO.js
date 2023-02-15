const db = require('./DBConnection');
const Team = require('./models/Team');

function getTeams() {
    return db.query('SELECT * from teams').then(({results}) => {
        return results.map(team => new Team(team));
    });
}

function getTeamById(teamId) {
    return db.query('SELECT * FROM teams WHERE teamId=?', [teamId]).then(({results}) => {
        if (results[0]) {
            return new Team(results[0]);
        }
    });
}

function createTeam(team) {
    return db.query('INSERT INTO teams VALUES(?,?,?,?,?,?,?)',
    [team.teamId, team.name, team.origin, team.logo, team.wins, team.losses, team.ties]).then(({results}) => {
        if (results.insertId) return getTeamById(results.insertId);
        return getTeamById(team.teamId);
    });
}

module.exports = {
    getTeams : getTeams,
    getTeamById : getTeamById,
    createTeam : createTeam
};