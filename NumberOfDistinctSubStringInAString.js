// // Example 1:
// // Input:
// //  S1= “ababa”
// // Output: Total number of distinct substrings : 10
// // Explanation: All the substrings of the string are a, ab, aba, abab, ababa, b, ba, bab, baba, a, ab, aba, b, ba, a. Many of the substrings are duplicated. The distinct substrings are a, ab, aba, abab, ababa, b, ba, bab, baba. Total Count of the distinct substrings is 9 + 1(for empty string) = 10.

// // Example 2:
// // Input:
// //  S1= “ccfdf”

// // Output: Total number of distinct substrings : 14
// // Explanation:
// // All the substrings of the string are c, cc, ccf, ccfd, ccfdf, c, cf, cfd, cfdf, f, fd, fdf, d, df, f. Many of the substrings are duplicated. The distinct substrings are c, cc, ccf, ccfd, ccfdf, cf, cfd, cfdf, f, fd, fdf, d, df. Total Count of the distinct substrings is 13 + 1(for empty string) = 14.

// Intuition:

// The basic intuition is to generate all the substrings and store them in the trie along with its creation. If a substring already exists in the trie then we can ignore, else we can make an entry and increase the count. Let’s see a detailed explanation.

// Approach:

// A typical node in a TRIE data structure looks like this:

// The 1st step is to create the trie structure and it generally consists of an array of nodes. Since we are going to have only alphabetic characters in the string, the maximum size of the array will be 26. We can also extend to accommodate upper case letters, if we want.
// Then, we are going to generate all substrings of the given string. It can be done by 2 nested loops. For each iteration, the outer loop fixes the starting point and the inner loop traverses the substring from the starting point to the end of the string.
// For each character encountered in the traversal of the inner loop, we are checking whether that particular node in the trie already contains the character or not.
// If it has, it means that the currently generated substring is a duplicate one. And we can just go to the next iteration to check the next character. But if the current character is not in the current node, then it means that the current substring generated is a brand new one.

// And we are creating a new node for the latest character. Since it is a new substring, we are increasing the total count.
// Since, the problem also demands to include empty string, we can just add 1(for empty string) to the total counts we got earlier..

function DistinctSubStringBruteForceApproach(s1) {
  let set = new Set();

  for (let i = 0; i < s1.length; i++) {
    let string = "";
    for (let j = i; j < s1.length; j++) {
      string = string + s1[j];

      set.add(string);
    }
  }

  //console.log(set.size());
  return set.size;
}
function mainBrute() {
  let s1 = "abab";

  let result = DistinctSubStringBruteForceApproach(s1);
  console.log(result);
}

mainBrute();

// The time complexity of the code above is
//O(n2 logm) where m is the number of element in the set
// And Space complexity is O(N3)

class Node {
  constructor() {
    this.links = new Array(26).fill(null);
  }

  containsKey(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] !== null;
  }

  put(ch, node) {
    this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] = node;
  }

  get(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)];
  }
}

function countDistinctSubstrings(string) {
  let root = new Node();
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    let node = root;
    for (let j = i; j < string.length; j++) {
      if (!node.containsKey(string[j])) {
        node.put(string[j], new Node());
        count++;
      }
      node = node.get(string[j]);
    }
  }

  return count + 1; /// Adding  + 1 because we were told to include the empty string as well
}

function main() {
  let s1 = "ababa";
  console.log(
    "Total number of distinct substrings: " + countDistinctSubstrings(s1)
  );

  let s2 = "ccfdf";
  console.log(
    "Total number of distinct substrings: " + countDistinctSubstrings(s2)
  );
}

main();

// Time Complexity: O(n2), because we have to go through the entire string for all possible different starting points in order to generate all the substrings.

// Space Complexity: O(n2), because in the worst case, all the substrings can be distinct and there will be a node for every substring.
// Number of substrings of a string of length n is (n * (n + 1) / 2).
// Hence in the worst case, space complexity will be O(n2).
