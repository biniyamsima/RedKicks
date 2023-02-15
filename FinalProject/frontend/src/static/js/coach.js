import api from './APIClient.js';



const grid = document.querySelector('.position');

const wins = document.querySelector('#wins');
const losses = document.querySelector('#losses');
const ties = document.querySelector('#ties');
const team1 = document.querySelector('#team');


let user = localStorage.getItem('user');

user = JSON.parse(user);




    let image = document.createElement("img");
    image.classList.add("playerImage");
    image.src = user.avatar;

    let name = document.createElement('h2');
    name.classList.add("playerName");
    name.innerHTML = user.name + " (Coach)";

    grid.appendChild(image);
    grid.appendChild(name);

    wins.innerHTML = user.wins;
    losses.innerHTML = user.losses;
    ties.innerHTML = user.ties;

    api.getTeam(user.teamId).then(team => {
        team1.innerHTML = team.name;
    })
    


