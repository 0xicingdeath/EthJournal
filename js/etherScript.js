const Web3 = require('web3'); 
const ZeroEx = require('0x.js').ZeroEx; 
const BigNumber = require ('bignumber.js'); 

const provider = new web3.providers.HttpProvider('http://localhost:8545'); 

const zeroEx = new ZeroEx (provider); 

//const accounts =  await zeroEx.getAvailableAddressesAsync();
//console.log(accounts)
