import api from './APIClient.js';

// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

const grid1 = document.querySelector('.position');

const wins = document.querySelector('#wins');
const losses = document.querySelector('#losses');
const ties = document.querySelector('#ties');
const origin = document.querySelector('#origin');

const grid = document.querySelector('.grid-container3');





api.getTeam(id).then(team => {

    let image = document.createElement("img");
    image.classList.add("playerImage");
    image.src = team.logo;

    let name = document.createElement('h2');
    name.classList.add("playerName");
    name.innerHTML = team.name ;

    grid1.appendChild(image);
    grid1.appendChild(name);

    wins.innerHTML = team.wins;
    losses.innerHTML = team.losses;
    ties.innerHTML = team.ties;
    origin.innerHTML = team.origin


});

api.getMatchups(id).then(schedule => {
    schedule.forEach(matchup => {
        const icon = document.createElement('div');
    icon.classList.add('icon');
    let a = document.createElement('a')
    let image = document.createElement('img');
    a.classList.add('teamGrid');
    let teamName = document.createElement('p');
    // sid homeTeamId awayTeamId time location


    a.appendChild(image);
    a.appendChild(teamName);

    let otherTeamId = matchup.awayTeamId;

    if(matchup.awayTeamId == id) {
        otherTeamId = matchup.homeTeamId;
    }
    a.href = `/team?id=${otherTeamId}`;

    api.getTeam(otherTeamId).then(team => {
        teamName.innerHTML = team.name;
        image.src = team.logo;
    })

    icon.appendChild(a);

    grid.appendChild(icon);

    let location = document.createElement('h4');
    location.innerHTML = matchup.location;

    let time = document.createElement('h4');
    let date = new Date(matchup.time);
    time.innerHTML = date.toDateString() + " " + date.toLocaleTimeString();

    grid.appendChild(location);
    grid.appendChild(time);
    });
    
})


// Container for players.
const container = document.querySelector('.grid-container2');

api.getPlayersByTeam(id).then(players => {
    if (!players[0]) {
        // Nothing to display.
    } else {
        players.forEach(player => {
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