import React, { useState } from "react";
import {ethers} from 'ethers';

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangeHandler(result[0]);
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangeHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    window.ethereum.on('accountsChanged', accountChangeHandler);

    return (
        <div>
            <h4 style={{color: 'white'}}> {"Connection to MetaMask using window.ethereum methods"} </h4>
                <button style={{width: 200, height: 40, backgroundColor: 'lightblue', borderRadius: 10}} 
                onClick={connectWalletHandler}>Connect Wallet</button>
                <div className="accountDisplay">
                    <h3 style={{color: 'white'}}>Address: {defaultAccount}</h3>
                </div>
                <div className="balanceDisplay">
                    <h3 style={{color: 'white'}}>Balance: {userBalance}</h3>
                </div>
                {errorMessage}
        </div>
    )
}

export default WalletCard;