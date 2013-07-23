var gWidth = 6;
var gHeight = 4;
gGrid = [];

for (var row = 0; row < gHeight; row++) {
	gGrid[row] = new Array(6);
}

gGrid[3][0] = "robbin";
gGrid[0][5] = "skeleton";
gGrid[0][3] = "tressure";

// Math.round

for (var row = 0; row < gHeight; row++) {
	var rowT = "";
	for (var col = 0; col < gWidth; col++) {
		if(gGrid[row][col] === undefined) {
			rowT += "|\t#\t\t";
		} else { 
			rowT += "|\t" + gGrid[row][col] + "\t"; 
		}
		//display grid
	}
	console.log(rowT, "\n");
}


Template.grid.events({
	'click .make-grid': function() {

	}
});