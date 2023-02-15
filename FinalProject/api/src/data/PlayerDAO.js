const db = require('./DBConnection');
const Player = require('./models/Player');

function getPlayers() {
    return db.query('SELECT * FROM players').then(({results}) => {
        return results.map(player => new Player(player));
    });
}

function getPlayerById(playerId) {
    return db.query('SELECT * FROM players WHERE playerId=?', [playerId]).then(({results}) => {
        if(results[0]) return new Player(results[0]);
    });
}

function getPlayersByTeam(teamId) {
    return db.query('SELECT * FROM players P JOIN team_players TP ON P.playerId=TP.playerId WHERE TP.teamId=?', [teamId]).then(({results}) => {
        return results.map(player => new Player(player));
    });
}

// Note: InsertId is 0 if the id inserted was not provided by the user (autoincrement)
function createPlayer(player) {
    return db.query('INSERT INTO players VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [player.playerId, player.name, player.position, player.number, player.goalsInSeason, player.goals, player.clearances, player.tackles, player.blocks, player.redCards, player.yellowCards, player.avatar, player.injuryId]).then(({results}) => {
        return db.query('INSERT INTO team_players VALUES (?,?)', [player.teamId, results.insertId]).then( res => {
            return getPlayerById( results.insertId );
        });
    });
  }

function deletePlayer(playerId) {
    //return db.query('DELETE FROM players WHERE playerId=?',[playerId]).then(({result}) => {
        return db.query('DELETE FROM team_players WHERE playerId=?',[playerId]).then( res => {
            return res;
        });
  //  })
}

function editPlayer(player) {
    return db.query('UPDATE players SET playerId=?, name=?, position=?, number=?, goalsInSeason=?, goals=?, clearances=?, tackles=?, blocks=?, redCards=?, yellowCards=?, avatar=?, injuryId=? WHERE playerId=?', [player.playerId, player.name, player.position, player.number, player.goalsInSeason, player.goals, player.clearances, player.tackles, player.blocks, player.redCards, player.yellowCards, player.avatar, player.injuryId, player.playerId]).then(({result}) => {
        return getPlayerById(player.playerId);
    })
}

module.exports = {
    getPlayers: getPlayers,
    getPlayerById: getPlayerById,
    getPlayersByTeam: getPlayersByTeam,
    createPlayer: createPlayer,
    deletePlayer: deletePlayer,
    editPlayer: editPlayer
};