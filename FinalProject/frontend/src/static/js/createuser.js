import api from './APIClient.js';

document.addEventListener('DOMContentLoaded', () => {

    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let passwordconfirmation = document.getElementById('passwordconfirmation');

    // Select HTML.
    let teamid = document.getElementById('teamId');
    api.getTeams().then(teams => {
        teams.forEach(team => {
            let selectElement = document.createElement('option');
            selectElement.value = team.id;
            selectElement.innerHTML = team.name;
            teamid.appendChild(selectElement);
        });
    });

    let wins = document.getElementById('wins');
    let losses = document.getElementById('losses');
    let ties = document.getElementById('ties');
    let imageLink = document.getElementById('imageLink');

    let form = document.querySelector("#myform");
    
    const errorBox = document.querySelector('#errorbox');

    form.addEventListener('submit', e => {
        errorBox.classList.add('hidden');
        e.preventDefault();
        if(password.value != passwordconfirmation.value) {
            
            errorBox.classList.remove("hidden");
            errorBox.innerHTML = "Passwords do not match.";
            return false;
        }
       
        let coach = {
            "coachId": null,
            "name": `${firstname.value} ${lastname.value}`,
            "teamId": teamid.value,
            "wins": wins.value,
            "losses": losses.value,
            "ties": ties.value,
            "username": username.value,
            "salt": null,
            "password": password.value,  
            "avatar": imageLink.value
        }

        // the then statement is not reached, nor is the catch statement.
        api.createCoach(coach).then(() => {
            document.location = "/login"; // FINALLY REACHABLE.
        }).catch((err) => {
            errorBox.classList.remove("hidden");
            errorBox.innerHTML = "Username already exists.";
        }
        );
    })
});
