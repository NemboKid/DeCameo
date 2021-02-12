import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import OrderModal from "./OrderModal";


const Profile = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState('');
    const [loadSkeleton, setLoadSkeleton] = useState(false);
    const [open, setOpen] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [userData, setUserData] = useState(null);
    var charityList = ["Select address", "0x5ecaD2fEff2BC75CbdC5Fc1Cd43FdF9dE020dacc", "0xFBf1723fe3bf4a40F7454385A1dBd47DB3CC99A3", "0x896a0f3304ac4ba90aF7c0BEffB7F4e57AfAd2b5", "0x896a0f3304ac4ba90aF7c0BEffB7F4e57AfAdT45"];
    const charityDetails = [
        {},
        {
          name: "Water in India",
          description: "ljsahflkasjlfkjaköf lkajsfksamf"
        },
        {
          name: "Food in Bronx",
          description: "fsgsfg sfghfsgsfgh dfsdsf"
        },
        {
          name: "Save the Rainforests in Amazon",
          description: "dfhdfhfd dsfadda asfasfasfh"
        },
        {
          name: "Better sidewalks for the icebears in Sweden",
          description: "ölkskgörytrey gfjfgjerwdcv. köljsöfwe öäladfögwå"
        }
    ]


    useEffect(() => {
        window.scrollTo(0, 0);
        const { profile } = props.location.state;
        setUserData(profile);
    }, []);



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


    return (
        <main className="margin-bottom">
          {(userData !== null && props.appState) ?
            <>
            {
              orderModal && <OrderModal profile={userData} setOrderModal={setOrderModal} appState={props.appState} />
            }
            <div className="page-header-alternative" />
            <article>
              <div className="public-profile-body">
                <div className="top-cont">
                <div className="public-profile-top">
                  <div className="top-inner">
                    <div className="box-left">
                      <div className="img-wrapper">
                        <img className="public-img" src={!userData.test ? (userData.image ? `https://ipfs.infura.io/ipfs/${userData.image}` : "https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png") : userData.image} alt={`Profile pic of ${userData.name}`} />
                      </div>
                    </div>
                    <div className="box-right">
                      <div className="line-detail"/>
                      <div className="info-wrapper-right">
                        <div className="row first-row">
                          <h1>{userData.name}</h1>
                          <p>{userData.title}</p>
                        </div>
                      </div>
                      <div className="settings-wrapper">
                        <Link
                          className="button-settings"
                          to={{
                            pathname: `/profile/${userData[0]}/settings`,
                            state: {
                                profile: userData
                            }
                          }}>
                          <div className="svg-container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svg-settings">
                              <path d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"/>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="public-profile-column-right">
                  <div className="column-right-bottom">
                    <button className="new-btn order-profile-btn" onClick={() => setOrderModal(true)}>Request video</button>
                  </div>
                  <div className="">
                      <Link
                        to={{
                          pathname: `/profile/${userData[0]}/orders`,
                          state: {
                            profile: userData
                          }
                        }}>
                        <button className="new-btn share-btn">
                          Handle Orders
                        </button>
                      </Link>
                  </div>
                </div>
              </div>
                <div className={`public-cont description ${!userData[3] ? "hidden" : ""}`}>
                  <div className="description-inner">
                    <p>{userData.description}</p>
                  </div>
                  <div className={`charity-wrapper ${userData.charity === "Select address" ? "hidden" : null}`}>
                    <h4>Charity details (<a target="_blank" href={`https://etherscan.io/address/${userData.charity}`}>Etherscan</a>)</h4>
                    <p><small>Name:</small> {charityDetails[charityList.indexOf(userData.charity)].name} ({userData.charity})</p>
                    <p><small>Description:</small> {charityDetails[charityList.indexOf(userData.charity)].description}</p>
                  </div>
                </div>
                <div className="public-cont information">
                  <h3>How it works</h3>
                  <div className="information-inner">
                    <span>
                      <i className="far fa-check-circle fa-3x small-icon" alt="small icon describing putting an order"/>
                      <p>Request a video and decide amount to donate</p>
                    </span>
                    <span>
                      <i className="far fa-clock fa-3x small-icon" alt="small icon describing a clock"/>
                      <p>Wait for your order to arrive and pay upon delivery</p>
                    </span>
                    <span>
                      <i className="fas fa-sync fa-3x small-icon" alt="small icon describing an exchange"/>
                      <p>Cancel order and withdraw money at anytime</p>
                    </span>
                  </div>
                </div>
              </div>
            </article>
            </>
            :
            <p>Loading...</p>
        }
        </main>
    );
};

export default Profile;
