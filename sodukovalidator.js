//
// PROBLEM: Determine if a presented 2d array is a valid soduko solution.
//

// Helper function that validates a 1D array of 9 soduko elements
function validateSub(elements) {

	// Create hash map of elements seen so far
	var seenElements = new Map();
	var i;

	// Process all elements
	for (i=0; i<9; i++) {

		// If current element is between 1 and 9 and hasn't been seen yet, add it to the map of seen elements
		if ( (elements[i] >= 1) && (elements[i] <= 9) && (!seenElements.has(elements[i])) ) {
			seenElements.set(elements[i], elements[i]);
		}
		// Otherwise, return not valid (false)
		else {
			return false;
		}
	}

	// If all elements have been processed ok, return valid (true)
	return true;
}

// Helper function that returns a soduko row as a 1D array
function getRow(input, i) {
	return input[i];
}

// Helper function that returns a soduko column as a 1D array
function getColumn(input, j) {
	var column = [];
	var i;	
	for (i=0; i<9; i++) {
		column.push(input[i][j]);
	}
	return column;
}

// Helper function that returns a soduko sub panel as a 1D array
function getSubPanel(input, i, j) {
	var subPanel = [];
	var m,n;
	for (m=0; m<3; m++) {
		for (n=0; n<3; n++) {
			subPanel.push(input[3*i+m][3*j+n]);
		}
	}
	return subPanel;
}

// Main soduko validator function
function validateSoduko(input) {

	var i,j;

	// For each row index (i)
	for (i=0; i<9; i++) {

		// Validate row
		if ( !validateSub( getRow(input, i) ) ) {
			console.log("Row " + i + " not valid");
			return false;
		}
	}

	// For each column index (j)
	for (j=0; j<9; j++) {

		// Validate column
		if (!validateSub( getColumn(input, j) ) ) {
			console.log("Column " + j + " not valid");
			return false;
		}
	}

	// For each sub panel index (i,j)
	for (i=0; i<3; i++) {
		for (j=0; j<3; j++) {
			
			// Validate sub panel
			if (!validateSub( getSubPanel(input, i, j) ) ) {
				console.log("Sub panel " + i + "," + j + " not valid");
				return false;
			}
		}
	}

	// If rows, columns and sub panels have been processed ok, return valid (true)
	console.log("Soduko panel valid");
	return true;
}

// Run test case
var sodukoValid = [
	[ 1, 6, 9, 8, 7, 2, 4, 5, 3 ],
	[ 2, 7, 4, 3, 1, 5, 6, 8, 9 ],
	[ 3, 8, 5, 4, 6, 9, 1, 7, 2 ],
	[ 4, 1, 7, 9, 3, 8, 2, 6, 5 ],
	[ 8, 9, 6, 5, 2, 7, 3, 1, 4 ],
	[ 5, 3, 2, 1, 4, 6, 7, 9, 8 ],
	[ 9, 2, 1, 6, 8, 4, 5, 3, 7 ],
	[ 6, 4, 8, 7, 5, 3, 9, 2, 1 ],
	[ 7, 5, 3, 2, 9, 1, 8, 4, 6 ]
];

var sodukoNotValid = [
	[ 1, 6, 9, 8, 7, 2, 4, 5, 3 ],
	[ 2, 7, 4, 3, 1, 5, 6, 8, 9 ],
	[ 3, 8, 5, 4, 6, 9, 1, 7, 2 ],
	[ 4, 1, 7, 9, 3, 8, 2, 6, 5 ],
	[ 8, 9, 6, 5, 2, 7, 3, 1, 4 ],
	[ 5, 3, 2, 1, 4, 6, 7, 9, 8 ],
	[ 9, 2, 1, 6, 8, 4, 5, 3, 7 ],
	[ 6, 4, 8, 7, 5, 3, 9, 2, 1 ],
	[ 7, 5, 3, 2, 9, 1, 6, 4, 8 ]
];

console.log(validateSoduko(sodukoValid));
console.log(validateSoduko(sodukoNotValid));
