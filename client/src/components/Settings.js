import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import getWeb3 from "./../web3/getWeb3";
import Connect from "./Connect";
// import VideoContract from "./../contracts/VideoContract.json";

let VideoContract;

const Settings = (props) => {
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
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");
    var charityList = ["0x23523", "0x2376985675436", "0x578534534568", "0x3242332", "0x5475673453456", "0x23423423423423", "0x57457", "0x1242445646563", "0x325346346", "0x3242342354634634"];
    const charities = charityList.map(x => (<option key={x} value={x}>{x}</option>));
    const [textLength, setTextLength] = useState(0);

    useEffect(() => {
        const {profile} = props.location.state;
        setProfile(profile);
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

    const onChangePhoto = async (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        name === "presText" && setTextLength(value.length);

        setProfile(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
        e.preventDefault();
    }

    const updateProfileSettings = (e) => {
        e.preventDefault();
        console.log("tjosan");
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
                        <div className="form-input-row file-input">
                          <input id="files" accept=".jpeg, .jpg, .png, .gif" type="file" onChange={onChangePhoto} hidden />
                          <label htmlFor="files" className="button-standard full-btn upload-btn">Choose photo</label>
                        </div>
                        <div className="row first-row">
                          <input name="price" value={profile.price} onChange={handleChange} />
                        </div>
                        <select name="chairty" value={profile.charity} onChange={handleChange}>
                          {charities}
                        </select>
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
              <textarea name="description" value={profile.description} />
              <button className="button-standard" onClick={updateProfileSettings}>
                Update profile
              </button>
              </div>
            </article>
            </>
        }
        </main>
    );
};

export default Settings;
