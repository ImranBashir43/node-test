// req {describe, expect, test} from '@jest/globals';
const {describe, expect, test} = require("@jest/globals");
const {calculateStock} = require("../src/bin/calculation");

// import {calculateStock} from "../src/bin/calculation"
// 
test('check calculateStock', () => {
  calculateStock("VYM838980/39/17").then(data => {
    expect(data).toStrictEqual({sku:"VYM838980/39/17",qty:4597});
  });
});
test('check invalid sku Error',()=>{
  calculateStock("1").catch(error => {
    expect(error).toBe("Transaction not found for required skus");
  });
})
test('refund transaction with no intial stock', () => {
  calculateStock("TVU730483/60/60").then(data => {
    expect(data).toStrictEqual({sku:"TVU730483/60/60",qty:1});
  });
});
test('order transaction with no intial stock', () => {
  calculateStock("TVU730483/60/60").catch(error => {
    expect(error).toBe("Insufficient stock to order");
  });
});