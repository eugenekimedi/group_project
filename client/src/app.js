var populateScreen = require("./views/populate_screen.js");
var setNavEvents = require('./views/info_nav_events.js');
var DrawCanvas = require('./views/draw_canvas.js');
var CanvasHandler = require('./views/canvas_handler.js');

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function() {
  if(this.status !== 200) {
    alert("Sorry, we weren't able to connect. Please try again later.");
    return;
  }

  var jsonString = this.responseText;
  solarSystem = JSON.parse(jsonString);
  populateScreen(solarSystem.planets[6]);
}

var manageBackgroundCanvas = function(){
  var resizeCanvas = function() {
    canvasTwo.width = window.innerWidth;
    canvasTwo.height = window.innerHeight;
  }

  var canvasTwo = document.querySelector("#canvas-full");
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

window.addEventListener('load', function() {
  var canvas = document.querySelector('#canvas');
  var canvasHandler = new CanvasHandler(canvas);
  new DrawCanvas(canvasHandler, canvas);
  makeRequest("/solar_system", requestComplete);
  setNavEvents();

  manageBackgroundCanvas();
})
