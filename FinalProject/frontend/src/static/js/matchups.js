import api from './APIClient.js';

let user = localStorage.getItem('user');

user = JSON.parse(user);

const grid = document.querySelector('.grid-container');
api.getMatchups(user.teamId).then(schedule => {
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

        if (matchup.awayTeamId == user.teamId) {
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


