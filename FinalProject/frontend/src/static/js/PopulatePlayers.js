import api from './APIClient.js';

// Local storage JSON object.
const user = JSON.parse(localStorage.getItem('user'));

// Container for players.
const container = document.querySelector('.grid-container');

const form = document.querySelector("#button");

let playername = document.getElementById("name");
let position = document.getElementById("pos");
let playernumber = document.getElementById("playernum");
let goalsthisseason = document.getElementById("totalgoalsinseason");
let totalgoals = document.getElementById("totalgoals");
let clearances = document.getElementById("clearances");
let tackles = document.getElementById("tackles");
let blocks = document.getElementById("blocks");
let redcards = document.getElementById("redcards");
let yellowcards = document.getElementById("yellowcards");
let imageLink = document.getElementById("imageLink");
let allPlayers = [];
const errorBox = document.querySelector('#errorbox');

api.getPlayersByTeam(user.teamId).then(players => {
    if (!players[0]) {
        // Nothing to display.
    } else {
        players.forEach(player => {
            allPlayers.push(player);
            let card = document.createElement("div");
            card.classList.add('card');
            card.classList.add('mb-3');

            let row1 = document.createElement("div");
            row1.classList.add('row');
            row1.classList.add('g-0');
            let col1 = document.createElement("div");
            col1.classList.add('col-md-4');
            let img = document.createElement('img');
            img.src = player.avatar;
            img.classList.add('img-fluid');
            img.classList.add('rounded-start');
            col1.appendChild(img);

            let col2 = document.createElement("div");
            col2.classList.add('col-md-8');
            let body = document.createElement("div");
            body.classList.add('card-body');
            
            let title = document.createElement("div");
            title.classList.add('card-title');
            title.classList.add('d-flex');
            title.classList.add('justify-content-between');
            let name = document.createElement('h5');
            name.innerHTML = player.name;
            let num = document.createElement('h5');
            num.innerHTML = "#" + player.number;
            

            let table = document.createElement("table");
            table.classList.add('table')
            body.appendChild(table)
            let tbody = document.createElement("tbody");
            table.appendChild(tbody)

            let tr1 = document.createElement("tr");
           
            let tdPos1 = document.createElement("td");
            tdPos1.innerHTML = "Position";
            tr1.appendChild(tdPos1);
            let tdPos2 = document.createElement("td");
            tdPos2.classList.add("player-pos")
            tdPos2.innerHTML = player.position;
            tr1.appendChild(tdPos2);

            let tr2 = document.createElement("tr");
            
            let tdGoal1 = document.createElement("td");
            tdGoal1.innerHTML = "Goals";
            tr2.appendChild(tdGoal1);
            let tdGoal2 = document.createElement("td");
            tdGoal2.innerHTML = player.goals;
            tdGoal2.classList.add("player-goals")
            tr2.appendChild(tdGoal2);

            let link = document.createElement('a');
            link.classList.add('stretched-link');
            link.href = `/player?id=${player.id}`;
          

            body.appendChild(link);

            title.appendChild(name);
            title.appendChild(num);
            body.appendChild(title)
            col2.appendChild(title); 
            tbody.appendChild(tr1);
            tbody.appendChild(tr2);
            col2.appendChild(body)


            card.appendChild(row1)
            row1.appendChild(col1)
            row1.appendChild(col2)
            

            container.appendChild(card)
        });
    }
});


form.addEventListener('click', e => {
    errorBox.classList.add("hidden");
    e.preventDefault();
    
    let newplayer = {
        "id": null,
        "teamId": user.teamId,
        "name": playername.value,
        "position": position.value,
        "number": playernumber.value,
        "goalsInSeason": goalsthisseason.value,
        "goals": totalgoals.value,
        "clearances": clearances.value,
        "tackles": tackles.value,
        "blocks": blocks.value,
        "redCards": redcards.value,
        "yellowCards": yellowcards.value,
        "avatar": imageLink.value,
        "injuryId": null   
    }

    try {
        allPlayers.forEach(player => {
            if (player.name == newplayer.name) throw new Error("Player is already on the team");
            if (player.number == newplayer.number) throw new Error(`Player #${newplayer.number} already exists`);
        })

        if (!newplayer.name) throw new Error("Player name required.");
        if (!newplayer.avatar) throw new Error("Player avatar required.");
        if (!newplayer.position) throw new Error("Position required.");
        if (!newplayer.number) throw new Error("Player number required.");

        api.createPlayer(newplayer).then(ply => {
            let card = document.createElement("div");
            card.classList.add('card');
            card.classList.add('mb-3');

            let row1 = document.createElement("div");
            row1.classList.add('row');
            row1.classList.add('g-0');
            let col1 = document.createElement("div");
            col1.classList.add('col-md-4');
            let img = document.createElement('img');
            img.src = ply.avatar;
            img.classList.add('img-fluid');
            img.classList.add('rounded-start');
            col1.appendChild(img);

            let col2 = document.createElement("div");
            col2.classList.add('col-md-8');
            let body = document.createElement("div");
            body.classList.add('card-body');
            
            let title = document.createElement("div");
            title.classList.add('card-title');
            title.classList.add('d-flex');
            title.classList.add('justify-content-between');
            let name = document.createElement('h5');
            name.innerHTML = ply.name;
            let num = document.createElement('h5');
            num.innerHTML = "#" + ply.number;
            

            let table = document.createElement("table");
            table.classList.add('table')
            body.appendChild(table)
            let tbody = document.createElement("tbody");
            table.appendChild(tbody)

            let tr1 = document.createElement("tr");
        
            let tdPos1 = document.createElement("td");
            tdPos1.innerHTML = "Position";
            tr1.appendChild(tdPos1);
            let tdPos2 = document.createElement("td");
            tdPos2.classList.add("player-pos")
            tdPos2.innerHTML = ply.position;
            tr1.appendChild(tdPos2);

            let tr2 = document.createElement("tr");
            
            let tdGoal1 = document.createElement("td");
            tdGoal1.innerHTML = "Goals";
            tr2.appendChild(tdGoal1);
            let tdGoal2 = document.createElement("td");
            tdGoal2.innerHTML = ply.goals;
            tdGoal2.classList.add("player-goals")
            tr2.appendChild(tdGoal2);

            let link = document.createElement('a');
            link.classList.add('stretched-link');
            link.href = `/player?id=${ply.id}`;

            body.appendChild(link);

            title.appendChild(name);
            title.appendChild(num);
            body.appendChild(title)
            col2.appendChild(title); 
            tbody.appendChild(tr1);
            tbody.appendChild(tr2);
            col2.appendChild(body)


            card.appendChild(row1)
            row1.appendChild(col1)
            row1.appendChild(col2)
            

            container.appendChild(card)
            console.log("submitted");

            location.reload();
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {
        errorBox.innerHTML = err.message;
        errorBox.classList.remove('hidden');
    }

}).catch(err => {
    console.log(err);
});

