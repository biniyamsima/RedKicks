import api from './APIClient.js';

// Local storage JSON object.
const user = JSON.parse(localStorage.getItem('user'));

// Container for injuries
const container = document.querySelector('.grid-container');

api.getInjuriesByTeam(user.teamId).then(injuries => {
    injuries.forEach(injury => {
        api.getPlayer(injury.playerId).then(player => {


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
            tdGoal1.innerHTML = "Injury and Length";
            tr2.appendChild(tdGoal1);
            let tdGoal2 = document.createElement("td");
            tdGoal2.innerHTML = `${injury.injuryDesc}: ${injury.recoveryTime} weeks`;
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
    });
}).catch(err => {
    let container = document.querySelector('.noinjuries');
    let noInj = document.createElement('h4');
    noInj.innerHTML = "No injuries found for this team.";
    container.appendChild(noInj);
})