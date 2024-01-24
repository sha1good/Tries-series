// // Implement Trie – 1
// // Problem Statement: Implementing insertion, search, and startWith operations in a trie or prefix-tree.

// // Implementation:

// // Type 1: To insert a string “word” in Trie.

// // Type 2: To check if the string “word” is present in Trie or not.

// // Type 3: To check if there is any string in the Trie that starts with the given prefix string “word”.

// // Example:
// // Input: type = {1, 1, 2, 3, 2};
// // value = {"hello", "help", "help", "hel", "hel"};
// // Output:
// // true
// // true
// // false
// // Explanation:
// // Trie object initialized
// // “hello” inserted in the trie.
// // “help” insertedin the trie
// // “help” searched in the trie //returns true
// // Checked if any previously inserted word has the prefix “hel” //return true
// // “hel” searches in the trie //returns true

// Approach: Trie struct has 2 variables Node *links[26] (for storing characters); assuming all words have lowercase letters and a bool flag. The flag is always false except when the word ends.

// Insert: The last reference trie’s flag has to be to true since the word is completed. The diagram shows the insertion of the word “apple”.

// The basic idea of insertion is that if the reference trie does not exist create a new trie and if it does simply traverse to it.

// Search: Search if the word is present in the trie or not,

// Start from the root and traverse through the word. while traversing through the word check if the reference trie for that character exists or not. If it exists move to the reference trie, else return false. Once the word is traversed character by character return the flag at that particular trie.

// startsWith: Check if the word inserted previously has the prefix “prefix” or not.

// It is similar to a search operation. Start from the root of the trie and traverse through the “prefix”.If the reference trie for a character is not present return false else transverse to the reference trie.Once the “prefix’ is traversed completely character by character return true.

class Node {
  constructor() {
    this.links = new Array(26).fill(null);
    this.flags = false;
  }

  //checks if the reference trie is present or not
  containsKey(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] !== null;
  }

  //creating reference trie
  put(ch, node) {
    this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] = node;
  }

  //to get the next node for traversal
  get(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)];
  }

  //setting flag to true at the end of the word when we have fully inserted the word
  setIsEnd() {
    this.flags = true;
  }

  //checking if the word is completed or not
  isEnd() {
    return this.flags;
  }
}

class Trie {
  constructor() {
    //creating new obejct
    this.root = new Node();
  }

  insert(word) {
    //initializing dummy node pointing to root initially
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.containsKey(word[i])) {
        node.put(word[i], new Node());
      }
      //moves to reference trie
      node = node.get(word[i]);
    }
    node.setIsEnd();
  }

  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.containsKey(word[i])) {
        return false;
      }
      node = node.get(word[i]);
    }
    return node.isEnd();
  }

  startWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!node.containsKey(prefix[i])) {
        return false;
      }
      node = node.get(prefix[i]);
    }
    return true;
  }
}

function main() {
  let n = 5;
  let type = [1, 1, 2, 3, 2];
  let value = ["hello", "help", "help", "hel", "hel"];
  let trie = new Trie();
  for (let i = 0; i < n; i++) {
    if (type[i] === 1) {
      trie.insert(value[i]);
    } else if (type[i] === 2) {
      console.log(trie.search(value[i]) ? "true" : "false");
    } else {
      console.log(trie.startWith(value[i]) ? "true" : "false");
    }
  }
}

main();
