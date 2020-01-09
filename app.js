window.onload = () => {
  //make canvas

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  //get dimensions
  let w = window.innerWidth;
  let h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  //snowflakes particles
  let mp = 55;
  let particles = []; //array

  for (let i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * w, //x coordinates
      y: Math.random() * h, //y coordinates
      r: Math.random() * 6 + 1, //radius of particles
      d: Math.random() * mp //density
    });
  }
  //function to draw flakes
  draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();

    for (let i = 0; i < mp; i++) {
      let p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  };

  let angle = 0;

  //update snowflakes
  update = () => {
    angle += 0.02;

    for (let i = 0; i < mp; i++) {
      let p = particles[i];
      //update coords x and y
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      //send flakes back to the top when it exits the screen:

      if (p.x > w + 7 || p.x < -7 || p.y > h) {
        if (i % 3 > 0) {
          //for 66% of the flakes
          particles[i] = { x: Math.random() * w, y: -10, r: p.r, d: p.d };
        } else {
          //flakes exit from the right:
          if (Math.sin(angle) > 0) {
            particles[i] = { x: -2, y: Math.random() * h, r: p.r, d: p.d };
          } else {
            //enter from the right
            particles[i] = { x: w + 7, y: Math.random() * h, r: p.r, d: p.d };
          }
        }
      }
    }
  };
  //animation loop every 33ms
  setInterval(draw, 33);
  //let go for the demo
};


//Game:

// load event listeners
loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', function() { calcTime(); });
};

var timeTo = document.getElementById('time-to').value,
		date,
		now = new Date(),
		newYear = new Date('1.1.2020').getTime(),
		startTimer = '';

// calculate date, hour, minute and second
function calcTime(dates) {
	//ui variables
	clearInterval(startTimer);

	if(typeof(dates) == 'undefined'){
		date = new Date(newYear).getTime();
	}else {
		date = new Date(dates).getTime();
	}

	function updateTimer(date){

		var now = new Date().getTime();
		var distance = date - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// select element
		document.querySelector('.clock-day').innerHTML = days;
		document.querySelector('.clock-hours').innerHTML = hours;
		document.querySelector('.clock-minutes').innerHTML = minutes;
		document.querySelector('.clock-seconds').innerHTML = seconds;

		if(now >= date){
			clearInterval(startTimer);
			document.querySelector('.clock-day').innerHTML = 'D';
			document.querySelector('.clock-hours').innerHTML = 'O';
			document.querySelector('.clock-minutes').innerHTML = 'N';
			document.querySelector('.clock-seconds').innerHTML = 'E';
		}
	}

	startTimer = setInterval(function() { updateTimer(date); }, 1000);

}
