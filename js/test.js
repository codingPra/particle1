window.requestAnimationFrame =
window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(cb) {setTimeout(cb, 17);};

var canvas = document.getElementById( "canvas" ),
	ctx = canvas.getContext( "2d" ),
	NUM = 20,
	particles = [],
	W = window.innerWidth, 
	H = window.innerHeight

canvas.width = W;
canvas.height = H;

function Particle(ctx,x,y){
	this.ctx = ctx;
	this.initialize(x,y);
}

Particle.prototype.initialize = function(x,y){
	this.x = x || 0;
	this.y = y || 0;
	this.radius = 700;
	this.v = {
		x:Math.random()*10-5,
		y:Math.random()*10-5
	}
	this.color = {
		r:Math.floor(Math.random()*255),
		g:Math.floor(Math.random()*255),
		b:Math.floor(Math.random()*255),
		a:1
	}
}

Particle.prototype.render = function(){
	this.updatePosition();
	this.wrapPosition();
	this.draw();
}

Particle.prototype.draw = function(){
	ctx = this.ctx;
	ctx.beginPath();
	ctx.fillStyle = this.gradient();
	ctx.arc(this.x,this.y,this.radius,Math.PI*2,false);
	//ctx.rect( this.x, this.y, 4, 4 ); // 位置指定
	ctx.fill();
	ctx.closePath();
}

Particle.prototype.updatePosition = function(){
	this.x+=this.v.x;
	this.y+=this.v.y;
}

Particle.prototype.wrapPosition = function(){
  if(this.x < 0) this.x = W;
  if(this.x > W) this.x = 0;
  if(this.y < 0) this.y = H;
  if(this.y > H) this.y = 0;
}

Particle.prototype.gradient = function(){
	//var col = "0,0,0";
	var col = this.color.r + ", " + this.color.g + ", " + this.color.b;
	var g = this.ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
	g.addColorStop(0,"rgba("+col+",1)")
	g.addColorStop(0.5,"rgba("+col+",0.2)")
	g.addColorStop(1,"rgba("+col+",0)")
	return g;
}

for(var i = 0; i < NUM; i++){
	positionX = Math.random()*120;
	positionY = Math.random()*20;
	particle = new Particle(ctx,positionX,positionY);
	particles.push(particle);
}

render();

function render(){
	ctx.clearRect(0,0,W,H);
	ctx.globalCompositeOperation = "lighter";
	particles.forEach(function(e){e.render();});
	requestAnimationFrame(render);
}