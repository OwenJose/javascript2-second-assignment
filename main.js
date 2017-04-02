// creating stuff and dispaying all the pokemons
(function(){


	for (let i = 1; i <= 151; i++) {
		$("#pokeList").append('<li><img id="'+ i + '" src="img/' + i + '.png"></li>');	
	}

})();

const PocketMonsters = (function() {

	let allPokemons = [];
	let counter = 1;
	$("#progressbar").progressbar().show();
	
	$(document).ready(function(){
		// function to get all the poke's
		const gettingAllFirstGenPoke = (i) => {
			// the get request happenig
			$.ajax({
				type: "GET",
				url: "http://pokeapi.co/api/v2/pokemon/?offset="+ i+ "0",
				success: function(pokemon){
					console.log("success");
					counter++;
					// the progressbar increase
					$("#progressbar").progressbar({
  						value: (counter/8)*100,
					});
					// adding pokemons to an array
					allPokemons.push(pokemon);
				},
				error: function(argument) {
					alert("No Worko");
				}
			});
		};
		// to do lots of getrequests and creating a listitems to add them to.
		for (let i = 0; i < 16; i += 2) {
			gettingAllFirstGenPoke(i);
		}
		$("#progressbar").progressbar().hide();
		console.log(allPokemons);
	});

	
	// const getPokeAlfabetisally = () => {
	// 	//maybe i should map() so that i get a new variable
	// 	allPokemons.sort(function(a, b) {
	//   		if (a.url < b.url) {
	//     		return -1;
	//   		}
	//   		else if (a.url > b.url) {
	//     		return 1;
	//   		}
	//   		else
	//   			return 0;
	// 		});
	// 	return allPokemons;
	// };

	// const getPokeByID = () => {
	// 	//maybe i should map() so that i get a new variable
	// 	allPokemons.sort(function(a, b) {
	//   		if (a.id < b.id) {
	//     		return -1;
	//   		}
	//   		else if (a.id > b.id) {
	//     		return 1;
	//   		}
	//   		else
	//   			return 0;
	// 		});
	// 	return allPokemons;
	// };

	return {
		// getPokeAlfabetisally: getPokeAlfabetisally,
		// getPokeByID: getPokeByID
		allPokemons: allPokemons
	};
})();


// my collection of clickables,- and a mouseleave functions.
(function() {

	let pocketMonsters = PocketMonsters.allPokemons;
	const colors = {
		bug: "#d1fcd7",
		dragon: "#96755a",
		electric: "#fff94c",
		fairy: "#ff87a9",
		poison: "#a5008f",
		fighting: "#fc0000",
		fire: "#ff6214",
		flying: "#f2d2ba",
		steel: "#9b9b9b",
		ghost: "#54194c",
		psychic: "#020051",
		rock: "lightgrey",
		ground: "#542c0b",
		ice: "#84fcff",
		water: "#0072ff",
		grass: "#0dc13a",
		dark: "#282828",
		normal: "#fffdf2"
	};

	// this is for the Autocomplete
	const gettingNames = () => {
		let names = [];
		for(let i = 0; i < pocketMonsters.length; i++) {
			for(let j = 0; j < pocketMonsters[i].results.length; j++) {
				names.push(pocketMonsters[i].results[j].name);
			}
		}
		return names;
	};
	// comparing input value to pokemon
	let comperingString = (value) => {
		for(let i = 0; i < pocketMonsters.length; i++) {
			for(let j = 0; j < pocketMonsters[i].results.length; j++) {
				if (value === pocketMonsters[i].results[j].name){
					return true;
				}
			}
		}
		return false;
	}
	// the info that i beeing displayed
	let addingInfo = (pokemon) => {
		$("#searchInput").slideUp();
		$("#pop-up").fadeIn();
		$("#pop-up").css({"display": "flex"});
		$("#info-box").append('<img src="img/' + pokemon.id + '.png">');
		$("#info-box").append('<h2> #' + pokemon.id + '</h2>');
		$("#info-box").append('<h3> Name: ' + pokemon.name + '</h2>');
		if (pokemon.types.length > 1){
			$("#info-box").append('<h3> Primery type: ' + pokemon.types[0].type.name + '</h2>');
			$("#info-box").append('<h3> Scondery type: ' + pokemon.types[1].type.name + '</h2>');
			// css background pokemons with 2 types $("img").css(background: linear-gradient(-45deg, red, yellow);)
		}
		else{
			$("#info-box").append('<h3> Primery type: ' + pokemon.types[0].type.name + '</h2>');
			// css background-color pokemons with only one type $("img").css(background-color: red;)
		}
	};
	// almost every click uses it
	let removePopUp = () => {
		$("#pop-up").fadeOut("fast");
		$("#info-box").empty();
	};

	$("#pop-up").on("click", function(){
		$("#pop-up").fadeOut("fast");
		$("#info-box").empty();
	});
	$("#hamburger").on("click", function(){
		removePopUp();
		$("#menu").slideToggle("slow");
	});
	$("#search").on("click", function(){
		removePopUp();
		$("#searchInput").slideToggle().focus().val("");
	});
	$("#pokeList img").on("click", function(){
		console.log(this.id);
		removePopUp();
		$.ajax({
			type: "GET",
			url: "http://pokeapi.co/api/v2/pokemon/" + this.id,
			success: function(pokemon){
				addingInfo(pokemon);
			},
			error: function(argument) {
				alert("No Worko");
			}
	  	});
	});	

	$("#menu").on("mouseleave", function(){
		$("#menu").slideUp("fast");
	});

	// no worko!!!
	$("#searchInput").autocomplete({
		source: gettingNames()
	});

	// $("ol li:nth-child(2)").on("click", function(){
	// 	let pocketMonsters = PocketMonsters.getPokeAlfabetisally();
	// 	// creat a function dont't repeat your self!
	// 	for (let i = 0; i < pocketMonsters.length; i++) {
	// 		$("#" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
	// 		console.log(pocketMonsters[i].name);
	// 	}
	// 	console.log(pocketMonsters);
	// });

	// $("ol li:nth-child(3)").on("click", function(){
	// 	let pocketMonsters = PocketMonsters.getPokeByID();
	// 	// creat a function dont't repeat your self!
	// 	for (let i = 0; i < pocketMonsters.length; i++) {
	// 		$("#" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
	// 		console.log(pocketMonsters[i].id);
	// 	}
	// });

	$("#searchInput").keydown(function(e){
		// when pressing enter on the keyboard
		if (e.keyCode == 13) {
			// compare the string input with the stored pokmon names an returns true
			if (comperingString($("#searchInput").val()) === true) {
  				$.ajax({
					type: "GET",
					url: "http://pokeapi.co/api/v2/pokemon/" + $("#searchInput").val() + "/",
					success: function(pokemon){
						addingInfo(pokemon);
					},
					error: function(argument) {
						alert("somthing went wrong!, let's try again");
						$("#searchInput").val("");
					}
	    		});
  				// console.log("YES!!");
  				// $("#info-box").append('<img src="img/' + parseInt($("#searchInput").val()) + '.png">');
  				// $("#pop-up").fadeIn();
  				// $("#searchInput").slideUp();
  			}
	 	
		 	else if (isNaN($("#searchInput").val()) === true) {
	    		$.ajax({
					type: "GET",
					url: "http://pokeapi.co/api/v2/type/" + $("#searchInput").val() + "/",
					success: function(type){
						console.log("YES!!" + "success");
						console.log(type);
						for (var i = 0; i < type.pokemon.length; i++) {
							console.log(type.pokemon[i].pokemon.name);
							$("#pop-up").fadeIn();
		    				$("#searchInput").slideUp();
						}
					},
					error: function(argument) {
						alert($("#searchInput").val() + " is not a pokemon, nor is it a pokemon type, not even an ID-number");
						$("#searchInput").val("");
					}
	    		});
	    		// $("#info-box").append('<img src="img/' + parseInt($("#searchInput").val()) + '.png">');
	    	}
		    else{
		    	if (parseInt($("#searchInput").val()) > 151){
		    		alert("Sorry only dealing first gen pokemon");
		    	}
			    	
		    	else{	
			    	$.ajax({
						type: "GET",
						url: "http://pokeapi.co/api/v2/pokemon/" + parseInt($("#searchInput").val()),
						success: function(pokemon){
							addingInfo(pokemon);
						},
						error: function(argument) {
							alert("No Worko");
						}
			    	});
			    }	
		    }
		}
	});
})();

// setting the background to match the pokemon type
// won't have the time to make this happen....
(function(){

	
	$("");

	
	
	
})();

// * need to get the progress bar to disapear when done!!
// * need to understand the 504 erro and automatically request it again.
// * want to create a popUp so we can read detailed info of the pokemon both when searched and klicked on.