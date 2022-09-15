#!/usr/bin/env node

const {calculateStock} = require( "./calculation")
import { instance as main } from '../index';

async function run() {

  calculateStock("VYM838980/39/17").then((data)=>{console.log(data)}).catch((error)=>{
    console.log(error)
  })

  main.run();
}

run().catch((e) => {
  console.log('Error', e);
});
