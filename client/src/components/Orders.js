import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import getWeb3 from "./../web3/getWeb3";
import RenderOrders from "./RenderOrders";
// import VideoContract from "./../contracts/VideoContract.json";

const Orders = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState('');
    const [loadSkeleton, setLoadSkeleton] = useState(false);
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const {profile} = props.location.state;
        setProfile(profile);
    }, []);


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
                          <h1>Orders of {profile.name}</h1>
                        </div>
                      </div>
                      <div className="settings-wrapper btn-wrapper">
                        <button onClick={() => history.goBack()} className="back-btn settings-quit-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RenderOrders />
              </div>
            </article>
            </>
        }
        </main>
    );
};

export default Orders;
