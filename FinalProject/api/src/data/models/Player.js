module.exports = class {
    constructor(data) {
        this.id = data.playerId;
        this.name = data.name;
        this.position = data.position;
        this.number = data.number;
        this.goalsInSeason = data.goalsInSeason;
        this.goals = data.goals;
        this.clearances = data.clearances;
        this.tackles = data.tackles;
        this.blocks = data.blocks;
        this.redCards = data.redCards;
        this.yellowCards = data.yellowCards;
        this.avatar = data.avatar;
        this.injuryId = data.injuryId;
    }
}