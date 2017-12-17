var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "red";
// c.fillRect(100,100,100,100);

// c.fillStyle = "green";
// c.fillRect(100,200,100,100);

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,50);
// c.lineTo(550,300);
// c.strokeStyle = "blue";
// c.stroke();
// console.log(canvas);

//arc circle
// c.beginPath();
// c.arc(300,300,50,0,Math.PI*2,false);
// c.stroke();
// var color = ['blue','red','green','grey','orange','pink','yellow'];
// console.log(color[2]);
// for(var i=0;i<50;i++){
// 	var x = Math.random()*window.innerWidth;
// 	var y = Math.random()*window.innerHeight;
// 	var r = Math.random()*100;
// 	var col = Math.floor(Math.random()*6);
// 	c.beginPath();
// 	c.arc(x,y,r,0,Math.PI*2,false);
// 	c.strokeStyle = color[col];
// 	// console.log(color.col);
// 	c.stroke();
// }

//animate
// c.beginPath();
// c.arc(200,200,40,0,Math.PI*2,false);
// c.strokeStyle = 'blue';
// c.stroke();
var mouse = {
	x: undefined,
	y: undefined
}
window.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('touchmove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth-5;
	canvas.height = window.innerHeight-5;

	init();
})

function Circle(x,y,dx,dy,radius,fillColor){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.fillColor = fillColor;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.strokeStyle = fillColor;
		c.stroke();
		c.fillStyle = fillColor;	
		c.fill();
	}
	this.update =function(){
		if(this.x + this.radius > innerWidth || this.x-this.radius < 0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y-this.radius < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;	
		this.y += this.dy;

		//interactivity
		if(mouse.x-this.x<80 && mouse.x-this.x>-80 && mouse.y-this.y<80 && mouse.y-this.y>-80){
			if(this.radius < maxRadius)
				this.radius += 1;
		}
		else if(this.radius > this.minRadius){
			this.radius -= 1;
		}


		this.draw();
	}
}

var maxRadius = 60;
// var minRadius = 10;
var circleArray = [];
var radiusArray = [10,15,20];
var colorArray = ['#ff4c00','#FF6800','#ff7c00','#e3e3e3','#3a3a3a'];

// console.log(circleArray);

function init(){
	circleArray = [];
	for( var i = 0 ; i < 300 ; i++ ){
		var radius = radiusArray[Math.floor(Math.random()*3)];
		// console.log(radius);
		var fillColor = colorArray[Math.floor(Math.random()*5)];
		var x = Math.random()*(innerWidth - radius*2) + radius;
		var y = Math.random()*(innerHeight - radius*2) + radius;
		var dx =(Math.random()-0.5);
		var dy =(Math.random()-0.5);

		circleArray.push(new Circle(x,y,dx,dy,radius,fillColor));
	}	
}
function animate() {
	requestAnimationFrame(animate);
	// console.log('asdn');
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i<circleArray.length;i++){
		circleArray[i].update();
	}
}
init();
animate();