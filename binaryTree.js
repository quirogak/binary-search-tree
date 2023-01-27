
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

    const noDupeArray = new Set(arr) //remove duplicates

    const toInteger = Array.from(noDupeArray).map((i) => { //turn every element to integer, in order to sort the array properly later.
           return parseInt(i,10)
    })

    const sortedArray =  toInteger.sort((a,b)=> { return a - b})  //sort array

    return sortedArray //this clean array gets into buildTree()

   }

   const buildTree = (arr,start,end) => {

    return arr

   }


   let root = buildTree(cleanArray(arr)) 

   return {root}

}


let example = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

console.log(example)
