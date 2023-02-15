module.exports = class {
    constructor(data) {
        this.id = data.injuryId;
        this.playerId = data.playerId;
        this.teamId = data.teamId;
        this.injuryDesc = data.injuryDesc;
        this.recoveryTime = data.recoveryTime;
    }
}