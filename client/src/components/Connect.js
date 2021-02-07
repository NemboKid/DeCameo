import React, { useState, useEffect } from 'react';
//import Web3 from "web3";
// import VideoContract from "./../contracts/VideoContract.json";
import getWeb3 from "./../web3/getWeb3";

let VideoContract;

const Connect = (props) => {
  // // state = { storageValue: 0, web3: null, accounts: null, contract: null };
    // useEffect(() => {
    //     initSetup();
    // }, []);


    const initSetup = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          // console.log("get web3: ", web3);

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = await VideoContract.networks[networkId];

          //load in the contract
          const instance = await new web3.eth.Contract(
            VideoContract.abi,
            deployedNetwork && deployedNetwork.address //only if deployedNetwork exists
          );
          props.setAppState(prevState => {
              return { ...prevState,
                web3: web3,
                accounts: accounts,
                contract: instance
              }
          });
        } catch (err) {
            // Catch any errors for any of the above operations.
            console.log("error man: ", err);
        }
    }

    return (
      <>
        <button className="new-btn order-profile-btn" onClick={() => initSetup()}>Request video</button>
      </>
    )
}

export default Connect;
