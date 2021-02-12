import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import MuiAlert from '@material-ui/lab/Alert';

let VideoContract;

const Video = (props) => {
    const location = useLocation();
    const [orderData, setOrderData] = useState();
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState("");
    const [videoPlay, setVideoPlay] = useState(false);
    const [videoEl, setVideoEl] = useState("");
    const [open, setOpen] = useState(false);

  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
    useEffect(() => {
        try {
            props.location.state.order && setOrderData(props.location.state.order)
        } catch (err) {
            console.log(err);
        } finally {
            getVideo();
        }
    }, []);

    const getVideo = async () => {
        let id = await location.pathname.split("/").pop();
        //let count = await props.appState.contract.methods.videoCount().call();
        try {
            const order = await props.appState.contract.methods.orders(id).call();
            setOrderData(order);
            setLoading(false);
        } catch (err) {
            window.alert("Order doesn't exist yet, check again later");
            console.log(err);
        }
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    // const initSetup = async () => {
    //     try {
    //       // Get network provider and web3 instance.
    //       const web3 = await getWeb3();
    //       // console.log("get web3: ", web3);
    //
    //       // Use web3 to get the user's accounts.
    //       const accounts = await web3.eth.getAccounts();
    //
    //       // Get the contract instance.
    //       const networkId = await web3.eth.net.getId();
    //       const deployedNetwork = await VideoContract.networks[networkId];
    //
    //       //load in the contract
    //       const instance = await new web3.eth.Contract(
    //         VideoContract.abi,
    //         deployedNetwork && deployedNetwork.address //only if deployedNetwork exists
    //       );
    //       setAppState(prevState => {
    //           return { ...prevState, web3: web3 }
    //       });
    //       setAppState(prevState => {
    //           return { ...prevState, accounts: accounts }
    //       });
    //       setAppState(prevState => {
    //           return { ...prevState, contract: instance }
    //       });
    //     } catch (err) {
    //         // Catch any errors for any of the above operations.
    //         console.log("error man: ", err);
    //     }
    // }


    // const setFile = async (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    //     const reader = new window.FileReader();
    //     await reader.readAsArrayBuffer(file);
    //
    //     reader.onloadend = () => {
    //         setVideoState(prevState => {
    //             return { ...prevState,
    //                 buffer: Buffer(reader.result) ,
    //                 size: file.size
    //             }
    //         });
    //     };
    // }


    // const uploadVideo = async (e) => {
    //     e.preventDefault();
    //
    //     //30 MB limit
    //     //NOTE: An 18 MB video took me about 30 seconds to upload.
    //     if (videoState.size > 31457280) {
    //         window.alert(`Video size limit is 30 MB, while your file is ${videoState.size / 1000000} MB. Try to make the file smaller.`);
    //         return;
    //     } else {
    //         ipfs.add(appState.buffer)
    //         .then(res => {
    //             console.log("ipfs RES: ", res);
    //         });
    //     }
    //
    //     //NOTE: progress
    //     // const added = await ipfsC.add(file, {
    //     //     progress: (prog) => console.log(`received: ${prog}`),
    //     // });
    //
    // }
    function restartVideo() {
        setVideoPlay(false);
    }

    const handleVideo = () => {
        setVideoEl(document.getElementById("video-presentation"));
        if (document.getElementById("video-presentation").paused) {
            setVideoPlay(true);
            document.getElementById("video-presentation").play();
        } else {
            setVideoPlay(false);
            document.getElementById("video-presentation").pause();
        }
        document.getElementById("video-presentation").addEventListener("ended", restartVideo, false);
    }

    const renderVideoElement = (vid) => {
        return (
          <>
            <video id="video-presentation" className="video-styling public-video-order" playsInline disablePictureInPicture autoload="true">
              <source src={vid ? `https://ipfs.infura.io/ipfs/${vid}` : "https://ipfs.infura.io/ipfs/QmNh4HXE5sPA1s9pGEnAkmBG4H4bdUbBwxhStnEA2AWswG"} type="video/mp4" />
            </video>
          </>
        )
    }

    const copyLink = (e) => {
        navigator.clipboard.writeText(window.location.href);
        setOpen(true);
        setTimeout(() => setOpen(false), 7000);
        e.preventDefault();
    }


    return(
      <>
      {/* {!appState.web3 ? <div>Loading Web3, accounts, and contract...</div>
        :
        <div className="App">
          <h3>Upload video!</h3>
          <input type="file" accept=".mp4, .mov, .ogg, .wmv" onChange={setFile} />
          <button onClick={uploadVideo}>Upload</button>
          <button onClick={() => window.alert(videoState.size)}>Show size</button>
          {/* <button onClick={readString}>Read message</button>
          <div className="video-cont">
            <video playsInline disablePictureInPicture autoload="true" controls>
              <source src="https://ipfs.infura.io/ipfs/QmNh4HXE5sPA1s9pGEnAkmBG4H4bdUbBwxhStnEA2AWswG" type="video/mp4" />
            </video>
          </div>
        </div>
         */}
        <article className="public-order-article">
          {!orderData ? <p>...loading</p>
            :
            <>
            <h1 style={{textAlign: "center", fontSize: "2rem", margin: "1em auto"}}>Your Video is Here!</h1>
            <div className="video-box-container public-container public-order-container">
              <div className="left">
                <div className="left-header">
                  <span className="header-item">
                    <small>To</small>
                    <p>{orderData.name_to}</p>
                  </span>
                  <span className={`header-item ${orderData.name_from === "default" ? "hidden" : ""}`}>
                    <small>From</small>
                    <p>{orderData.name_from}</p>
                  </span>
                </div>
                <div className="right-body">
                  <div className="button-wrapper">
                    <a href={orderData.public_video_url} className="button-standard download-btn">
                      <GetAppIcon />
                      Download
                    </a>
                    <span>
                      <button onClick={copyLink} className="new-btn share-btn">
                        <ShareIcon />
                        Share
                      </button>
                      <p>{copySuccess}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="video-public-column-right">
                <div className="column-right-top">
                  <div className="right-inner">
                    { orderData.video !== "0" ? renderVideoElement(orderData.video) : renderVideoElement() }
                    <div className={!videoPlay ? "video-pause-filter" : ""} />
                    <div className="play-wrapper">
                        <button className={`video-btn ${videoPlay ? "pause-btn" : "play-btn"}`} onClick={handleVideo}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000}>
              <Alert severity="info">
                Copied link
              </Alert>
            </Snackbar>
            </>
          }
        </article>
      </>
    )
}

export default Video;
