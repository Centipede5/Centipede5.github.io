var game = new gameIO();
var chatdiv;
var maxClen = 5;
var currentserver = "US";
var changetoUS = function(){
/*	currentserver = "US";
	document.getElementById("usselect").style.color = "lime";
	document.getElementById("usselect").style.borderColor = "lime";
	document.getElementById("euselect").style.color = "gray";
	document.getElementById("euselect").style.borderColor = "gray";*/
}
var changetoEU = function(){
	/*currentserver = "EU";
	document.getElementById("euselect").style.color = "lime";
	document.getElementById("euselect").style.borderColor = "lime";
	document.getElementById("usselect").style.color = "gray";
	document.getElementById("usselect").style.borderColor = "gray";*/
}
var cansend = false;
		function sendchat(){
			if(cansend){
			game.currentPackets.push({
				type: "chat",
				chat:document.getElementById("chat-inputr").value} );
			cansend = false;
			document.getElementById("chat-inputr").value = "";
			setTimeout(function(){cansend = true},5000);
			}else{
				chatdiv.innerHTML +="<div style = 'color:red'>CHILL OUT</div>";
				if(chatdiv.children.length>maxClen){
        			chatdiv.children[0].remove();
        		}
			}
		}
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
function SendLdr(name,score){
    var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
var client = new HttpClient();
var topscores = [];
client.get('https://centipede5.pythonanywhere.com/getr', function(response) {
    topscores = JSON.parse(response);
    function ParseData(toparse){
  topscores.push(toparse);
  topscores.sort(function(a, b){return b.score-a.score});
  if(topscores.length>=10){
	console.log(topscores.pop());
  }
}
    var newEntry = {};
  newEntry.name = name;
  newEntry.score = score-0;
  console.log(newEntry);
  ParseData(newEntry);
  client.get('https://centipede5.pythonanywhere.com/data?setto='+JSON.stringify(topscores), function(response) {return "hi";});
});

}
var client = new HttpClient();
		client.get('https://centipede5.pythonanywhere.com/getr', function(response) {
    // do something with response
    		var topscores = JSON.parse(response);
    		var sendto = "<caption><b style = 'font-size:24'>All-Time Leaderboard</b></caption><br><table id = 'trt'><tr><th>Name</th><th>Map Completes</th></tr>";
    		for(var i=0; i<topscores.length; i++){
    			sendto+= "<tr><td>"+topscores[i].name+"</td><td>"+topscores[i].score+"</td></tr>";
    		}
    		sendto += "</table>";
    		console.log(sendto);
    		document.getElementById("leader").innerHTML = sendto;
		});
function pingServer(server){
	client.get(server, function(response) {});
}
client.get( 'https://batland-main.herokuapp.com/getplayerserver', function(response) {
    		var totalservers = JSON.parse(response);
    		var serverdiv = document.getElementById('serverSelect');
    		for(var i in totalservers){
    			if(totalservers[i].players<7){
    				serverdiv.innerHTML+= "<option value="+i+">"+i.substring(0,3)+" "+"["+totalservers[i].players+"/7]"+"</option>";
    			}
			}		
		});
var servers = ["us4-batland.herokuapp.com","us5-batland.herokuapp.com","eu4-batland.herokuapp.com","eu5-batland.herokuapp.com","batland-main.herokuapp.com"];
for(var i in servers){
	pingServer("https://"+servers[i]);
}

	window.onload = function() {
		
		chatdiv = document.getElementById("chat-div");
		cansend = true;
		//setTimeout(function(){document.getElementById("chat-inputr").focus()},2000);
		document.getElementById("PP").style.backgroundColor = "white";
		window.Play = function(){
		var finalservername = "ws://"+document.getElementById("serverSelect").value+".herokuapp.com";
		console.log("you where connected to"+finalservername);
		game.createSocket("ws://"+document.getElementById("serverSelect").value+".herokuapp.com");
		document.getElementById("signDiv").style.display = "none";
		document.getElementById("chat").style.display = "block";
		function isVisualClose(object) {
        if (object.segment !== undefined || object.type == "arc")
            return true;
        if (Math.abs(game.me.new.position.x - object.position.x) < 1920 / 2 + 1000 && Math.abs(game.me.new.position.y - object.position.y) < 1080 / 2 + 700)
            return true;
    }
    	
		//console.log(httpGet("http://chat-redditbotyoutube.cs50.io/getp"));
		var mapsize = 2000;
		var renderer = new game.renderer();
		renderer.clearScreen = false;
		renderer.ctx.imageSmoothingEnabled = false;
		renderer.c.style.backgroundColor = "#A9CCE3";
		var mouse = new game.mouse( renderer );
		var scene = new game.scene();
		scene.camera.ratio = 1.1;
		var middle = new game.scene();
		middle.camera = scene.camera;
		var Back = new game.scene();
		Back.camera = scene.camera;
		var top = new game.scene();
		top.camera = scene.camera;
		var background = new game.scene();
		background.camera = scene.camera;
		function getElem( elem ) {
			return document.getElementById( elem );
		}
		function randomPos( domain ) {
			return 2 * ( Math.random() - 0.5 ) * domain;
		}
		/*Back.add(new game.image( getElem("tree"),400, 1200+50, 200/4, 471/4));
		Back.add(new game.image( getElem("tree"),455, 1200+50, 200/4, 471/4));
		*/
		
		function makeMountains(x,y){
			Back.add(new game.image( getElem("mountain"),x,     y-400, 500*2.5, 500*2.5));
			Back.add(new game.image( getElem("mountain"),x+800, y-260, 500*2.1, 500*2.1));
			Back.add(new game.image( getElem("mountain"),x+400, y-230, 500*1.8, 500*1.8));
		}
		function makeMountain(x,y){
			//Back.add(new game.image( getElem("mountain"),x,     y-400, 500*2.5, 500*2.5));
			Back.add(new game.image( getElem("mountain"),x+800, y-260, 500*2.1, 500*2.1));
			Back.add(new game.image( getElem("mountain"),x+400, y-230, 500*1.8, 500*1.8));
		}
		function makeBushes(x,y){
			Back.add(new game.image( getElem("tree"),x+80, y-20, 200/2, 471/2));
			Back.add(new game.image( getElem("bush"),x, y+70, 300, 160));
			Back.add(new game.image( getElem("bush"),x+100, y+80, 300/2, 160/2));
			Back.add(new game.image( getElem("mushrooms"),x, y+100, 200/4, 143/4));
		}
		function makeMushroom(x,y){
			Back.add(new game.image( getElem("mushrooms"),x, y+100, 200/4, 143/4));
		}
		function makeMushroom2(x,y){
			Back.add(new game.image( getElem("mushrooms2"),x, y+95, 200/4, 133/4));
		}
		function makePole(x,y){
			Back.add(new game.image( getElem("pole"),x, y+10, 200/2, 374/2));
		}
		function makeWeel(x,y){
			Back.add(new game.image( getElem("weel"),x, y+10, 300, 187));
		}
		function makeEgg(x,y){
			Back.add(new game.image( getElem("egg"),x, y, 300/2, 412/2));
		}
		makePole(0,1200);
		makeMountain(1000,1200);
		makeBushes(600,1400);
		makeBushes(2200,1200);
		//makeMushroom2(800,1200);
		makeMushroom(1600,1200);
		setTimeout(function(){
			makeMountains(8400,1400);
			makeWeel(2800,1400);
			makeMushroom2(3000,1400);
			makeMushroom(3400,1400);
			makeBushes(6200,1200);
			//7800 1400
			makeBushes(8000,1400);
			makeBushes(10600,1400);
			//11400 1200
			makeBushes(11600,1200);
			makeBushes(12000,1200);
			makeBushes(19200,1400);
			makeWeel(18600,1400);
			//14800 1200
			makeEgg(14800,1200);
			
			makeBushes(13800,1200);
			
		},1000);
		var MSG = false;

		/*
		for( var i = -6*mapsize/2000; i <= 6*mapsize/2000; i++ ) {
			background.add( new game.image( getElem("wall"), mapsize+500/3, i * 1000 / 3, 180/3, 1000/3 ) );
			background.add( new game.image( getElem("wall"), -mapsize-500/3, i * 1000 / 3, 180/3, 1000/3 ) );
			var newimg = new game.image( getElem("wall"), i * 1000 / 3, mapsize+500/3, 180/3, 1000/3 );
			newimg.rotation = Math.PI / 2;
			background.add( newimg );
			var newimg = new game.image( getElem("wall"), i * 1000 / 3, -mapsize-500/3, 180/3, 1000/3 );
			newimg.rotation = Math.PI / 2;
			background.add( newimg );
		}*/
		
		function addTree( pos1, pos2, img ) {
			scene.add( new game.image( document.getElementById( img ), pos1, pos2, 350, 350 ) );
		}
		var controls = new game.keyboard();
		var pz = 1.5;
		game.addType(
			"player",
			function(obj, packet) {
				obj.visual = new game.object();
				//obj.visual.add(new game.circle( 0, 0, 30, "lime") );
				obj.main = new game.animatedImage(window.animations["p"], 0, 0, 42*pz, 41*pz,1,true,0.25);
				obj.main.rotation = Math.PI/2;
			    obj.visual.add(obj.main);
			    obj.name = new game.text( packet.name, 60, 0, "black", "Arial", 25);
			    obj.name.rotation = Math.PI/2;
			    obj.visual.add(obj.name);
				obj.ree = packet.name;
				 //obj.visual.add(new game.spritesheetimage( getElem("coin"), 0, 0, 440, 40, 1,0,11 ));
				//new game.image( getElem("player"), 0, 0, 150, 150 )
				//obj.visual.rotation = +Math.PI / 2;
				//obj.visual.objects[  ].rotation = +Math.PI / 2;
				//obj.visual.size = 0.9;
				obj.lastposition= null;
				//obj.visual.addBelow( new game.circle( 0, 0, 70, "#000" ) );
				//obj.visual.belowObjects[ 0 ].opacity = 0.2;
				middle.add(obj.visual);
				obj.score = 0;
			},
			function(obj) {},
			function( obj, packet ) {
				if(obj.score != packet.score){
					MSG = true;
					obj.score = packet.score;
				}
				if(packet.newAnimation){
					
					if(packet.newAnimation === "f"){
						obj.visual.remove(obj.main);
						obj.main = new game.animatedImage(window.animations[packet.newAnimation], 0, 0, 69*pz, 45*pz,1,true,0.25);
					}else if(packet.newAnimation === "a"){
						obj.visual.remove(obj.main);
						obj.main = new game.animatedImage(window.animations[packet.newAnimation], 0, 0, 47*pz, 42*pz,1,true,0.25);
						/*
							obj.main.repeat = false;
							obj.main.oncomp = function(){
							obj.visual.remove(obj.main);
							obj.main = new game.animatedImage(window.animations[packet.newAnimation], 0, 0,  47*2, 42*2,1,true,0.25);
						}
						console.log(obj.main);*/
						//obj.main = new game.animatedImage(, 0, 0, 47*2, 42*2,1,true,0.25);
					}else if(packet.newAnimation === "p"){
						console.log("urmoma");
						obj.visual.remove(obj.main);
						obj.main = new game.animatedImage(window.animations[packet.newAnimation], 0, 0, 42*pz, 41*pz,1,true,0.25);
						//obj.main = new game.animatedImage(window.animations["p"], 0, 0, 42*2, 41*2,1,true,0.25);
						
					}
					obj.visual.add(obj.main);
					obj.main.rotation = Math.PI/2;
					obj.name.rotation = Math.PI/2;
					//obj.visual.objects[ 0 ].rotation = +Math.PI / 2;
				}
				obj.lastposition = obj.visual.position;
				//console.log(obj.lastposition);
        //obj.visual.objects[ 0 ].width = obj.visual.objects[ 0 ].height = 150 + packet.size * 5;
				obj.inVehicle = packet.inVehicle;
				if( obj.inVehicle == "tank" || obj.inVehicle == "truck" ) {
					obj.visual.opacity = 0;
				} else {
					obj.visual.opacity = 1;
				}
				if( Math.abs( obj.old.rotation - obj.new.rotation ) > Math.PI ) {
					if( obj.old.rotation > obj.new.rotation )
						obj.old.rotation -= Math.PI * 2;
					else
						obj.old.rotation += Math.PI * 2;
				}
			},
			function(obj){
				if(obj.id === game.me.id){
					SendLdr(game.me.ree,obj.score);
					setTimeout(function(){
						//alert("YOU LOST");
						window.location = window.location;
					},2000)
					
				}
				//console.log("DIED");
				var part = new game.animatedImage(window.animations["pdie"], obj.visual.position.x, obj.visual.position.y, (200/5)*pz, (270/5)*pz,1,false,0.25)
				scene.add(part);
				//console.log(part);
			}
		);
		game.addType(
			"spawner",
			function(obj, packet) {
        		obj.visual = new game.circle( 0, 0, 150, "#F00", 1 );
				obj.visual.addBelow( new game.circle( 0, 0, 200, "#F00" ) );
				obj.visual.belowObjects[ 0 ].opacity = 0.2;
				obj.increasing = false;
				scene.add( obj.visual );
			},
			function( obj ) {
				if(obj.increasing) {
					obj.visual.belowObjects[ 0 ].radius += 0.3 * game.clientDetails.dt;
					if(obj.visual.belowObjects[ 0 ].radius >= 230)
						obj.increasing = false;
				} else {
					obj.visual.belowObjects[ 0 ].radius -= 0.3 * game.clientDetails.dt;
					if(obj.visual.belowObjects[ 0 ].radius <= 170)
						obj.increasing = true;
				}
			},
			function( obj ) {
			}
		);
		game.addType(
			"mass",
			function(obj, packet) {
        obj.visual = new game.circle( 0, 0, 30, "#00F", 1 );
				obj.visual.addBelow( new game.circle( 0, 0, 50, "#00F" ) );
				obj.visual.belowObjects[ 0 ].opacity = 0.2;
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"wall",
			function(obj, packet) {
				//obj.visual = new game.rectangle( 0, 0, packet.dim[0], packet.dim[1], "green");
				if(packet.dim[0]<300){
					if(packet.dim[3]&&packet.dim[2]){
						obj.visual = new game.image( getElem("leftrightend"),on+100, 0, 202, 200);
					}else if(packet.dim[3]){
						obj.visual = new game.image( getElem("rightend"),on+100, 0, 202, 200);
					}else if(packet.dim[2]){
						obj.visual = new game.image( getElem("leftend"),on+100, 0, 202, 200);
					}else{
						obj.visual = new game.image( getElem("mid"),on+100, 0, 202, 200);
					}
				}else if(packet.dim[0]<400){
					obj.visual = new game.image( getElem("leftrightend"),0, 0, packet.dim[0], 200);
				}else{
					var left = packet.dim[0];
					var on = 0-packet.dim[0]/2;
					obj.visual = new game.object();
					if(packet.dim[2]){
						obj.visual.add(new game.image( getElem("leftend"),on+100, 0, 202, 200));
					}else{
						obj.visual.add(new game.image( getElem("mid"),on+100, 0, 202, 200));
					}
					left -= 200;
					on +=200;
					while(left>0){
						if(left<=200){
							if(packet.dim[3]){
								obj.visual.add(new game.image( getElem("rightend"),on+100, 0, 202, 200));
							}else{
								obj.visual.add(new game.image( getElem("mid"),on+100, 0, 202, 200));
							}
							left -= 200;
							on +=200;
						}else{
							obj.visual.add(new game.image( getElem("mid"),on+100, 0, 202, 200));
							left -= 200;
							on +=200;
						}
					}
				}
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"spike",
			function(obj, packet) {
				obj.visual = new game.image( getElem("spike"), 0, 0, packet.dim[0], packet.dim[1]);
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"checkpoint",
			function(obj, packet) {
				obj.visual = new game.image( getElem("flag"), 0, 0, 200, 283);
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"tspike",
			function(obj, packet) {
				obj.visual = new game.image( getElem("spike"), 0, 0, packet.dim[0], packet.dim[1]);
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"transition",
			function(obj, packet) {
				obj.visual = new game.image( getElem("leftramp"), 0, 0, 200, 300);
				scene.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		game.addType(
			"baddy",
			function(obj, packet) {
				//obj.visual = new game.rectangle( 0, 0, packet.dim[0], packet.dim[1], "red");
				obj.dir = packet.swit;
				obj.t = packet.retype;
				if(obj.t ==="monster"){
					//alert(packet.switch);
					console.log("monster facing direction " + packet.swit);
					if(obj.dir  == 0){
						//console.log("monster")
						obj.main = new game.animatedImage(window.animations["mb"], 0, 0, 106*2*0.75, 164*2*0.75,1,true,0.25);
					}else{
						obj.main = new game.animatedImage(window.animations["ma"], 0, 0, 106*2*0.75, 164*2*0.75,1,true,0.25);
					}
				}else{
					obj.main = new game.image( getElem("flyr"),0, 0, 100, 100);
				}
				obj.visual = new game.object();
				obj.visual.add(obj.main);
				top.add( obj.visual );
			},
			function() {},
			function( obj,packet ) {
				if(packet.switch!==undefined&&obj.dir !== packet.switch&&obj.t ==="monster"){
					console.log("SWITCH");
					obj.dir = packet.switch;
					if(obj.dir){
						obj.visual.remove(obj.main);
						obj.main = new game.animatedImage(window.animations["ma"], 0, 0, 106*2*0.75, 164*2*0.75,1,true,0.25);
						obj.visual.add(obj.main);
					}else{
						obj.visual.remove(obj.main);
						obj.main = new game.animatedImage(window.animations["mb"], 0, 0, 106*2*0.75, 164*2*0.75,1,true,0.25);	
						obj.visual.add(obj.main);
					}
				//	obj.visual.width = -1*obj.visual.width;
					
				}
			}
		);
		game.addType(
			"water",
			function(obj, packet) {
				obj.visual = new game.rectangle( 0, 0, packet.dim[0], packet.dim[1], "blue",0.5);
				background.add( obj.visual );
			},
			function() {},
			function( obj ) {
			}
		);
		//game.createSocket("wss://batland.herokuapp.com");
		//game.createSocket("wss://salmonz-redditbotyoutube.cs50.io");
		var timeSinceCull = 500;
		var hiddenScenes = new game.scene();
		function Cull(){
			if (timeSinceCull > 500) {
                for (var x = 0; x < Back.objects.length; x++) {
                    var object = Back.objects[x];
                    if (!isVisualClose(object)) {
                        Back.remove(object);
                        hiddenScenes.add(object);
                        x--;
                    }
                };
                for (var x = 0; x < Back.belowObjects.length; x++) {
                    var object = Back.belowObjects[x];
                    if (!isVisualClose(object)) {
                        Back.remove(object);
                        hiddenScenes.addBelow(object);
                        x--;
                    }
                };
                for (var x = 0; x < hiddenScenes.objects.length; x++) {
                    var object = hiddenScenes.objects[x];
                    if (isVisualClose(object)) {
                        hiddenScenes.remove(object);
                        Back.add(object);
                        x--;
                    }
                }
                for (var x = 0; x < hiddenScenes.belowObjects.length; x++) {
                    var object = hiddenScenes.belowObjects[x];
                    if (isVisualClose(object)) {
                        hiddenScenes.remove(object);
                        Back.addBelow(object);
                        x--;
                    }
                }
            timeSinceCull = 0;
			
			
        }
        timeSinceCull += game.clientDetails.dt * 16.67;
		}
		game.addPacketType( "chatMSG", function( packet ) {
        		chatdiv.innerHTML +='<div class = "namer">'+packet.name+': '+packet.obj+'</div>';
        		if(chatdiv.children.length>maxClen){
        			chatdiv.children[0].remove();
        		}
    	} );
		
		function main() {
			if(controls.enter&&controls.changed){
				if(document.activeElement != document.getElementById("chat-inputr")){
					document.getElementById("chat-inputr").focus()
				}else{
					sendchat();
				}
				controls.enter = false;
			}
			Cull();
			controls.changedKeys.forEach(function(key) {
				game.currentPackets.push({
					type: "updateControls",
					object: {
						key: key,
						state: controls[key]
					}
				});
			});
			controls.changedKeys = [];
			if( mouse.changed ) {
				game.currentPackets.push( { type: "mouse", clicking: mouse.clicking } );
				mouse.changed = false;
			}
			if(MSG){
				//console.log("FINAL SCORE: "+game.me.score);
				document.getElementById("MSG").style.display = "block";
				setTimeout(function(){document.getElementById("MSG").style.display = "none";},6000)
				MSG = false;
			}
			game.update();
			scene.camera.position = new game.Vector2( game.me.visual.position.x, game.me.visual.position.y );
			if( !game.me.inVehicle ){
				var staging = -Math.atan2( mouse.x, mouse.y );
				
				if(mouse.x>50){
					game.me.rotationd = Math.PI/2;
				}else if(mouse.x<-50){
					game.me.rotationd = -Math.PI/2;
				}else{
					game.me.rotationd = 0;
				}
				/*
				var sens = 0.25;
				if(staging>sens&&staging<Math.PI-sens){
					game.me.rotationd = -Math.PI/2;
				}else if(staging<-sens&&staging>-Math.PI+sens){
					game.me.rotationd = Math.PI/2;
				}else{
					game.me.rotationd = 0;
				}*/
				game.me.visual.rotation = -Math.PI/2;
				//game.me.visual.rotation = -Math.atan2( mouse.x, mouse.y ) + Math.PI / 2;
			}
			renderer.clear();
			renderer.render( Back );
			renderer.render( background );
			renderer.render( middle )
			renderer.render( scene );
			renderer.render( top );
			requestFrame( main );
		}
		main();
		setInterval( function() {
			if( !game.me.inVehicle && mouse.moved ) {
				//game.currentPackets.push( { type: "setRotation", object: { angle: game.me.visual.rotation } } );
				if(game.me.rotationd === Math.PI/2){
					game.currentPackets.push( { type: "setDir", object: { angle: 1 } } );
				}else if(game.me.rotationd === -Math.PI/2){
					//console.log("HI");
					game.currentPackets.push( { type: "setDir", object: { angle: -1 } } );
				}else{
					console.log("HI");
					game.currentPackets.push( { type: "setDir", object: { angle: 0 } } );
				}
				//mouse.moved = false;
				//im currently falling 
			}
		}, 100 );
		}
	}
