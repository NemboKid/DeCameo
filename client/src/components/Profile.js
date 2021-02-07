import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import getWeb3 from "./../web3/getWeb3";
import Connect from "./Connect";
import VideoContract from "./../contracts/VideoContract.json";


const Profile = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState('');
    const [loadSkeleton, setLoadSkeleton] = useState(false);
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [appState, setAppState] = useState({
        contractString: "",
        web3: {},
        accounts: {},
        contract: {},
    });

    useEffect(() => {
        const {profile} = props.location.state;
        setProfile(profile);
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
              return { ...prevState,
                web3: web3,
                accounts: accounts,
                contract: instance
              }
          });
          console.log("finished web3");
        } catch (err) {
            // Catch any errors for any of the above operations.
            console.log("error man: ", err);
        }
    }



    const renderVideoElement = (videoToPlay) => {
        return (
            <video id="video-presentation" className="video-styling" playsInline disablePictureInPicture preload="auto">
              <source src={videoToPlay} type="video/mp4" />
            </video>
        );
    }

    const copyLink = (e) => {
        navigator.clipboard.writeText(window.location.href);
        setOpen(true);
        e.preventDefault();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const connect = (e) => {
        e.preventDefault();
        console.log("clicked");

    }

    return (
        <main className="margin-bottom">
          {profile !== null &&
            <>
            <div className="page-header-alternative" />
            <article>
              <div className="public-profile-body">
                <div className="top-cont">
                <div className="public-profile-top">
                  <div className="top-inner">
                    <div className="box-left">
                      <div className="img-wrapper">
                        <img className="public-img" src={profile.image ? profile.image : "https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png"} alt={`Profile pic of ${profile.name}`} />
                      </div>
                    </div>
                    <div className="box-right">
                      <div className="line-detail"/>
                      <div className="info-wrapper-right">
                        <div className="row first-row">
                          <h1>{profile.name}</h1>
                          <p>{profile.profession}</p>
                        </div>
                        <div className="row first-row">
                          <p>{profile.price} ETH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="public-profile-column-right">
                  <div className="column-right-bottom">
                    <button className="new-btn order-profile-btn" onClick={initSetup}>Request video</button>
                  </div>
                  <div className="">
                    <button className="new-btn share-btn" onClick={copyLink}>Share</button>
                  </div>
                </div>
              </div>
                <div className={`public-cont description ${!profile.description ? "hidden" : ""}`}>
                  <div className="description-inner">
                    <p>{profile.description}</p>
                  </div>
                </div>
                <div className="public-cont information">
                  <h3>How it works</h3>
                  <div className="information-inner">
                    <span>
                      <i className="far fa-check-circle fa-3x small-icon" alt="small icon describing putting an order"/>
                      <p>Request a video</p>
                    </span>
                    <span>
                      <i className="far fa-clock fa-3x small-icon" alt="small icon describing a clock"/>
                      <p>Cancel order and withdraw money anytime</p>
                    </span>
                    <span>
                      <i className="fas fa-sync fa-3x small-icon" alt="small icon describing an exchange"/>
                      <p>Cancel order and withdraw money anytime</p>
                    </span>
                  </div>
                </div>
              </div>
            </article>
            </>
        }
        </main>
    );
};

export default Profile;
