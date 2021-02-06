// import React, { useState, useEffect } from 'react';
// //import Web3 from "web3";
// import MyStringStore from "./../contracts/MyStringStore.json";
// import getWeb3 from "./../web3/getWeb3";
//
// function Product() {
//     const [appState, setAppState] = useState({
//         contractString: "",
//         web3: {},
//         accounts: {},
//         contract: {}
//     });
//
//     const [message, setMessage] = useState("");
//
//   // state = { storageValue: 0, web3: null, accounts: null, contract: null };
//     useEffect(() => {
//         initSetup();
//     }, []);
//
//
//     const initSetup = async () => {
//         try {
//           // Get network provider and web3 instance.
//           const web3 = await getWeb3();
//           // console.log("get web3: ", web3);
//
//           // Use web3 to get the user's accounts.
//           const accounts = await web3.eth.getAccounts();
//
//           // Get the contract instance.
//           const networkId = await web3.eth.net.getId();
//           const deployedNetwork = await MyStringStore.networks[networkId];
//
//           //load in the contract
//           const instance = await new web3.eth.Contract(
//             MyStringStore.abi,
//             deployedNetwork && deployedNetwork.address
//           );
//           setAppState(prevState => {
//               return { ...prevState, web3: web3 }
//           });
//           setAppState(prevState => {
//               return { ...prevState, accounts: accounts }
//           });
//           setAppState(prevState => {
//               return { ...prevState, contract: instance }
//           });
//         } catch (err) {
//             // Catch any errors for any of the above operations.
//             console.log("error man: ", err);
//         }
//     }
//
//
//     const insertString = async (e) => {
//         e.preventDefault();
//         console.log(`inserting the message '${message}' into contract`);
//         var res = await appState.contract.methods.set(message).send({from: appState.accounts[0]});
//         console.log("res: ", res);
//     }
//
//     const readString = async () => {
//         const response = await appState.contract.methods.myString().call();
//         setAppState(prevState => {
//             return { ...prevState, contractString: response }
//         });
//         alert(`Contract string is: ${response}`);
//     }
//
//
//     return(
//       <>
//       {!appState.web3 ? <div>Loading Web3, accounts, and contract...</div>
//         :
//         <div className="App">
//           <h3>Checking string</h3>
//           <input type="text" onChange={(e) => setMessage(e.target.value)}/>
//           <p>Current message to insert: {message}</p>
//           <button onClick={insertString}>Insert message</button>
//           <button onClick={readString}>Read messag</button>
//           <p>
//             Try changing the value stored on <strong>line 40</strong> of App.js.
//           </p>
//           <div>Contract string is: {appState.contractString}</div>
//         </div>
//         }
//       </>
//     )
// }
//
// export default Product;
