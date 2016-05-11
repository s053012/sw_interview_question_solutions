//
// PROBLEM: Write a function to return all subsets from an input array of length k
//

// Function that returns an array of subsets from arr of length k
function kSubsets(arr, k) {
	
	var subsets = [];
	var i,j;
	var arrLen = arr.length;
	
	// Special case
	if ((k <= 0) || (k > arrLen)) {

		// Return empty set
		return subsets;
	}

	// Base case for recursion
	else if (k === 1) {

		// Return set containing each element from input array
		for (i=0; i<arrLen; i++) {
			subsets.push([arr[i]]);
		}

		return subsets;
	}

	// Recursive case (k>1)
	else {

		for (i=0; i<(arrLen-k+1); i++) {

			// Keep the first element from input array
			var head = arr.slice(i, i+1);
			var tail = arr.slice(i+1);

			// Recursively generate all possible endings to attach to head
			var subSolutions = kSubsets(tail, k-1);
			var subLen = subSolutions.length;

			// Concatenate head with all tails
			for (j=0; j<subLen; j++) {
				subsets.push( head.concat(subSolutions[j]) );
			}
		}
		
		return subsets;
	}
}

// Run test cases
var input1 = [ 1, 2, 3, 4 ];
console.log( "Input1: ", input1 );
console.log( "Output1: ", kSubsets( input1, 3 ) );

var input2 = [ 1, 2, 3, 4, 5, 6 ];
console.log( "Input2: ", input2 );
console.log( "Output2: ", kSubsets( input2, 4 ) );

var input3 = [ 1, 2, 3, 4, 5, 6 ];
console.log( "Input3: ", input3 );
console.log( "Output3: ", kSubsets( input3, 6 ) );

var input4 = [ 1, 2, 3 ];
console.log( "Input4: ", input4 );
console.log( "Output4: ", kSubsets( input4, 4 ) );
