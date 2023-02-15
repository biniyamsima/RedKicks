module.exports = class {
    constructor(data) {
        this.id = data.teamId;
        this.name = data.name;
        this.origin = data.origin;
        this.logo = data.logo;
        this.wins = data.wins;
        this.losses = data.losses;
        this.ties = data.ties;
    }
};