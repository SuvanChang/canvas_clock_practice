// JavaScript Document
window.onload=function(){
var width = document.body.clientWidth;
var height = document.body.clientHeight;
var r= 8*width/1200;
var color = '#e3a0DB';
var date = new Date();
var hour   = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();	
var temps1 = parseInt(second%10);
var temps2 = parseInt(second/10);
var	tempm1 = parseInt(minute%10);
var	tempm2 = parseInt(minute/10);
var	temph1 = parseInt(hour%10);
var	temph2= parseInt(hour/10);
var Mleft = 30*width/400;
var Mtop = 100*height/580;
var date = null;
var colorSet = ['#A52A2A','#DEB887','#5F9EA0','#7FFF00','#D2691E','#FF7F50','#6495ED','#FFF8DC','#DC143C','#00FFFF','#00008B','#008B8B',]

var balls = [];


		var canvas = document.getElementById('canvas');
		canvas.width = width;
		canvas.height = height;
		var context = canvas.getContext('2d');
		
		setInterval(function(){
				update(context);
				render(context);
				renderBalls(balls,context);
				
/*				dropballs(balls);
*/				if(balls.length>1000){balls=[]}
/*				renderBall(context);*/
			},50)		
		
function update(context){
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		 date = new Date();
		 hour   = date.getHours();
		 minute = date.getMinutes();
		 second = date.getSeconds();	
		 if(parseInt(second%10)!=temps1){addball(Mleft+93*(r+1),Mtop,parseInt(second%10))}
		 if(parseInt(second/10)!=temps2){addball(Mleft+78*(r+1),Mtop,parseInt(second/10))}
		 if(parseInt(minute%10)!=tempm1){addball(Mleft+54*(r+1),Mtop,parseInt(minute%10))}
		 if(parseInt(minute/10)!=tempm2){addball(Mleft+39*(r+1),Mtop,parseInt(minute/10))}
		 if(parseInt(hour%10)!=temph1){addball(Mleft+15*(r+1),Mtop,parseInt(hour%10))}
		 if(parseInt(hour/10)!=temph2){addball(Mleft,Mtop,parseInt(hour/10))}
		 temps1 = parseInt(second%10);
		 temps2 = parseInt(second/10);
		 tempm1 = parseInt(minute%10);
		 tempm2 = parseInt(minute/10);
		 temph1 = parseInt(hour%10);
		 temph2= parseInt(hour/10);
		for(var i = 0;i < balls.length;i++){
				balls[i].vy += balls[i].g;					
				balls[i].x += balls[i].vx;
				balls[i].y += balls[i].vy;	
				if(balls[i].y >= height-balls[i].r){
					balls[i].y = height-balls[i].r;
					balls[i].vy = -balls[i].vy*0.6;
				
				}
				if(balls[i].x >= width-balls[i].r){
					balls[i].x = width-balls[i].r;
					balls[i].vx = -balls[i].vx;
				}

				if(balls[i].y <= balls[i].r){
					balls[i].y = balls[i].r;
					balls[i].vy = -balls[i].vy;
				}
			}
			
				var cnt = 0;
				for(var i = 0;i<balls.length;i++){
						if(balls[i].x+balls[i].r>=0){balls[cnt++]=balls[i]}
					}
				while(balls.length>cnt){balls.pop();}	
	 }

/*function renderBall(context){
		drawBall(ball,context);
	}*/
function renderBalls(balls,cxt){
		for(var i = 0;i < balls.length;i++){
					cxt.beginPath();
					cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
					cxt.fillStyle = balls[i].color;
					cxt.fill();
			}
	}
function addball(x,y,digitnum){
			var digN = digit[digitnum]
			for(var i=0;i<digN.length;i++){
				  for(var j = 0;j<digN[i].length;j++){
					  	if(digN[i][j]){
							var c=Math.round(Math.random()*12);
								var aball={
										x:x+2*(r+1)*j,
										y:y+2*(r+1)*i,
										color:colorSet[c],
										vx:Math.pow(-1,Math.round(Math.random()*1000))*9.5,
										vy:Math.random()*10*(-1),
										r:r+Math.random()*4,
										g:1.5+Math.random(),
									}
								balls.push(aball);
							}
					  }
				}
	}
/*function dropballs(balls){
	for(var i = 0;i<balls.length;i++){
			if(balls[i].x+r<=0){balls.splice(0,i);}
		}
	}
*/function render(context){
			draw(context,parseInt(hour/10),Mleft,Mtop,color,r);
			draw(context,parseInt(hour%10),Mleft+15*(r+1),Mtop,color,r);	
			draw(context,10,Mleft+30*(r+1),Mtop,color,r);	
			draw(context,parseInt(minute/10),Mleft+39*(r+1),Mtop,color,r);
			draw(context,parseInt(minute%10),Mleft+54*(r+1),Mtop,color,r);
			draw(context,10,Mleft+69*(r+1),Mtop,color,r);			
			draw(context,parseInt(second/10),Mleft+78*(r+1),Mtop,color,r);
			draw(context,parseInt(second%10),Mleft+93*(r+1),Mtop,color,r);
		}
function draw(cxt,digitnum,x,y,color,r){
			var digN = digit[digitnum]
			for(var i=0;i<digN.length;i++){
				  for(var j = 0;j<digN[i].length;j++){
					  	if(digN[i][j]){
								cxt.beginPath();
								cxt.arc(x+2*(r+1)*j,y+2*(r+1)*i,r,0,2*Math.PI);
								cxt.fillStyle = color;
								cxt.fill();
							}
					  }
				}
		}

/*function drawBall(ball,cxt){
			cxt.beginPath();
			cxt.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
			cxt.fillStyle = ball.color;
			cxt.fill();
		}*/
}