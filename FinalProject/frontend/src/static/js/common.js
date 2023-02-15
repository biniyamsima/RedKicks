import api from './APIClient.js';

const logo = document.querySelector('#teamlogo');

api.getCurrentUser().then(user => {
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
  userPic.href = `/coach`;
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
    teamlogo.src = team.logo;
})

})
.catch(error => {
  console.log("We are not logged in");
});



/*********************\
* SERVICE WORKER CODE *
\*********************/

function registerServiceWorker() {
  if (!navigator.serviceWorker) { // Are SWs supported?
    return;
  }

  navigator.serviceWorker.register('/sw_pages.js')
    .then(registration => {
      if (!navigator.serviceWorker.controller) {
        //Our page is not yet controlled by anything. It's a new SW
        return;
      }

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed, but waiting');
        
      } else if (registration.active) {
        console.log('Service worker active');
      }

      registration.addEventListener('updatefound', () => {
        console.log("SW update found", registration, navigator.serviceWorker.controller);
        newServiceWorkerReady(registration.installing);
      });
    })
    .catch(error => {
      console.error(`Registration failed with error: ${error}`);
    });

  navigator.serviceWorker.addEventListener('message', event => {
    console.log('SW message', event.data);
  })

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload" in dev tools.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if(refreshing) return;
    window.location.reload();
    refreshing = true;
  });

};

registerServiceWorker();


//This method is used to notify the user of a new version
function newServiceWorkerReady(worker) {

  if(confirm("New Service worker available do you wish to update the page?"))
  {
    worker.postMessage({action: 'skipWaiting'})
  }

  else {
      return
  }

}
