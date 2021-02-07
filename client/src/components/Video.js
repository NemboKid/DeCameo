import React, { useState, useEffect } from 'react';
//import Web3 from "web3";
// import VideoContract from "./../contracts/VideoContract.json";

import getWeb3 from "./../web3/getWeb3";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

let VideoContract;

const Video = () => {
    const [appState, setAppState] = useState({
        contractString: "",
        web3: {},
        accounts: {},
        contract: {},
    });

    const [videoState, setVideoState] = useState({
        buffer: null,
        size: null,
    });

  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
    useEffect(() => {
        initSetup();
    }, []);


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
          setAppState(prevState => {
              return { ...prevState, web3: web3 }
          });
          setAppState(prevState => {
              return { ...prevState, accounts: accounts }
          });
          setAppState(prevState => {
              return { ...prevState, contract: instance }
          });
        } catch (err) {
            // Catch any errors for any of the above operations.
            console.log("error man: ", err);
        }
    }


    const setFile = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();
        await reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            setVideoState(prevState => {
                return { ...prevState,
                    buffer: Buffer(reader.result) ,
                    size: file.size
                }
            });
        };
    }


    const uploadVideo = async (e) => {
        e.preventDefault();

        //30 MB limit
        //NOTE: An 18 MB video took me about 30 seconds to upload.
        if (videoState.size > 31457280) {
            window.alert(`Video size limit is 30 MB, while your file is ${videoState.size / 1000000} MB. Try to make the file smaller.`);
            return;
        } else {
            ipfs.add(appState.buffer)
            .then(res => {
                console.log("ipfs RES: ", res);
            });
        }

        //NOTE: progress
        // const added = await ipfsC.add(file, {
        //     progress: (prog) => console.log(`received: ${prog}`),
        // });

    }


    return(
      <>
      {!appState.web3 ? <div>Loading Web3, accounts, and contract...</div>
        :
        <div className="App">
          <h3>Upload video!</h3>
          <input type="file" accept=".mp4, .mov, .ogg, .wmv" onChange={setFile} />
          <button onClick={uploadVideo}>Upload</button>
          <button onClick={() => window.alert(videoState.size)}>Show size</button>
          {/* <button onClick={readString}>Read message</button> */}
          <div className="video-cont">
            <video playsInline disablePictureInPicture autoload="true" controls>
              <source src="https://ipfs.infura.io/ipfs/QmNh4HXE5sPA1s9pGEnAkmBG4H4bdUbBwxhStnEA2AWswG" type="video/mp4" />
            </video>
          </div>
        </div>
        }
      </>
    )
}

export default Video;
