//
// PROBLEM: Given an array of integers, find k integers that sum to a given target value.
//

// Wrapper function that sorts the input array before applying recursive algorithm
function kSum(arr, k, target) {
	
	// Sort the input array - O(n*log(n))
	var sortedArr = arr.sort(function(a,b){return a-b;});
	
	// Solve recursively - O(n^(k-1))
	return kSumRecursive(sortedArr, k, target);
}

// Recursive main algorithm (requires that the input array is sorted)
function kSumRecursive(sortedArr, k, target) {

	var solutions = [];
	var i,j;
	var arrLen = sortedArr.length;
	
	// Special case
	if ((k <= 0) || (k > arrLen)) {
		return solutions;
	}

	// Special case
	else if (k === 1) {
		for (i=0; i<arrLen; i++) {
			if (arr[i] === target) {
				solutions.push([sortedArr[i]]);
			}
		}
		return  solutions;
	}

	// Base case for recursion, solve k-sum problem for k = 2
	else if (k === 2) {

		var left = 0;
		var right = arrLen - 1;
		var sum;

		// Move inwards from left and right indexes of sorted array
		while (left < right) {

			// Handle duplicate values in array
			if (sortedArr[left] === sortedArr[left+1]) {
				left++;
				continue;
			}
			if (sortedArr[right-1] === sortedArr[right]) {
				right--;
				continue;
			}
			
			// Calculate sum
			sum = sortedArr[left] + sortedArr[right];

			// If the sum is identical to target, we have found a solution
			if (sum === target) {
				solutions.push([sortedArr[left], sortedArr[right]]);
				left++;
			}
			// If the sum is greater than the target, we try to reduce sum by moving the right index one position to the left
			else if (sum > target) {
				right--;
			}
			// If the sum is smaller than the target, we try to increase sum by moving the left index one position to the right
			else {
				left++;
			}
		}
		return solutions;
	}

	// Recursive case (k>2), reduce the general k-sum problem to a set of 2-sum problems which can be solved in the base case
	else {

		// For each element in the input array
		for (i=0; i<arrLen; i++) {
			
			// Handle duplicate values in array
			if (sortedArr[i] === sortedArr[i+1]) {
				left++;
				continue;
			}
			
			// Set current array element as front element for solution
			var head = sortedArr.slice(i, i+1);
			
			// Select remaining elements from array
			var tail = sortedArr.slice(i+1);
			
			// Recursive call to solve reduced (k-1) problem
			var subSolutions = kSumRecursive( tail, k-1, target-head );
			var subLen = subSolutions.length;

			// Combine selected first element with all posible solutions returned by recursive call
			for (j=0; j<subLen; j++) {
				solutions.push( head.concat(subSolutions[j]) );
			}
		}
		return solutions;
	}
}

// Run test case
var k = 3;
var target = 2;
var input = [ 1, 4, 8, 2, 3, 5, -2, -1, 7, -7, -6, -8, -9, 9 ];
var output = kSum(input, k, target);

console.log('k: ', k);
console.log('target: ', target);
console.log('input: ', input);
console.log('output: ', output);
