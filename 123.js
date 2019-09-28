window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowLeft":
      goPrev();
      break;
  case "ArrowRight":
      goNext();
      break;
  case "Enter":
      blinkAndTick();
      break;
  case "Space":
      blinkAndTick();
      break;
  case "b": //for "bigger"
      modifySize(1);
      break;
  case "s":
      modifySize(-1);
      break;
  default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);


function initSite(){
    // use this function for tasks to do on load (first configue the site and then make it visible)
    configureSite();
    document.body.style.display = "block"; //none;
}

function configureSite() {
    //configure according to stored values
    
    //read the scaling from local storage
    var s = localStorage.getItem("12oder3Scaling");
    //if there is configuration, read it and scale the site according to it
    if (s != null) {
	document.body.style.transform = "scale(" + s + ")"
    }
    // do the same for the time
    var s = localStorage.getItem("12oder3Time");
    //if there is configuration, read it and scale the site according to it
    if (s != null) {
	//we need to chech if there is a counter at all ...
	if (document.getElementById("counter") !== null){
	    document.getElementById("counter").innerHTML = s;
	}
    }
}


function modifySize(grow) {
    // change the scaling of the entire document
    //grow is a float or int indicating wether it grows or shrings (>0, <0)
    var s = localStorage.getItem("12oder3Scaling");
    if (s == null) {
	s="1.0";
    }
    s = parseFloat(s);
    if (grow > 0){
	s *= 1.05;
    } else {
	s *= 1/1.05;
    }
    localStorage.setItem("12oder3Scaling", String(s));
    configureSite();
}


function goPrev() { 
    var parts = window.location.pathname.split("/");
    var myname = parts[parts.length -1];
    if( myname == "start.html"){
	return;
    }
    else {	
	window.location.assign(document.getElementById("linkPrev").href)
    }linkNext
    
}

function goNext() {
    var parts = window.location.pathname.split("/");
    var myname = parts[parts.length -1];
    if(myname == "ende.html"){
	return;
    }
    else {	
	window.location.assign(document.getElementById("linkNext").href)
    }
}


async function blinkAndTick() {
    /* make the clock tick with speed a fraction of a second and count down seconds*/
    /* make the fields change their syle */
    /* when done, uncover result */
    var fraction = 5; // 20 is way too fast! 2 too slow. 5 seems good
    const columnNames = ["Red", "Green", "Blue"];
    var colors = new Array();
    var fields = new Array();
    var counter = document.getElementById('counter');
    var secondsTillEnd = parseInt(counter.innerHTML);

    fields[0] = document.getElementById(columnNames[0]);
    fields[1] = document.getElementById(columnNames[1]);
    fields[2] = document.getElementById(columnNames[2]);
    for(var i=0; i<3; i++){
	colors[i] = getComputedStyle(fields[i]).backgroundColor;
    }
    
    for(var i=0; i<fraction*secondsTillEnd;i++){
	fields[0].classList = "bottomColumn blinkingField " + "blink"+columnNames[i%3];
	fields[1].classList = "bottomColumn blinkingField " + "blink"+columnNames[(i+1)%3];
	fields[2].classList = "bottomColumn blinkingField " + "blink"+columnNames[(i+2)%3];
	if(i%fraction ==0){
	    counter.innerHTML= secondsTillEnd - i/fraction;
	}
	await Sleep(1000/fraction);
    }
    counter.innerHTML="0";
    uncoverResult();

} 

function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}


function uncoverResult(){
    // make the correct answer glow and the orthers grey
    const columnNames = ["Red", "Green", "Blue"];
    var solution =  document.getElementById('solution').innerHTML;
    var fields = new Array();
    
    fields[0] = document.getElementById(columnNames[0]);
    fields[1] = document.getElementById(columnNames[1]);
    fields[2] = document.getElementById(columnNames[2]);
 
    
    for(var i=0; i<3; i++){
	if(i==parseInt(solution)-1){
	    fields[i].classList =  "bottomColumn blinkingField "+"answer"+columnNames[i];
	} else {
	    fields[i].classList =  "bottomColumn blinkingField "+"greyedout";
	    fields[i].innerHTML = "";
	}
    }
}


function modifyTime(){
    var t = document.getElementById("timeInput").value;
    if (isNaN(parseInt(t)) || parseInt(t) < 0){
	return;
    } else {
	document.getElementById("counter").innerHTML = String(parseInt(t));
	localStorage.setItem("12oder3Time", String(parseInt(t)));
    }
}
