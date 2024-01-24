// solve this problem let’s consider a subproblem and use the same approach to solve the above problem.

// Q. Given an array of non-negative integer arr1 and a number x.find the maximum XOR value of (arr[i]^x).

// Approach:

// Step-I: Insert all the elements of arr1 into TRIE.

// Step-II: Take x and find the maximum number from the arr1 where x^arr[i] is maximum.

// Insertion into TRIE:

// While inserting the number’s into the trie consider the binary format (Integer – 32bit) of the arr[i] and treat it as a string and insert the value.

// Let’s try to understand the insertion into trie by considering only 5bit’s but while coding we have to code it for 32bit.

// arr[]:[9, 8, 7, 5, 4]

// The binary format of the above array is as shown below.

//     9             8             7              5             4

// arr[ ]:[“01001”, “01000”, “00111”, “00101”, “00100”]

// Insertion of 9 – “ 01001 ”

// Inserting all the values of arr into the trie

// Step – II: Maximizing XOR

// Prerequisite: L5. Bit PreRequisites for TRIE Problems

// In order to have maximum value, we should have set bit’s from Left – Right.

// XOR Operation:

// XOR of Same bit’s – Zero(0)

// XOR of Different bit’s – One(1)

// For every ith bit find its opposite bit if not found then take that bit.

// Dry run:

// Consider the above Trie and x = 8.

// X = 8 [“01000”]

// Now using this concept let’s solve the actual problem.

// arr1: push all the elements into the trie.

// arr2: Treat every element of arr2 as x and find the MaxXOR and consider the maximum of all.

// Node Class: This class represents a node in a trie data structure. A trie is a tree-like data structure that is used for efficiently storing and searching for keys. In this case, the trie is used for bitwise operations.

// Constructor: Initializes a new node with an array of two links, initially set to null.
// containsKey(ind): Checks if the link at the specified index is not null.
// get(ind): Retrieves the link at the specified index.
// put(ind, node): Sets the link at the specified index to the given node.

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

function maxXor(n, m, arr1, arr2) {
  let tries = new Trie();

  for (let i = 0; i < n; i++) {
    tries.insert(arr1[i]);
  }

  let maxi = 0;
  for (let i = 0; i < m; i++) {
    maxi = Math.max(maxi, tries.findMax(arr2[i]));
  }

  return maxi;
}

function main() {
  const arr1 = [6, 8];
  const arr2 = [7, 8, 2];
  let n = arr1.length;
  let m = arr2.length;

  console.log(maxXor(n, m, arr1, arr2));
}

main();
