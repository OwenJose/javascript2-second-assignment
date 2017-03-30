

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
				url: "https://pokeapi.co/api/v2/pokemon/" + i,
				success: function(pokemon){
					console.log("success");
					counter++;
					// the progressbar increase
					$("#progressbar").progressbar({
  						value: (counter/12)*100
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
		for (let i = 1; i < 13; i++) {
			gettingAllFirstGenPoke(i);
			$("#pokeList").append('<li><img id="poke'+ i +'"></li>');
		}
	});

	// 
	const getPokeAlfabetisally = () => {
		//maybe i should map() so that i get a new variable
		allPokemons.sort(function(a, b) {
	  		if (a.name < b.name) {
	    		return -1;
	  		}
	  		else if (a.name > b.name) {
	    		return 1;
	  		}
	  		else
	  			return 0;
			});
		return allPokemons;
	};

	const getPokeByID = () => {
		//maybe i should map() so that i get a new variable
		allPokemons.sort(function(a, b) {
	  		if (a.id < b.id) {
	    		return -1;
	  		}
	  		else if (a.id > b.id) {
	    		return 1;
	  		}
	  		else
	  			return 0;
			});
		return allPokemons;
	};

	return {
		getPokeAlfabetisally: getPokeAlfabetisally,
		getPokeByID: getPokeByID
	};
})();


// my collection of clickables,- and a mouseleave functions.
(function() {
	
	$("#hamburger").on("click", function(){
		$("#menu").slideToggle("slow");
	});

	$("#search").on("click", function(){
		$("#searchInput").slideToggle().focus().val("");
	});

	$("#menu").on("mouseleave", function(){
		$("#menu").slideUp("fast");
	});	

	$("ol li:nth-child(2)").on("click", function(){
		let pocketMonsters = PocketMonsters.getPokeAlfabetisally();
		// creat a function dont't repeat your self!
		for (let i = 0; i < pocketMonsters.length; i++) {
			$("#poke" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
			console.log(pocketMonsters[i].name);
		}
	});

	$("ol li:nth-child(3)").on("click", function(){
		let pocketMonsters = PocketMonsters.getPokeByID();
		// creat a function dont't repeat your self!
		for (let i = 0; i < pocketMonsters.length; i++) {
			$("#poke" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
			console.log(pocketMonsters[i].id);
		}
	});

	$("#searchInput").keydown(function(e){
		let pocketMonsters = PocketMonsters.getPokeAlfabetisally();
    	// when searchig for a sertain type of pokemon, since it's usally more than one we need an array...
    	// or maybe we should just display them directly.
    	let typeList = [];

		if (e.keyCode == 13) {
			for (let i = 0; i < pocketMonsters.length; i++) {
				
				// my or operator didn't work wihtout the nested if statement
				// goes in here if the pokemon has more the 1 type, wich for now is usually 2
				if (pocketMonsters[i].types.length > 1) {
	    			// here is were we find the pokemon by name
	    			if ($("#searchInput").val().toLowerCase() === pocketMonsters[i].name) {
	    				console.log(pocketMonsters[i]);
	    				break;
	    			}
	    			// is were we find the pukemon by id
	    			else if ($("#searchInput").val() == pocketMonsters[i].id) {
						console.log(pocketMonsters[i]);
	    				break;
					}
					// here i were we find the type of pokemons.
					else if ($("#searchInput").val() === pocketMonsters[i].types[0].type.name || $("#searchInput").val() === pocketMonsters[i].types[1].type.name) {
						typeList.push(pocketMonsters[i]);
						console.log(typeList);
					}
				}
				// in here pokemon only har 1 type.
				else{
					if ($("#searchInput").val().toLowerCase() === pocketMonsters[i].name) {
	    				console.log(pocketMonsters[i]);
	    				break;
	    			}
	    			// is were we find the pukemon by id
	    			else if ($("#searchInput").val() == pocketMonsters[i].id) {
						console.log(pocketMonsters[i]);
	    				break;
					}
					// here i were we find the type of pokemons.
					else if ($("#searchInput").val() === pocketMonsters[i].types[0].type.name) {
						typeList.push(pocketMonsters[i]);
						console.log(typeList);
					}
				}

			}
			// Hidding the search field 
			$("#searchInput").slideUp();
			// emptying the array
			typeList = [];
	   	}
	   	
	});
})();

// setting the background to match the pokemon type
(function(){

	let bug = "#d1fcd7";
	let dragon = "#96755a";
	let electric = "#fff94c";
	let fairy = "#ff87a9";
	let poison = "#a5008f";
	let fighting = "#fc0000";
	let fire = "#ff6214";
	let	flying = "#f2d2ba";
	let steel = "#9b9b9b";
	let ghost = "#54194c";
	let psychic = "#020051";
	let rock = "lightgrey";
	let ground = "#542c0b";
	let ice = "#84fcff";
	let water = "#0072ff";
	let grass = "#0dc13a";
	let dark = "#282828";
	let normal = "#fffdf2";
	
	$("");

	// css background pokemons with 2 types $("img").css(background: linear-gradient(-45deg, red, yellow);)

	// css background-color pokemons with only one type $("img").css(background-color: red;)
	
	
})();

// * need to get the progress bar to disapear when done!!
// * need to understand the 504 erro and automatically request it again.
// * want to create a popUp so we can read detailed info of the pokemon both when searched and klicked on.