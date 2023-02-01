
const Node = (data,left,right) => {

    if (data == undefined){
        data = null
       }
       if (left == undefined){
        left = null
       }
       if (right == undefined){
        right = null
       }

    return {data,left,right}

}

const Tree = (arr) => {

   const cleanArray = (arr) => {

    const noDupeArray = new Set(arr) //remove duplicates

    const toInteger = Array.from(noDupeArray).map((i) => { //turn every element to integer, in order to sort the array properly later.
           return parseInt(i,10)
    })

    const sortedArray =  toInteger.sort((a,b)=> { return a - b})  //sort array

    return sortedArray //this clean array gets into buildTree()

   }

   
   const buildTree = (arr,start,end) => {

     //starting values, if i set these values as default, the recursive function doesn't work because the end and start values are already stated.
    if(end == undefined){end = arr.length-1}  
    if (start == undefined){start = 0}
    
    if(start > end) return null  //base case, ends the function with "leaf nodes"

    let half = Math.ceil((start+end)/2)

    let root = Node(arr[half]) //setting the current half value to root node (in a recursion stack, it would be a "sub-root" node).

    //in each recursion stack, we are dividing the size of the nodes to the half, depending on which direction of the current root node, we change start or end as half+1 or half-1, getting closer to the base case.
    root.left = buildTree(arr,start,half-1)   

    root.right = buildTree(arr,half+1,end)

    return root
    
   }

  let root = buildTree(cleanArray(arr))


  const insertNode = (value) =>{

    const recursive = (value,obj) => {

    //base cases
    if(value == obj.data){  //in case the value already exists in the BST.
      return obj
    }
    else if (obj.left == null && value < obj.data){       
      obj.left = Node(value)
    }
    else if (obj.right == null && value > obj.data){       
      obj.right = Node(value)
    }

   else {
    //recursive steps, which are being used to traverse the BST left and right side, depending if the value is greater or lesser than the root value.
    
    if (value < root.data) {      
      recursive(value,obj.left)
    }
    else if(value > obj.data) {
      recursive(value,obj.right)
    }

   }
   return obj
  }
  
  return root = recursive(value,root) // created a closure in order to push the original BST to the recursive function.

  }

  const deleteNode = () => {


  }





   return {root,insertNode,deleteNode}

}


let example = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

console.log(example.root)
example.insertNode(2)
console.log(example.root)



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


console.log(prettyPrint(example.root))















