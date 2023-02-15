import api from './APIClient.js';

const home = document.querySelector('#hometeam');
const away = document.querySelector('#awayteam');


api.getTeams().then(teams => {
    teams.forEach(team => {
        let selectElement = document.createElement('option');
        selectElement.value = team.id;
        selectElement.innerHTML = team.name;

        let selectElement2 = document.createElement('option');
        selectElement2.value = team.id;
        selectElement2.innerHTML = team.name;
        home.appendChild(selectElement);
        
        away.appendChild(selectElement2);
        
    });
});

const teamForm = document.getElementById('addteam');
const errBoxTeam = document.getElementById('errorboxteam2');

teamForm.addEventListener('submit', e => {
    e.preventDefault();
    errBoxTeam.classList.add('hidden');

    let origin = document.getElementById('origin');
    let imageLink = document.getElementById('imageLink');
    let name = document.getElementById('name');
    let wins = document.getElementById('wins');
    let losses = document.getElementById('losses');
    let ties = document.getElementById('ties');

    let team = {
        "teamId": null,
        "name": name.value,
        "origin": origin.value,
        "logo": imageLink.value,
        "wins": wins.value,
        "losses": losses.value,
        "ties": ties.value
    }

    try {
        if (!team.name) throw new Error("Name cannot be empty.");
        if (!team.origin) throw new Error("Origin cannot be empty.");
        if (!team.logo) throw new Error("Team must have a logo.");

        api.createTeam(team).then(team => {
            errBoxTeam.classList.remove('hidden');
            errBoxTeam.innerHTML = "Added new team successfully. Please wait.";
            setTimeout( () => { location.reload() }, 5000);
        })
    } catch (err) {
        errBoxTeam.classList.remove('hidden');
        errBoxTeam.innerHTML = err.message;
    }
});




const errBoxMatchup = document.getElementById('errorboxteam');
const matchupForm = document.getElementById('addmatchup');

matchupForm.addEventListener('submit', e => {
    e.preventDefault();
    errBoxMatchup.classList.add('hidden');

    let time = document.querySelector('#date-time');
    let location = document.querySelector('#location');

    let matchup = {
        "sid": null,
        "homeTeamId": home.value,
        "awayTeamId": away.value,
        "time": time.value,
        "location": location.value
    }

    try {
        if (matchup.homeTeamId == matchup.awayTeamId) throw new Error("Team cannot match with itself.");
        if (!matchup.time) throw new Error('Time not specified.')
        if (!matchup.location) throw new Error('Location not specified')

        api.createMatchup(matchup).then(match => {
            errBoxMatchup.classList.remove('hidden');
            errBoxMatchup.innerHTML = "Matchup Created."
        });
    } catch (err) {
        errBoxMatchup.classList.remove('hidden');
        errBoxMatchup.innerHTML = err.message;
    }
});


api.getCurrentUser().then(user => {

    if(user.username != "admin") {
        throw "not authenticated as admin"
    }
    let link = document.createElement('a');
    link.href = '#';
    const log = document.createElement('p');
    log.classList.add("btn");
    log.classList.add("btn-success");
    log.classList.add("userNavText");
  
    log.innerHTML = "Log Out";
    link.appendChild(log);
    link.addEventListener("click", e => {
      e.preventDefault();
      api.logOut().then(() => {
        localStorage.removeItem('user');
        document.location = "/login";
      });
    })
  
    const userPic = document.createElement('a');
    userPic.classList.add("userProfileSelect")
    userPic.href = `/admin`;
    const img = document.createElement('img');
    img.src = user.avatar;
    img.classList.add('userPic');
    userPic.appendChild(img);
  
    const name = document.createElement('p');
    name.classList.add("userNavText");
    name.innerHTML = "@" + user.username;
  
    const userProfile = document.createElement('div');
    userProfile.classList.add('userProfile');
    userPic.appendChild(name);
    userProfile.appendChild(userPic);
  
   
    document.getElementById('user').appendChild(userProfile);
    document.getElementById('user').appendChild(link);
  
    api.getTeam(user.teamId).then(team => {
      team1.innerHTML = team.name;
  })
  
  })
  .catch(error => {
    console.log("Not authenticated as admin");
    history.back()
  });