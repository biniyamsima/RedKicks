import api from './APIClient.js';

const playerlist = document.getElementById('playertoselect');
function populatePlayerList(user) {
    playerlist.innerHTML = '';
    api.getPlayersByTeam(user.teamId).then(players => {
        if (!players[0]) {
            // Nothing to display.
        } else {
            players.forEach(player => {
                if(!player.injuryId) {
                    let selectElement = document.createElement('option');
                    selectElement.value = player.id;
                    selectElement.innerHTML = player.name;
                    playerlist.appendChild(selectElement);
                }
            });
        }
    });
}

api.getCurrentUser().then(user => {
    populatePlayerList(user);
}).catch(error => {
    console.log("We are not logged in");
});

const form = document.querySelector('form');
const user = JSON.parse(localStorage.getItem('user'));
form.addEventListener('submit', e => {
    e.preventDefault();

    let injuryDesc = document.getElementById('description');
    let injuryLen = document.getElementById('recovery');

    let injury = {
        "injuryId": null,
        "playerId": playerlist.value,
        "teamId": user.teamId,
        "injuryDesc": injuryDesc.value,
        "recoveryTime": injuryLen.value
    }

    api.createInjury(injury).then(() => {
        console.log("Success");
        location.reload();
    }).catch(err => {
        console.log("Not success");
    })

})