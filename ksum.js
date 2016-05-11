//
// PROBLEM: Given an array of integers, find k integers that sum to a given target value.
//

// Wrapper function that sorts the input array before applying recursive solution
function kSum(input, k, target) {
	
	// Sort the input - O(n*log(n))
	var sorted = input.sort(function(a,b){return a-b;});
	
	// Solve recursively - O(n^(k-1))
	return kSumRecursive(sorted, k, target);
}

// Recursive main logic
function kSumRecursive(arr, k, target) {

	var solutions = [];
	var i,j;
	var arrLen = arr.length;
	
	// Special case
	if ((k <= 0) || (k > arrLen)) {
		return solutions;
	}

	// Special case
	else if (k === 1) {
		for (i=0; i<arrLen; i++) {
			if (arr[i] === target) {
				solutions.push([arr[i]]);
			}
		}
		return  solutions;
	}

	// Base case for recursion
	else if (k === 2) {

		var left = 0;
		var right = arrLen - 1;
		var sum;

		while (left < right) {
			if (arr[left] === arr[left+1]) {
				left++;
				continue;
			}
			sum = arr[left] + arr[right];

			if (sum === target) {
				solutions.push([arr[left], arr[right]]);
				left++;
			}
			else if (sum > target) {
				right--;
			}
			else {
				left++;
			}
		}
		return solutions;
	}

	// Recursive case (k>2)
	else {

		for (i=0; i<arrLen; i++) {
			if (arr[i] === arr[i+1]) {
				continue;
			}
			var head = arr.slice(i, i+1);
			var tail = arr.slice(i+1);
			
			// Recursive call
			var subSolutions = kSumRecursive( tail, k-1, target-head );
			var subLen = subSolutions.length;

			for (j=0; j<subLen; j++) {
				solutions.push( head.concat(subSolutions[j]) );
			}
		}
		return solutions;
	}
}

// Run test case
var k = 3;
var target = 0;
var input = [ 1, 4, 8, 2, 3, 5, -2, -1, 7, -7, -6, -8, -9, 9 ];
var output = kSum(input, k, target);

console.log('k: ', k);
console.log('target: ', target);
console.log('input: ', input);
console.log('output: ', output);
