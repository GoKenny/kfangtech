
function DrawRectangle() {
	
	// 1. Match the "convas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. draw the shape (x,y,width,height) 
	ctx.fillStyle="orange";
	ctx.fillRect(0,0,150,50);
	

}

function DrawLine() {
	
	// 1. Match the "convas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. draw the starting point (0,0), ending point (200,100).
	ctx.moveTo(0,0);
	ctx.lineTo(100,50);
	ctx.stroke();

	ctx.moveTo(100,50);
	ctx.lineTo(200,0);
//	ctx.stroke();
}

function DrawCircle() {
	
	// 1. Match the "convas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. draw the arc(x,y,r,start,stop)
	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();
}

function DrawText() {
	
	// 1. Match the "convas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. draw the shape (x,y,width,height) 
	ctx.font = "30px 'Segoe Print'";
//	ctx.fillText("Hello World",10,50);
	ctx.strokeText("Hello World",10,50);
}

function DrawGradient() {
	
	// 1. Match the "convas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. Create Linear or Radial gradient
				//createLinearGradient(x,y,x1, y1)
//	var grd = ctx.createLinearGradient(0,0,200,0);
				//createRadialGradient(x, y, r,x1,y1, r1
	var grd = ctx.createRadialGradient(75,50,5,90,60,100);
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"white");
	
	// 3. Fill with rectangles, circles, line .... with gradient
	ctx.fillStyle = grd;
	ctx.fillRect(10,10,150,80);
	
}

function DrawImage() {
	
	// 1. Match the "canvas" tag
	var c=document.getElementById("myCanvas02");
	var ctx=c.getContext("2d");
	
	// 2. Grab the <img> tag
	var img=document.getElementById("myImg");
	
	// 3. Put it to the canvas
	ctx.drawImage(img,10,10);
}



function cnvs_getCoordinates(e){
	x=e.clientX;
	y=e.clientY;
	document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + ", " + y + ")";
}

