const db = require('./DBConnection');
const Schedule = require('./models/Schedule');

function getMatches() {
    return db.query('SELECT * from schedule').then(({results}) => {
        return results.map(match => new Schedule(match));
    });
}

function getMatchesByTeam(teamId) {
    return db.query('SELECT * from schedule where homeTeamId=? OR awayTeamId=?', [teamId, teamId]).then(({results}) => {
        return results.map(match => new Schedule(match));
    });
}

function getMatchById(sid) {
    return db.query('SELECT * from schedule WHERE sid=?', [sid]).then(({results}) => {
        if (results[0]) {
            return new Schedule(results[0]);
        }
    });
}

function createMatch(match) {
    return db.query('INSERT INTO schedule VALUES(?,?,?,?,?)',
    [match.sid, match.homeTeamId, match.awayTeamId, match.time, match.location]).then(({results}) => {
        if (results.insertId) return getMatchById(results.insertId);
        return getMatchById(match.sid);
    });
}

module.exports = {
    getMatches : getMatches,
    getMatchesByTeam : getMatchesByTeam,
    getMatchById : getMatchById,
    createMatch : createMatch
};