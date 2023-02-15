import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';

export default {
  getTeams: () => {
    return HTTPClient.get(API_BASE+`/teams`);
  },

  createCoach: (coach) => {
    return HTTPClient.post(API_BASE+`/coaches`, coach);
  },

  getCurrentUser: () => {
    return HTTPClient.get(API_BASE+'/users/current');
  },

  createMatchup: (matchup) => {
    return HTTPClient.post(API_BASE+`/schedule`, matchup);
  },

  getMatchups: (teamId) => {
    return HTTPClient.get(API_BASE+`/teams/${teamId}/schedule`);
  },

  createTeam: (team) => {
    return HTTPClient.post(API_BASE+`/teams`, team);
  },

  getTeam: (teamId) => {
    return HTTPClient.get(API_BASE+`/teams/${teamId}`);
  },

  getPlayersByTeam: (teamId) => {
    return HTTPClient.get(API_BASE+`/teams/${teamId}/players`);
  },

  getInjuriesByTeam: (teamId) => {
    return HTTPClient.get(API_BASE+`/teams/${teamId}/injuries`);
  },

  getPlayer: (playerId) => {
    return HTTPClient.get(API_BASE+`/players/${playerId}`);
  },
  
  createInjury: (injury) => {
    return HTTPClient.post(API_BASE+`/injuries`, injury);
  },

  createPlayer: (player) => {
    return HTTPClient.post(API_BASE+`/players`, player);
  },

  logIn: (username, password) => {
    let data = {
      username: username,
      password: password
    }
    return HTTPClient.post(API_BASE+'/users/login', data);
  },

  logOut: () => {
    return HTTPClient.post(API_BASE+'/users/logout', {});
  },

  deletePlayer: (playerId) => {
    return HTTPClient.delete(API_BASE+`/players/${playerId}`);
  },

  editPlayer: (player) => {
    return HTTPClient.put(API_BASE+`/players`, player);
  }
};
