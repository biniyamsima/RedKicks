const express = require('express');
const frontendRouter = express.Router();


/*****************\
* FRONTEND ROUTES *
\*****************/


const path = require('path');
// Designate the public folder as serving static resources
frontendRouter.use(express.static(__dirname + '/static/'));
frontendRouter.use(express.urlencoded({extended: true}));

const html_dir = path.join(__dirname ,'./templates/');


frontendRouter.get('/login', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

frontendRouter.get('/', (req,  res) => {
  res.sendFile(`${html_dir}index.html`);
});

frontendRouter.get('/offline', (req, res) => {
  res.sendFile(`${html_dir}offline.html`);
});

frontendRouter.get('/admin', (req, res) => {
  res.sendFile(`${html_dir}admin.html`);
});

frontendRouter.get('/matchups', (req, res) => {
  res.sendFile(`${html_dir}matchups.html`);
});

frontendRouter.get('/injuries', (req, res) => {
  res.sendFile(`${html_dir}injuries.html`);
});

frontendRouter.get('/roster', (req, res) => {
  res.sendFile(`${html_dir}roster.html`);
});

frontendRouter.get('/player', (req, res) => {
  res.sendFile(`${html_dir}player.html`);
});

frontendRouter.get('/createuser', (req, res) => {
  res.sendFile(`${html_dir}createuser.html`);
});

frontendRouter.get('/coach', (req, res) => {
  res.sendFile(`${html_dir}coach.html`);
});

frontendRouter.get('/team', (req, res) => {
  res.sendFile(`${html_dir}team.html`);
});



module.exports = frontendRouter;