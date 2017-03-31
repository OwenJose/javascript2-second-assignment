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

	const gettingNames = () => {
		let names = [];
		for(let i = 0; i < pocketMonsters.length; i++) {
			for(let j = 0; j < pocketMonsters[i].results.length; j++) {
				names.push(pocketMonsters[i].results[j].name);
			}
		}
		return names;
	};
	function comperingString(value) {
		for(let i = 0; i < pocketMonsters.length; i++) {
			for(let j = 0; j < pocketMonsters[i].results.length; j++) {
				if (value === pocketMonsters[i].results[j].name){
					return true;
				}
				else {
					return false;
				}
			}
		}
	}

	$("#hamburger").on("click", function(){
		$("#menu").slideToggle("slow");
		console.log(gettingNames());
		console.log();
	});

	$("#search").on("click", function(){
		$("#searchInput").slideToggle().focus().val("");
	});

	$("#menu").on("mouseleave", function(){
		$("#menu").slideUp("fast");
	});	
	$("#searchInput").autocomplete({
		source: gettingNames()
	});

	$("#pop-up").on("click", function(){
		$("#pop-up").fadeOut("fast");
		$("#info-box img").remove();
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
   	// trying to compare the input string some how
   	// a ain't getting any closer.
     	let typeList;

		if (e.keyCode == 13) {
			console.log($("#searchInput").val());
			if (comperingString($("#searchInput").val()) === true) {
  				console.log("YES!!");
  				$("#pop-up").fadeIn();
  			}
	 		
	 		else if (isNaN($("#searchInput").val()) === true) {
	    		$.ajax({
					type: "GET",
					url: "http://pokeapi.co/api/v2/type/" + $("#searchInput").val() + "/",
					success: function(type){
						console.log("YES!!" + "success");
						console.log(type);
						for (var i = 0; i < type.pokemon.length; i++) {
							if (type.pokemon[i].pokemon.url > "http://pokeapi.co/api/v2/pokemon/151");{
								console.log(type.pokemon[i].pokemon.name);
							}
						}
					},
					error: function(argument) {
						alert("No Worko");
					}
	    		});
	    	}
	    else {
	    	$.ajax({
				type: "GET",
				url: "http://pokeapi.co/api/v2/pokemon/" + parseInt($("#searchInput").val()),
				success: function(pokemon){
					console.log("success");
					console.log(pokemon);
				},
				error: function(argument) {
					alert("No Worko");
				}
	    	});
	    	$("#info-box").append('<img src="img/' + parseInt($("#searchInput").val()) + '.png">');
	    	$("#pop-up").fadeIn();
	    }	
	 	$("#searchInput").slideUp();
	}
				
	// 			// my or operator didn't work wihtout the nested if statement
	// 			// goes in here if the pokemon has more the 1 type, wich for now is usually 2
	// 			if (pocketMonsters[i].types.length > 1) {
	//     			// here is were we find the pokemon by name
	//     			if ($("#searchInput").val().toLowerCase() === pocketMonsters[i].name) {
	//     				console.log(pocketMonsters[i]);
	//     				break;
	//     			}
	//     			// is were we find the pukemon by id
	//     			else if ($("#searchInput").val() == pocketMonsters[i].id) {
	// 					console.log(pocketMonsters[i]);
	//     				break;
	// 				}
	// 				// here i were we find the type of pokemons.
	// 				else if ($("#searchInput").val() === pocketMonsters[i].types[0].type.name || $("#searchInput").val() === pocketMonsters[i].types[1].type.name) {
	// 					typeList.push(pocketMonsters[i]);
	// 					console.log(typeList);
	// 				}
	// 			}
	// 			// in here pokemon only har 1 type.
	// 			else{
	// 				if ($("#searchInput").val().toLowerCase() === pocketMonsters[i].name) {
	//     				console.log(pocketMonsters[i]);
	//     				break;
	//     			}
	//     			// is were we find the pukemon by id
	//     			else if ($("#searchInput").val() == pocketMonsters[i].id) {
	// 					console.log(pocketMonsters[i]);
	//     				break;
	// 				}
	// 				// here i were we find the type of pokemons.
	// 				else if ($("#searchInput").val() === pocketMonsters[i].types[0].type.name) {
	// 					typeList.push(pocketMonsters[i]);
	// 					console.log(typeList);
	// 				}
	// 			}

	// 		}
			// Hidding the search field 
			// $("#searchInput").slideUp();
			// emptying the array
			typeList = [];
	   	// }
	   	
	});
})();

// setting the background to match the pokemon type
// won't have the time to make this happen....
(function(){

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
	$("");

	// css background pokemons with 2 types $("img").css(background: linear-gradient(-45deg, red, yellow);)

	// css background-color pokemons with only one type $("img").css(background-color: red;)
	
	
})();

// * need to get the progress bar to disapear when done!!
// * need to understand the 504 erro and automatically request it again.
// * want to create a popUp so we can read detailed info of the pokemon both when searched and klicked on.