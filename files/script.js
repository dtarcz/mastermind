// tableau de couleur
var tabColor = [
	"rgb(255, 0, 0)",
	"rgb(255, 255, 0)",
	"rgb(0, 128, 0)",
	"rgb(0, 0, 255)",
	"rgb(128, 0, 128)",
	"rgb(0, 0, 0)"
	];
// tableau de 6 couleur aleatoire basser sur tabColor
var randomColor = [
	tabColor[Math.floor(Math.random()*6)],
	tabColor[Math.floor(Math.random()*6)],
	tabColor[Math.floor(Math.random()*6)],
	tabColor[Math.floor(Math.random()*6)]
	];
// nombre de ligne (0-9)
var numLign = 9;
// active le drag des piond de couleur
$("#red, #yellow, #green, #blue, #purple, #black").draggable({revert:true});
// fonction qui stoque la couleur su piond choisi
var plateauColor;
$("#red, #yellow, #green, #blue, #purple, #black").hover(function(){
	plateauColor = $(this).css("background-color");
});
//fonction qui selectione tout une ligne pour la rendre drop
function ligne(idLign) {
	for (var i=0; i<randomColor.length; i++) {
		$("#p"+idLign+"_"+i+"").droppable({
			drop:function(){
				$(this).css("background-color", plateauColor);
			}
		});
	}
}

$("#submit").click(function(){
	for (var h=0; h<tabColor.length; h++){
		for (var i=0; i<randomColor.length; i++){
			if (randomColor.indexOf(tabColor[h], i) == i) {
				console.log(i);
				console.log(tabColor[h]);
				if ($("#p"+numLign+"_"+i+"").css("background-color") == tabColor[h]) {
					$("#a"+numLign+"_"+i+"").css("background-color", "rgb(255, 0, 0)");
				}
				else {
					if (randomColor.indexOf($("#p"+numLign+"_"+i+"").css("background-color")) != -1){
						$("#a"+numLign+"_"+i+"").css("background-color", "rgb(0,0,0)");
					}
					else {
						$("#a"+numLign+"_"+i+"").css("background-color", "rgb(211,211,211)");
					}
				}
			}
		}
	}
//	numLign--;	
});
ligne(numLign);