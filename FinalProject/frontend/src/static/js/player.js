import api from './APIClient.js';

// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');
//let id = localStorage['currId'];

const grid = document.querySelector('.position');

const goalsSeason = document.querySelector('#goalsSeason');
const goalsTeam = document.querySelector('#goalsTeam');
const clearances = document.querySelector('#clearances');
const tackle = document.querySelector('#tackle');
const offsides = document.querySelector('#offsides');
const yellow = document.querySelector('#yellow');
const red = document.querySelector('#red');
const deletePlayer = document.querySelector('#deleteB');

let playername = document.getElementById("name");
let position = document.getElementById("pos");
let playernumber = document.getElementById("playernum");
let goalsthisseason = document.getElementById("totalgoalsinseason");
let totalgoals = document.getElementById("totalgoals");
let clearance = document.getElementById("clearances");
let tackles = document.getElementById("tackles");
let blocks = document.getElementById("blocks");
let redcards = document.getElementById("redcards");
let yellowcards = document.getElementById("yellowcards");
let imageLink = document.getElementById("imageLink");
const form = document.querySelector("#button");


console.log(id);

api.getPlayer(id).then(player => {
    
    console.log(player);
    playername.value = player.name;
    position.value = player.position;
    playernumber.value = player.number;
    goalsthisseason.value = player.goalsInSeason;
    totalgoals.value = player.goals;
    clearance.value = player.tackles;
    tackles.value = player.tackles;
    blocks.value = player.blocks;
    redcards.value = player.redcards;
    yellowcards.value = player.yellowcards;
    imageLink.value = player.imageLink;


    let image = document.createElement("img");
    image.classList.add("playerImage");
    image.src = player.avatar;

    let name = document.createElement('h2');
    name.classList.add("playerName");
    name.innerHTML = player.name + " (" + player.position + ")";

    grid.appendChild(image);
    grid.appendChild(name);

    goalsSeason.innerHTML = player.goalsInSeason;
    goalsTeam.innerHTML = player.goals;
    clearances.innerHTML = player.goalsInSeason;
    tackle.innerHTML = player.tackles;
    offsides.innerHTML = player.blocks;
    yellow.innerHTML = player.yellowCards;
    red.innerHTML = player.redCards;


});

deletePlayer.addEventListener('click', e => {

    api.deletePlayer(id).then( p=> {
        alert("Player Deleted");
        document.location = "/roster";
    }).catch(err => {
        console.log(err);
    })

});

form.addEventListener('click', e => {
    api.getPlayer(id).then(player => {
        
        let newplayer = {
            "id": id,
            "teamId": player.teamId,
            "name": playername.value,
            "position": position.value,
            "number": playernumber.value,
            "goalsInSeason": goalsthisseason.value,
            "goals": totalgoals.value,
            "clearances": clearance.value,
            "tackles": tackles.value,
            "blocks": blocks.value,
            "redCards": redcards.value,
            "yellowCards": yellowcards.value,
            "avatar": imageLink.value,
            "injuryId": null   
        };
    //    console.log(newplayer);
        
        api.editPlayer(newplayer).then(p => {
            console.log(p);
            console.log("here");
        });
     //   console.log(newplayer);
        
    })
    document.location = './roster';
    e.preventDefault();
});