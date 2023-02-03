const Node = (data, left, right) => {
  if (data == undefined) {
    data = null;
  }
  if (left == undefined) {
    left = null;
  }
  if (right == undefined) {
    right = null;
  }

  return { data, left, right };
};

const Tree = (arr) => {

  const cleanArray = (arr) => {
    const noDupeArray = new Set(arr); // remove duplicates

    const toInteger = Array.from(noDupeArray).map((i) => // turn every element to integer, in order to sort the array properly later.
      parseInt(i, 10));

    const sortedArray = toInteger.sort((a, b) => a - b);

    return sortedArray; // this clean array gets into buildTree()
  };

  const buildTree = (arr, start, end) => {
    // starting values, if i set these values as default, the recursive function doesn't work because the end and start values are already stated.
    if (end == undefined) end = arr.length - 1;
    if (start == undefined) { start = 0; }

    if (start > end) return null; // base case, ends the function with "leaf nodes"

    const half = Math.ceil((start + end) / 2);

    const root = Node(arr[half]); // setting the current half value to root node (in a recursion stack, it would be a "sub-root" node).

    // in each recursion stack, we are dividing the size of the nodes to the half, depending on which direction of the current root node, we change start or end as half+1 or half-1, getting closer to the base case.
    root.left = buildTree(arr, start, half - 1);

    root.right = buildTree(arr, half + 1, end);

    return root;
  };

  let root = buildTree(cleanArray(arr));

  const insertNode = (value) => {
    const recursive = (value, obj) => {
    // base cases
      if (value == obj.data) { // in case the value already exists in the BST.
        return obj;
      }
      if (obj.left == null && value < obj.data) {
        obj.left = Node(value);
      } if (obj.right == null && value > obj.data) {
        obj.right = Node(value);
      } else {
        // recursive steps, which are being used to traverse the BST left and right side, depending if the value is greater or lesser than the root value.

        if (value < obj.data) {
          recursive(value, obj.left);
        } if (value > obj.data) {
          recursive(value, obj.right);
        }
      }
      return obj;
    };

    return root = recursive(value, root); // created a closure in order to push the original BST to the recursive function.
  };

  const deleteNode = (value) => {
    let savedNodes = [];
    let barelyBigger = [];
  
    const findBarelyBigger = (value, obj) => {
      //once there is no barely bigger value
      if (obj.left == null) {
        barelyBigger.push(obj); //push the barely bigger Node
        savedNodes = []; //restart savedNodes
      } else {
        if (value < obj.data) {
          findBarelyBigger(value, obj.left);
        }
      }
    };
  
    const recursive = (value, obj) => {
  
      if (obj.right != null && obj.left != null) { //conditionals to avoid null bugs.

      // first case, removing a leaf node.
      // i had to put these conditionals to make sure the node is indeed a leaf node.
        if (
          obj.left.data == value &&
          obj.left.left == null &&
          obj.left.right == null
        ) {
          return (obj.left = null);
        }
  
        if (
          obj.right.data == value &&
          obj.right.left == null &&
          obj.right.right == null
        ) {
          return (obj.right = null);
        }
  
        //third case, node has two childs.
  
        //we need to replace the node for the barely bigger number.
  
        if (
          obj.left.data == value &&
          obj.left.left != null &&
          obj.left.right != null
        ) {
          savedNodes.push(obj.left.right); //push every value bigger than Node.
          findBarelyBigger(obj.left.data, savedNodes[0]);
          deleteNode(barelyBigger[0].data); //remove the swapped number from its original position.
  
          //save childs.
          barelyBigger[0].left = obj.left.left;
          barelyBigger[0].right = obj.left.right;
  
          obj.left = barelyBigger[0];
  
          return (barelyBigger = []);
        }
  
        if (
          obj.right.data == value &&
          obj.right.left != null &&
          obj.right.right != null
        ) {
          savedNodes.push(obj.right.right); //push every value bigger than Node.
          findBarelyBigger(obj.right.data, savedNodes[0]);
          deleteNode(barelyBigger[0].data); //remove the swapped number from its original position.
  
          //save childs.
          barelyBigger[0].left = obj.right.left;
          barelyBigger[0].right = obj.right.right;
  
          obj.right = barelyBigger[0];
  
          return (barelyBigger = []);
        }
  
        //second case, node has one child.
  
        if (
          obj.left.data == value &&
          (obj.left.left != null || obj.left.right != null)
        ) {
          if (obj.left.left != null) {
            return (obj.left = obj.left.left); //replace the node with it'ts child.
          }
          if (obj.left.right != null) {
            return (obj.left = obj.left.right);
          }
        }
  
        if (
          obj.right.data == value &&
          (obj.right.left != null || obj.right.right != null)
        ) {
          if (obj.right.left != null) {
            return (obj.right = obj.right.left); //replace the node with it'ts child.
          }
          if (obj.right.right != null) {
            return (obj.right = obj.right.right);
          }
        }
      }
  
      // recursive steps to traverse the BST.
      if (value < obj.data) {
        recursive(value, obj.left);
      } else if (value > obj.data) {
        recursive(value, obj.right);
      }
  
      return obj;
    };
  
    return (root = recursive(value, root));
  };


  return { root, insertNode, deleteNode };
};




const example = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(example.root);



// external function to visualize the BST in the console. (not made by me.)
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.log(prettyPrint(example.root));
