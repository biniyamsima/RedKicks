const express = require('express');
const apiRouter = express.Router();
apiRouter.use(express.json());

// Multer Installation for Images.
const multer = require('multer');
const storageEngine = multer.diskStorage({
    destination: '../../frontend/src/static/img',
    filename: (req, file, cb) => {
        let type = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}.${type}`);
    },
});
const upload = multer({
    storage: storageEngine,
});

// Database retrieval modules.
const TeamDAO = require('./data/TeamDAO');
const PlayerDAO = require('./data/PlayerDAO');
const InjuryDAO = require('./data/InjuryDAO');
const ScheduleDAO = require('./data/ScheduleDAO');
const CoachDAO = require('./data/CoachDAO');

const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());
const {TokenMiddleware, generateToken, removeToken} = require('./middleware/TokenMiddleware');

/**********\
* TEAM DAO *
\**********/

// Get all teams
apiRouter.get('/teams', (req, res) => {
    TeamDAO.getTeams().then(teams => {
        res.json(teams);
    })
});

// Get team by id
apiRouter.get('/teams/:teamId', (req, res) => {
    const teamId = req.params.teamId;
    TeamDAO.getTeamById(teamId).then(team => {
        if (!team) res.status(404).json({error: "Team not found"});
        else res.json(team);
    });
});

/************\
* PLAYER DAO *
\************/

// Get all players.
apiRouter.get('/players', (req, res) => {
    PlayerDAO.getPlayers().then(players => {
        res.json(players);
    });
});

// Get player by id.
apiRouter.get('/players/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    PlayerDAO.getPlayerById(playerId).then(player => {
        if (!player) res.status(404).json({error: "Player not found"});
        else res.json(player);
    })
});

// Get players by team
apiRouter.get('/teams/:teamId/players', (req, res) => {
    const teamId = req.params.teamId;
    TeamDAO.getTeamById(teamId).then(team => {
        if (!team) res.status(404).json({error: "Team not found"});
        else {
            PlayerDAO.getPlayersByTeam(teamId).then(players => {
                res.json(players);
            });
        }
    });
});

/************\
* INJURY DAO *
\************/

// Get all injuries
apiRouter.get('/injuries', TokenMiddleware, (req, res) => {
    InjuryDAO.getInjuries().then(injuries => {
        res.json(injuries);
    })
})

// Get specific injury
apiRouter.get('/injuries/:injuryId', TokenMiddleware, (req, res) => {
    const injuryId = req.params.injuryId;
    InjuryDAO.getInjuryById(injuryId).then(injury => {
        if (!injury) {
            res.status(404).json({error: "Injury not found"});
        } else {
            res.json(injury);
        }
    });
});

// Get specific injury from player.
apiRouter.get('/players/:playerId/injury', TokenMiddleware, (req, res) => {
    const playerId = req.params.playerId;
    PlayerDAO.getPlayerById(playerId).then(player => {
        if (!player) res.status(404).json({error: "Player not found"});
        else {
            InjuryDAO.getInjuryByPlayer(playerId).then(injury => {
            if (!injury) {
                res.json("No injury for this player.");
            } else {
                res.json(injury);
            }
            });
        }
    });
});

// Get specific injury from team.
apiRouter.get('/teams/:teamId/injuries', TokenMiddleware, (req, res) => {
    const teamId = req.params.teamId;
    TeamDAO.getTeamById(teamId).then(team => {
        if (!team) res.status(404).json({error: "Team not found"});
        else {
            InjuryDAO.getInjuriesByTeam(teamId).then(injuries => {
            if (!injuries[0]) {
                res.json("No injuries for this team.");
            } else {
                res.json(injuries);
            }
            });
        }
    });
});

/**************\
* SCHEDULE DAO *
\**************/

//Get the league schedule
apiRouter.get('/schedule', TokenMiddleware, (req, res) => {
    ScheduleDAO.getMatches().then(matches => {
        res.json(matches);
    })
});


// Get specific matchup
apiRouter.get('/schedule/:scheduleId', TokenMiddleware, (req, res) => {
    const scheduleId = req.params.scheduleId;
    ScheduleDAO.getMatchById(scheduleId).then(match => {
        if (!match) res.status(404).json({error: "Match not found"});
        else res.json(match);
    });
});


// Get specific schedule for team.
apiRouter.get('/teams/:teamId/schedule', TokenMiddleware, (req, res) => {
    const teamId = req.params.teamId;
    TeamDAO.getTeamById(teamId).then(team => {
        if (!team) res.status(404).json({error: "Team not found"});
        else {
            ScheduleDAO.getMatchesByTeam(teamId).then(matches => {
                if (!matches[0]) res.json("No upcoming matchups for this team"); // Branch unreachable with current database.
                else res.json(matches);
            })
        }
    })
});

// POST METHODS

apiRouter.post('/coaches', (req, res) => {
    let newCoach = req.body;
    CoachDAO.registerUser(newCoach).then(coach => {
        res.json(coach);
    }).catch(err => {
        res.status(400).json({error: err});
    })
});

// new player
apiRouter.post('/players', (req, res) => {
    let newPlayer = req.body;
    PlayerDAO.createPlayer(newPlayer).then(player => {
        res.json(player);
    }).catch(err => {
        res.status(400).json({error: err});
    });
});

// new team
apiRouter.post('/teams', (req,res) => {
    let newTeam = req.body;
    TeamDAO.createTeam(newTeam).then(team => {
        res.json(team);
    }).catch(err => {
        res.status(400).json({error : err});
    });
})

// new injury
apiRouter.post('/injuries', (req, res) => {
    let newInjury = req.body;
    PlayerDAO.getPlayerById(newInjury.playerId).then(player => {
        if (!player) res.status(404).json({error: "No such player"}); // Reachable
        else if (player.injuryId) res.status(404).json({error: "Player already has an injury"}); // Reachable
        else {
            InjuryDAO.createInjury(newInjury).then(injury => {
                res.json(injury); // Reachable.
            }).catch(err => {
                res.status(400).json({error: err}); // -> Fixed.
            })
        }
    })
})

// Insert a new matchup
apiRouter.post('/schedule', (req, res) => {
    let newMatch = req.body;
    ScheduleDAO.createMatch(newMatch).then(match => {
        res.json(match);
    }).catch(err => {
        res.status(400).json({error: err});
    });
})

// Login as coach.
apiRouter.post('/users/login', (req, res) => {
    if (req.body.username && req.body.password) {
        CoachDAO.validateCredentials(req.body.username, req.body.password).then(user => {
            let result = {
                user: user
            }

            generateToken(req, res, user);

            res.json(result);
        }).catch(err => {
            res.status(400).json({error: err});
        });
    } else {
        res.status(401).json({error: 'Not authenticated'});
    }
})

// Logout as coach.
apiRouter.post('/users/logout', (req, res) => {
    removeToken(req, res);

    res.json({success: true});
});

// Current coach logged in.
apiRouter.get('/users/current', TokenMiddleware, (req,  res) => {
    res.json(req.user);
});

apiRouter.delete('/players/:playerId', (req, res) => {
    const playerId = req.params.playerId;
    PlayerDAO.deletePlayer(playerId).then(player => {
        if (!player) res.status(404).json({error: "Player not found"});
        res.json(player)
        
     }).catch(err => {
             res.status(400).json({error: err});
    });
    
});

apiRouter.put('/players', (req, res) => {
    let player = req.body;
    PlayerDAO.editPlayer(player).then(p => {
        if (!p) res.status(404).json({error: "Player not found"});
        else {
            res.json(p);
        }
    }).catch(err => {
        res.status(400).json({error: err});
    });
});

module.exports = apiRouter;