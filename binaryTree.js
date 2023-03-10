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
    parseFloat(i, 10));

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
  
       
      // first case, removing a leaf node.
      // i had to put these conditionals to make sure the node is indeed a leaf node.
    
      if(obj.left != null){
        if (
          obj.left.data == value &&
          obj.left.left == null &&
          obj.left.right == null
        ) {
          return (obj.left = null);
        }
      }

        if(obj.right != null){
        if (
          obj.right.data == value &&
          obj.right.left == null &&
          obj.right.right == null
        ) {
          return (obj.right = null);
        }
      }
  
        //third case, node has two childs.
  
        //we need to replace the node for the barely bigger number.

        if (obj.right != null && obj.left != null) { //conditionals to avoid null bugs.


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

  const find = (value) => {

    let result;
  
    const recursive = (value, obj) => {
      if (obj.data == value) {
        result = obj;
      }
  
      // recursive steps to traverse the BST.
      if (value < obj.data) {
        recursive(value, obj.left);
      } else if (value > obj.data) {
        recursive(value, obj.right);
      }
  
      return result;
    };
    return recursive(value, root);
  };

  const levelOrder = () => {

    let queue = [root]
    let finalArray = []

    while (queue[0] != null) {

      //push the root node data into the levelOrder array.
      finalArray.push(queue[0].data);
    
      //then we push the left and right child nodes of the current root.
      if (queue[0].left != null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right != null) {
        queue.push(queue[0].right);
      }
    
      //finally, remove the first node so the child nodes occupy the "[0]" index and the loop repeats.
      queue.shift(); 
    }

 return finalArray
}

const preorder = () => {
  let finalArray = [];

  const recursive = (obj) => {
    if (obj == null) return;

    finalArray.push(obj.data); //visit/push root
    recursive(obj.left);//visit left sub-tree
    recursive(obj.right);//visit right sub-tree

  };

  recursive(root);
  return finalArray;
};


const inorder = () => {
  let finalArray = [];

  const recursive = (obj) => {
    if (obj == null) return;

    recursive(obj.left);//visit left sub-tree
    finalArray.push(obj.data); //visit/push root
    recursive(obj.right);//visit right sub-tree

    
  };

  recursive(root);
  return finalArray


}

const postorder = () => {
  let finalArray = [];

  const recursive = (obj) => {
    if (obj == null) return;

    recursive(obj.left);//visit left sub-tree
    recursive(obj.right);//visit right sub-tree
    finalArray.push(obj.data); //visit/push root

    
  };

  recursive(root);
  return finalArray

}

const height = (value) => {

  const currentNode = find(value);

  let Nodes = [];

  const recursive = (obj) => {
    if (obj == null) return;

    //we push the leaf nodes to compare their paths later.
    if (obj.left == null && obj.right == null) Nodes.push(obj.data);

    recursive(obj.left);
    recursive(obj.right);
  };

  recursive(currentNode);

  //customized "find" method

  const findPath = (value) => {

    let count = 0;

    const recursive = (value, obj) => {

  
      
      if (obj.data == value) return count;

      // recursive steps to traverse the BST.
      if (value < obj.data) {
        recursive(value, obj.left);
        count++;
      } else if (value > obj.data) {
        recursive(value, obj.right);
        count++;
      }
      
      return count;
      
    };
    return recursive(value, currentNode);
  };

  //apply findPath to each leaf node.
  Nodes.forEach(function (node, index) {
    Nodes[index] = findPath(node);
  });

  //return the longest path
  return Math.max(...Nodes);
};

const depth = (value) => {

   //customized "find" method

   const findPath = (value) => {

    let count = 0;

    const recursive = (value, obj) => {
      
      if (obj.data == value) return count;

      // recursive steps to traverse the BST.
      if (value < obj.data) {
        recursive(value, obj.left);
        count++;
      } else if (value > obj.data) {
        recursive(value, obj.right);
        count++;
      }
      
      return count;
      
    };
    return recursive(value, root); //compared to height, we just compare the traversal of a value from the root node.
  };

 return findPath(value)

}

const isBalanced = () => {

  const leftCount = height(root.left.data);

  const rightCount = height(root.right.data);

  if (leftCount - rightCount >= 2) {
    return false;
  } else return true;
};

const rebalance = () => {

  const balancedBST = buildTree(cleanArray(preorder())) 

  return Object.assign(root,balancedBST)

}


  return { root, insertNode, deleteNode, find, levelOrder, preorder, inorder, postorder, height, depth, isBalanced, rebalance };
};


const randomArray = () => {

  let arrayLength = (Math.random() * (30 - 10 + 1)) + 10 

  let finalArray = []

  for (let i = 0; i < arrayLength; i++) {
    
    finalArray.push(parseInt(Math.random() * 100))
    
  }

  return finalArray
}


const example = Tree(randomArray())
console.log(example.preorder())
console.log(example.postorder())
console.log(example.inorder())

example.insertNode(2)
example.insertNode(3)
example.insertNode(4)

console.log(example.isBalanced())

example.rebalance()

console.log(example.isBalanced())

console.log(example.preorder())
console.log(example.postorder())
console.log(example.inorder())





// external function to visualize the BST in the console. (not made by me.)
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
  }
};

console.log(prettyPrint(example.root))
