
const Node = (data,leftc,rightc) => {

    if (data == undefined){
        data = null
       }
       if (leftc == undefined){
        leftc = null
       }
       if (rightc == undefined){
        rightc = null
       }

    return {data,leftc,rightc}

}

const Tree = (arr) => {

   const cleanArray = (arr) => {

    const sortedArray =  arr.sort()  //sort array
    
    const finalArray = new Set(sortedArray) //remove duplicates

    return finalArray //this clean array gets into buildTree()

   }

   const buildTree = (arr) => {

    return arr

   }


   let root = buildTree(cleanArray(arr)) 

   return {root}

}


let example = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

console.log(example)
