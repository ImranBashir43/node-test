// console.log('Path of file in parent dir:', require('path').resolve(__dirname, 'stock.json'));
// const path =
const fs = require('fs');

 const calculateStock =(sku)=>{
     let error = ""
const rawStocks = fs.readFileSync('./src/static/stock.json');
const  stockArr = JSON.parse(rawStocks)
const rawTransactions = fs.readFileSync('./src/static/transactions.json');
const transactionArr =  JSON.parse(rawTransactions)
const targetStock = stockArr.find(element => 
    
     element.sku ===sku

);
// if(!targetStock){
//     throw new Error("Stock not found for required sku");
    
// }

let remainingStocks  =  targetStock?targetStock.stock:0
const targetTransactions = transactionArr.filter((element)=>element.sku===sku)
if(targetTransactions.length==0 && !targetStock){
    error = "Transaction not found for required skus"
    
}
targetTransactions.forEach(element => {
    if(element.type ==="refund"){
        remainingStocks = remainingStocks + element.qty
    }else{
        if(remainingStocks==0){
            error = "Insufficient stock to order"
        }
        remainingStocks = remainingStocks - element.qty
    }
});
console.log(targetTransactions,"targetTransactions")
return new Promise((resolve,reject)=>{
    if(error===""){
        resolve({sku,qty:remainingStocks})
    }else{
        reject(error)
    }
})
}
// console.log(calculateStock("VYM838980/39/17"),"function check")
module.exports = {calculateStock}
