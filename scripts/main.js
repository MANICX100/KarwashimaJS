$('body').hide().fadeIn(2000); // fade in body after being hidden initially via JQuery API library
$(HighScoreInit); //load high score init function


function HighScoreInit() {
	console.log('This game was created by Daniel Kendall @ Nottingham Trent University as coursework for Web based programing module \u00a9 2013 All rights not reserved'); // print about me using unicode characters at console
	if (document.cookie != "") {
		document.getElementById("highscore").innerHTML = "Your current best (average) time per click:" + parseFloat(document.cookie).toFixed(2) + " seconds"; //output at highscore id to 2 decimal places
	}
}

function Random() {
	return (Math.round(Math.random()) - 0.5); //function to sort Arrays will give a value of 0.5 or -0.5
}
function main() {
	var Writing = ["Yellowy Green", "Blue", "Red"]; //Text Strings for main body of the game
	var ColorChoice = ["yellowgreen", "blue", "rgb(120,0,0)"]; //Color possibilities to affect CSS styles
	document.getElementById('Prestart').innerHTML = ""; //Remove earlier introductions, setting the game area
	var userName = prompt("What do you want me to call you throughout the game?", "Player One"); //Get player Name via Prompt
	document.getElementById('playername').innerHTML = "Current player name:  " + userName; //output name
	document.getElementById('getready').innerHTML = "I want you to click on ALL the text that spells..."; //Instructions
	
	var colorChoice = Math.floor(Math.random() * 3); //Random number from 0-2 this replaces earlier if/else statement
	var chosenText = Writing[colorChoice]; //Text the user must click on
	document.getElementById('theWord').style.color = ColorChoice[colorChoice]; //Actually setting CSS style color property
	var startTime;

	setTimeout(function () { //Print out the text the user must click on and initialise timer after a 3.5 second delay
		document.getElementById('theWord').innerHTML = chosenText;
		startTime = new Date();
	}, 3500);

	var contentbox = document.getElementById('contentbox'); // 'ContentBox' div as a variable quicker execution , concise typing later on

	var widthUpperBound = contentbox.clientWidth - 115; //Width of div less 115 px so fits snuggly within

	var generateElem = function (html) { //Generate elements with chosen attributes in memory

		var elem = document.createElement('p');
		elem.className = "text";
		elem.innerHTML = html;
		var brightness = 120; // Set upper limit of RGB intensity
		var colorRAND = 'rgb(' + [
				Math.floor(Math.random() * brightness),
				Math.floor(Math.random() * brightness), //Three random colors in Array
				Math.floor(Math.random() * brightness)
			].join(',') + ')'; //Add commas and single quotes to separate elements in Array
		elem.style.color = colorRAND;
		elem.style.top = Math.floor(Math.random() * 370) + 'px';
		elem.style.left = Math.floor(Math.random() * widthUpperBound) + 'px'; //Random position set within div
		return elem;
	};

	var textClick = function () {
		counter--;
		contentBox.removeChild(Element); //OnClick delete from DOM
	};

	var counter = 0;
	var otherCounter = 0; //counter initialisation
	var currentText; //additional variable declarations
	var Element;
	for (var i = 1; i <= 12; i++) {
		currentText = Writing[0];
		Element = generateElem(currentText);
		contentbox.appendChild(Element); //Loop to print and add to DOM (append) Elements links to GenerateElem function to create said elements
		if (currentText === chosenText) { //Check chosenText
			counter++;
			otherCounter++;
			Element.onclick = function () {
				counter--; //onClick events to only chosenText
				contentbox.removeChild(this);
				if (!counter) {
					stop() //Task completed
				}
			};
		}
		Writing.sort(Random); //Shuffle Array based on + or - 0.5
	}

	function timeTaken(responseTime, clickables) {
		var responseString = "";
		var avgTime = responseTime / clickables; //Average Time per click
		if (avgTime < 1) {
			responseString = "Your Average time between clicks was: " + avgTime.toFixed(2) + " seconds. That was Amazing, who are you Chuck Norris?";
		} else if (avgTime > 1 && avgTime < 2) {
			responseString = "Your Average time between clicks was: " + avgTime.toFixed(2) + " seconds. Awesome but get faster"; //Responses
		} else if (avgTime > 3 && avgTime < 5) {
			responseString = "Your Average time between clicks was: " + avgTime.toFixed(2) + " seconds. Could be better...";
		} else {
			responseString = "Your Average time between clicks was: " + avgTime.toFixed(2) + " seconds. Well that was terrible";
		}
		alert(responseString); //Responces displayed to user
		if (avgTime < document.cookie || document.cookie === "") {
			document.cookie = avgTime /*+ "; path=/; expires=-1"*/
		;
		} //Save Cookie to cache
		//console.log(avgTime + "; path=/; expires=-1");

	}

	function stop() {
		endTime = new Date();
		var responseTime = (endTime.getTime() - startTime.getTime()) / 1000;
		alert("The test took you " + responseTime.toFixed(2) + " seconds"); //Get total time pass to timeTaken function to get responseString
		timeTaken(responseTime, otherCounter);
	}
};