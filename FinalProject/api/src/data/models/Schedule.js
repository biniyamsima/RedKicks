module.exports = class {
    constructor(data) {
        this.sid = data.sid;
        this.homeTeamId = data.homeTeamId;
        this.awayTeamId = data.awayTeamId;
        this.time = data.time;
        this.location = data.location;
    }
}