// Problem Statement:

// You are given an array/list ‘ARR’ consisting of ‘N’ non-negative integers. You are also given a list ‘QUERIES’ consisting of ‘M’ queries, where the ‘i-th’ query is a list/array of two non-negative integers ‘Xi’, ‘Ai’, i.e ‘QUERIES[i]’ = [‘Xi’, ‘Ai’].

// The answer to the ith query, i.e ‘QUERIES[i]’ is the maximum bitwise xor value of ‘Xi’ with any integer less than or equal to ‘Ai’ in ‘ARR’.

// You should return an array/list consisting of ‘N’ integers where the ‘i-th’ integer is the answer of ‘QUERIES[i]’.

// Examples:

// Example 1:
// Input:

// 2
// 5 2
// 0 1 2 3 4
// 1 3
// 5 6
// 1 1
// 1
// 1 0

// Output:
// 3 7
// -1

// Explanation:
// In the first test case, the answer of query [1, 3] is 3 because 1^2 = 3 and 2 <= 3,  and the answer of query [5, 6] is 7 because  5 ^ 2 = 7 and 2 <= 6.

// In the second test case, no element is less than or equal to 0 in the given array ‘ARR’.

// Example 2:
// Input:
// 2
// 6 3
// 6 6 3 5 2 4
// 6 3
// 8 1
// 12 4
// 5 2
// 0 0 0 0 0
// 1 0
// 1 1

// Output:
// 5 -1 15
// 1 1

// This problem is an extension of the previous problem.In order to understand this problem you should have done the previous problem which is Maximum XOR of Two Numbers in an Array.
// 2. We know how to get maxXor value for an element x and array/list (arr). Now, Unlike the previous problem the array/list (arr) should contain only the elements which are less than or equal to ai.

// 3. Firstly, sort the array/list(arr), and for each query create a trie and push all the elements which are less than or equal to ai, and calculate getMax.

// Do we really need to create a new trie for every query ??

// No, since we are only working on a single array/list. Let’s try a different way to solve this.

// Let’s solve it by using the offlineQueries.

// OfflineQueries:

// Create a vector/ArrayList of type (int,pair<int,int>).//(ai,{xi,i})
// Suppose the given array/list[] = {1,2,3,4,5}
// Queries as given below:

// offlineQueries vector/list would look like as below

// Sort the offlineQueries based on the ai value, After sorting the offlineQueries would be as follows

// Keep a ptr = 0 pointing to the start of the array/list.
// Now insert all the elements which are less than or equal to ai.
// If we are inserting an element then move the ptr by 1.
// Finally, Calculate getMax(xi) and store the calculated value in it’s queryIdx.

class Node {
  constructor() {
    this.links = [null, null];
  }

  containsKey(index) {
    return this.links[index] !== null;
  }

  get(index) {
    return this.links[index];
  }

  put(index, node) {
    this.links[index] = node;
  }
}

//  Trie Class: This class represents a trie data structure specifically designed for the XOR operation.

// Constructor: Initializes a new trie with a root node.
// insert(num): Inserts a number into the trie by traversing bits from the most significant bit (MSB) to the least significant bit (LSB) and creating nodes as needed.
// findMax(num): Finds the maximum XOR value by traversing bits of a given number and selecting the opposite bit if available in the trie. The result is updated using bitwise OR.

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(num) {
    let node = this.root;
    for (let i = 31; i >= 0; i--) {
      //If (num >> i) is 2 (binary: 10), then (num >> i) & 1 is 0 (binary: 0).
      //Putting it all together, const bit = (num >> i) & 1; is extracting the bit at position i in the binary representation of num.
      //The result is either 0 or 1, representing the value of that bit  . // set the bit to 1 0r 0
      const bit = (num >> i) & 1;

      if (!node.containsKey(bit)) {
        node.put(bit, new Node());
      }
      node = node.get(bit);
    }
  }

  findMax(num) {
    let node = this.root;
    let maxNum = 0;

    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;

      if (node.containsKey(1 - bit)) {
        maxNum = maxNum | (1 << i);
        node = node.get(1 - bit);
      } else {
        node = node.get(bit);
      }
    }

    return maxNum;
  }
}

function maxXorQueries(arr, queries) {
  const ans = new Array(queries.length).fill(0);
  const offlineQueries = [];

  arr.sort((a, b) => a - b);
  let index = 0;

  for (let query of queries) {
    offlineQueries.push([query[0], query[1], index++]);
  }
  //Sort the offline queries based on ai
  offlineQueries.sort((a, b) => a[1] - b[1]);
  console.log(offlineQueries);

  // Now, we have to loop through the offline queries

  let i = 0;
  let n = arr.length;
  let trie = new Trie();

  for (let query of offlineQueries) {
    while (i < n && arr[i] <= query[1]) {
      trie.insert(arr[i]);
      i++; // to go the next index of the array
    }
    if (i !== 0) {
      ans[query[2]] = trie.findMax(query[0]);
    } else {
      ans[query[2]] = -1;
    }
  }

  return ans;
}

function main() {
  // Example usage:
  const arr = [3, 10, 5, 25, 2, 8];
  const queries = [
    [3, 7],
    [17, 8],
    [7, 14],
  ];

  const result = maxXorQueries(arr, queries);
  console.log(result);
}

main();


// Time Complexity:O(M) + O(MlogM) + O(M*32 + N*32)

// Space Complexity:O(32*N)

// Reason: O(M) for creating a Vector/ArrayList of OfflineQueries, 
// O(MlogM) for sorting the offlineQueries,O(M*32 + N*32) 
// for inserting the elements into a trie and calculating the maxXor value.
// //32 since we are storing the integer in 32 bit format.
