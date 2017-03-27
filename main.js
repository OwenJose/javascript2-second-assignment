var pokeList = $("#pokeList");
var counter = 0;
var pocketMonsters = [];

$(document).ready(function(){

	
	function gettingAllFirstGenPoke(i) {
		$.ajax({
			type: "GET",
			url: "https://pokeapi.co/api/v2/pokemon/" + i,
			success: function(pokemon){
				console.log("success");
				counter++;
				$( "#progressbar" ).progressbar({
  					value: (counter/48)*100
				});
				pocketMonsters.push(pokemon);
			},
			error: function(argument) {
				alert(argument);
			}
		});
	}
 
	


	for (var i = 1; i < 49; i++) {
		gettingAllFirstGenPoke(i);
		pokeList.append('<li><img id="poke'+ i +'"></li>');
	}

	$("#hamburger").on("click", function(){
		$("#menu").slideToggle("slow");
	});

	$("#search").on("click", function(){
		$("#searchInput").toggle();
	});

	$("ol li:nth-child(2)").on("click", function(){
		
		pocketMonsters.sort(function(a, b) {
	  	if (a.name < b.name) {
	    	return -1;
	  	}
	  	else if (a.id > b.id) {
	    	return 1;
	  	}
	  	else
	  		return 0;
		});
		for (var i = 0; i < pocketMonsters.length; i++) {
			$("#poke" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
			console.log(pocketMonsters[i].name);
		}
	});

	$("ol li:nth-child(3)").on("click", function(){
		
		pocketMonsters.sort(function(a, b) {
	  	if (a.id < b.id) {
	    	return -1;
	  	}
	  	else if (a.id > b.id) {
	    	return 1;
	  	}
	  	else
	  		return 0;
		});
		for (var i = 0; i < pocketMonsters.length; i++) {
			$("#poke" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
			console.log(pocketMonsters[i].id);
		}
	});
});