// ------------------------------------------
// Partie page d'acueille
//-------------------------------------------
if ($("#home")) {
	$("#buttonGame").click(function(){ // bouton commencer le jeu
		document.location.href="game.html" // redirection
	});
	$("#buttonHigh").click(function(){ // bouton high score
		document.location.href="high.html" // redirection
	});
}
// ------------------------------------------
// fin
//-------------------------------------------
// ------------------------------------------
// Partie page de jeu
//-------------------------------------------
if ($("#game")) {
	// tableau des 8 couleur
	var tabColor = [ 
		"rgb(255, 0, 0)", // rouge
		"rgb(255, 255, 0)", // jaune
		"rgb(0, 128, 0)", // verts
		"rgb(0, 0, 255)", // bleu
		"rgb(128, 0, 128)", // violet
		"rgb(0, 0, 0)", // noir
		"rgb(255, 165, 0)", // orange
		"rgb(0, 206, 209)" // turquoise
		];
	// tableau des 4 couleur random choisi dans tabColor
	var randomColor = [ 
		tabColor[Math.floor(Math.random()*8)],
		tabColor[Math.floor(Math.random()*8)],
		tabColor[Math.floor(Math.random()*8)],
		tabColor[Math.floor(Math.random()*8)]
		];
	var numLigne = 0; // variable qui donne la ligne actuel et le high score
	var plateauColor; // variable qui stocke la couleur du pion choisi  
	
	var boolCheck = [false,false,false,false,]; // tableau de boolean qui permet de ne pas repasser le pion dans le switch

	$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").draggable({revert:true});  // rend les pions draggable
	$("#red, #yellow, #green, #blue, #purple, #black, #orange, #darkturquoise").hover(function(){plateauColor = $(this).css("background-color");}); // place la couleur du pion dans la variable plateauColor
	
	// fonction qui permet de changer la ligne droppable et qui prend la couleur des pion
	function ligne(idLigne) {
		for (var i=0; i<randomColor.length; i++) {
			$("#p"+idLigne+"_"+i+"").droppable({ // rend la ligne droppable
				drop:function(){
					$(this).css("background-color", plateauColor); // rend les pion coloriable
				}
			});
			$("#p"+(idLigne-1)+"_"+i+"").droppable( "disable" ); // desactive le droppable de la ligne inférieur
		}
	}
	$("#submit").click(function(){ // bouton valider
		console.log(randomColor); // solution
		for (var i=0; i<randomColor.length; i++) {
			if ($("#p"+numLigne+"_"+i+"").css("background-color") == randomColor[i]) { // si le pion et de la bonne couleur et a la bosse place
				$("#a"+numLigne+"_"+i+"").css("background-color","rgb(0, 0, 0)"); // alors on colorie en noir le token aide
				boolCheck[i] = true; // et on passe le boolean en true qui signifi qu'il a etais verifier
			}
			else { // si le pion n'est pas de la bonne couleur et a la bonne place alors on vas verifier par le switch si la couleur existe pour placer les token gris
				switch ($("#p"+numLigne+"_"+i+"").css("background-color")) { // pion a verifier
					case randomColor[0]: // dans un case du tableau randomColor
						if (boolCheck[0]) { // on regarde le boolean si le pion a deja etais verifier true = deja passer
							break; // on sort du switch
						}
						$("#a"+numLigne+"_"+i+"").css("background-color", "rgb(126,126,126)"); // on passe le token en gris
						boolCheck[0] = true; // on passe a true
						break; // on sort du switch
					case randomColor[1]:
						if (boolCheck[1]) {
							break;
						}
						$("#a"+numLigne+"_"+i+"").css("background-color", "rgb(126,126,126)");
						boolCheck[1] = true;
						break;
					case randomColor[2]:
						if (boolCheck[2]) {
							break;
						}
						$("#a"+numLigne+"_"+i+"").css("background-color", "rgb(126,126,126)");
						boolCheck[2] = true;
						break;
					case randomColor[3]:
						if (boolCheck[3]) {
							break;
						}
						$("#a"+numLigne+"_"+i+"").css("background-color", "rgb(126,126,126)");
						boolCheck[3] = true;
						break;
					default:
						$("#a"+numLigne+"_"+i+"").css("background-color", "rgb(211, 211, 211)"); // si la couleur n'existe pas a passe le token en couleur par default
				}
			}
		}
		// si tout les token son noir
		if ($("#a"+numLigne+"_0").css("background-color") == "rgb(0, 0, 0)" && $("#a"+numLigne+"_1").css("background-color") == "rgb(0, 0, 0)" && $("#a"+numLigne+"_2").css("background-color") == "rgb(0, 0, 0)" && $("#a"+numLigne+"_3").css("background-color") == "rgb(0, 0, 0)") {
				alert('Vous avez gagné en '+(numLigne+1)+' coup !!'); // on lui dit qu'il a gagné avec son score
				if (localStorage.getItem((numLigne+1)) === null) { // si personne a fait ce score
					localStorage.setItem((numLigne+1),prompt('Entrez votre nom :', 'Défaut')); // on demande le nom et on stocke tout dans la storage
				}
				document.location.href="high.html" // et on redirige sur la page des high score
			}
			else {
				if (numLigne == 9){ // si le joueur et a la 10em ligne 
					alert('Gamme Over !!'); // on lui dit qu'il a perdut
					document.location.href="index.html" // on redirige sur la page de démarage
				}
				else { // sinon on continue
					numLigne++; // on incrmente le conteur de ligne
					ligne(numLigne); // et on lance la fonction que change de ligne
					boolCheck = [false,false,false,false,]; // on repasse tout les boolean a false
				}
			}
	});
	ligne(numLigne); // on rend la 1er ligne droppable au changement de la page
}
// ------------------------------------------
// fin
//-------------------------------------------
// ------------------------------------------
// Partie page high
//-------------------------------------------
if ($("#high")) {
	// ecrit tout les score dans la page high
	for (var i = 1; i<=10; i++){
		if (localStorage.getItem((i)) === null) { // si le storage n'existe pas 
			$("#nom"+i+"").html("Null") // alors on ecrit null
		}
		else {
			$("#nom"+i+"").html(localStorage.getItem(i)); // on ecrit les nom
		}
	}
	// reset les high score
	$("#reset").click(function(){
		localStorage.clear();
		document.location.href="high.html"
	});
	// retour a la page index
	$("#retour").click(function(){
		document.location.href="index.html"
	});
}