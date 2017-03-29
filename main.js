

const Pocketmonsters = (function() {

	let list = [];
	let counter = 1;
	let pokeList = $("#pokeList");

	$(document).ready(function(){
		function gettingAllFirstGenPoke(i) {
			$.ajax({
				type: "GET",
				url: "https://pokeapi.co/api/v2/pokemon/" + i,
				success: function(pokemon){
					console.log("success");
					counter++;
					$("#progressbar").progressbar({
  						value: (counter/12)*100
					});
					list.push(pokemon);
				},
				error: function(argument) {
					alert(argument);
				}
			});
		}
		if (counter === 12){
			$("#progerssbar").hide();
		}
	});
})();


	for (var i = 1; i < 13; i++) {
		gettingAllFirstGenPoke(i);
		pokeList.append('<li><img id="poke'+ i +'"></li>');
	}

	$("#hamburger").on("click", function(){
		$("#menu").slideToggle("slow");
	});

	$("#search").on("click", function(){
		$("#searchInput").slideToggle().focus().val("");
	});

	$("#menu").on("mouseleave", function(){
		$("#menu").slideToggle();
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
		// creat a function dont't repeat your self!
		for (let i = 0; i < pocketMonsters.length; i++) {
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
		// creat a function dont't repeat your self!
		for (let i = 0; i < pocketMonsters.length; i++) {
			$("#poke" + (i+1)).attr("src", pocketMonsters[i].sprites.front_default);
			console.log(pocketMonsters[i].id);
		}
	});

	$("#searchInput").keydown(function(e){
    	if (e.keyCode == 13) {
    		for (let i = 0; i < pocketMonsters.length; i++) {
    			if ($("#searchInput").val().toLowerCase() === pocketMonsters[i].name){
    				console.log(pocketMonsters[i]);
    				break;
    			}

    		}
    		$("#searchInput").slideToggle();

   		}
	});
});