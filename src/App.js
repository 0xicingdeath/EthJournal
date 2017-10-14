import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import {ZeroEx} from '0x.js';
import * as Web3 from 'web3'; 
import * as BigNumber from 'bignumber.js'; 

class App extends Component {
  async componentDidMount () { 

            const provider = new Web3.providers.HttpProvider('http://localhost:8545'); 

            const zeroEx = new ZeroEx (provider); 

            //Number of decimals to use (for ETH and ZRX)
            const DECIMALS = 18;

            // Addresses
            const NULL_ADDRESS = ZeroEx.NULL_ADDRESS;                        
            const WETH_ADDRESS = await zeroEx.etherToken.getContractAddressAsync();  
            const ZRX_ADDRESS  = await zeroEx.exchange.getZRXTokenAddressAsync();      
            const EXCHANGE_ADDRESS = await zeroEx.exchange.getContractAddressAsync(); 
            const accounts =  await zeroEx.getAvailableAddressesAsync();
            console.log(accounts); 

            const[makerAddress, takerAddress] = accounts; 

            // Unlimited allowances to 0x contract for maker and taker
            const txHashAllowMaker = await zeroEx.token.setUnlimitedProxyAllowanceAsync(ZRX_ADDRESS,  makerAddress); 
            await zeroEx.awaitTransactionMinedAsync(txHashAllowMaker)
            console.log(txHashAllowMaker);

            const txHashAllowTaker = await zeroEx.token.setUnlimitedProxyAllowanceAsync(WETH_ADDRESS, takerAddress);
            await zeroEx.awaitTransactionMinedAsync(txHashAllowTaker)
            console.log(txHashAllowTaker);

            const ethToConvert = ZeroEx.toBaseUnitAmount(new BigNumber(1), DECIMALS); // Number of ETH to convert to WETH

            const txHashWETH = await zeroEx.etherToken.depositAsync(ethToConvert, takerAddress);
            await zeroEx.awaitTransactionMinedAsync(txHashWETH) 

            // Generate order
            const order = { 
                maker: makerAddress, 
                taker: NULL_ADDRESS,
                feeRecipient: NULL_ADDRESS,
                makerTokenAddress: ZRX_ADDRESS,
                takerTokenAddress: WETH_ADDRESS,
                exchangeContractAddress: EXCHANGE_ADDRESS,
                salt: ZeroEx.generatePseudoRandomSalt(),
                makerFee: new BigNumber(0),
                takerFee: new BigNumber(0),
                makerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(0.2), DECIMALS); 
                takerTokenAmount: ZeroEx.toBaseUnitAmount(new BigNumber(0.3), DECIMALS); 
                expirationUnixTimestampSec: new BigNumber(Date.now() + 3600000),          
              };            
              console.log(order); 

              const orderHash = ZeroEx.getOrderHashHex(order);

              console.log(orderHash);


  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
