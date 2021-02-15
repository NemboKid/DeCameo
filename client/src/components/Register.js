import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import charityDetails from "./charities";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Register = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        title: "",
        image: "",
        description: "",
        charity: "Select address"
    });
    const [profile, setProfile] = useState(null);
    //var charityList = ["Select address", "0xC7e797350Bb6bD64d4274C3DBf3f9F6c6E67081b", "0xBeaB4c6024104A1156A5ebaE223d421072529591", "0x17462F7D6607902AC20E0Aa375e0Ccd0C2c1a34C", "0x8B713a128ca9662b9eCeFe98c7E23c9015686ACa"];
    //const charities = charityList.map(x => (<option key={x} value={x}>{x}</option>));
    const charities = charityDetails.charities.map(x => (<option key={x.id} value={x.id} disabled={x.name === "Select address" ? true : false}>{x.name}</option>));
    const [textLength, setTextLength] = useState(0);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");
    const [loading, setLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        console.log("address: ", props.appState.account);
        props.appState.contract.methods.registerCelebrity(userData.charity, userData.description, userData.title, userData.name, userData.image)
        .send({ from: props.appState.account, gas: 3000000 })
        .on("transactionHash", hash => {
            console.log("hash: ", hash);
            cleanUserData();
            window.alert("Profile created!")
        })
        window.scrollTo(0, 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        name === "presText" && setTextLength(value.length);

        setUserData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
        e.preventDefault();
    }

    const onChangePhoto = async (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const uploadPhoto = async (uploadFile) => {
        await ipfs.add(file).then(res => {
            console.log("ipfs RES: ", res);
            setUserData(prevState => {
                return { ...prevState,
                    image: res.path
                }
            });
        }).catch(err => {
            console.log("An error occured: ", err.message);
        })
    }

    if (file) {
        uploadPhoto(file);
        setFile();
    }


    const cleanUserData = () => {
        setUserData({
            image: "",
            name: "",
            title: "",
            description: "",
            charity: "Select address"
        })
    };


    return (
        <main className="margin-bottom">
          <div className="form-cont">
            <h1>Register a profile</h1>
            <form onSubmit={registerUser}>
              <div className="profile-img-cont">
                <img src={userData.image ? `https://ipfs.infura.io/ipfs/${userData.image}` : "https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png"} />
              </div>
              <div className="form-input-row file-input">
                <input id="files" accept=".jpeg, .jpg, .png, .gif" type="file" onChange={onChangePhoto} hidden />
                <label htmlFor="files" className="button-standard full-btn upload-btn">Choose photo</label>
              </div>
              <div className="form-input-row">
                <label>Name</label>
                <input autoFocus type="text" required min="2" value={userData.name} name="name" placeholder="Vitalik Buterin" onChange={handleChange} />
              </div>
              <div className="form-input-row">
                <label>Title</label>
                <input type="text" required value={userData.title} name="title" placeholder="BUIDLer" onChange={handleChange} />
              </div>
              <div className="form-input-row">
                <label>Charity address</label>
                <select name="charity" value={userData.charity} onChange={handleChange}>
                  {charities}
                </select>
              </div>
              <div className={`charity-wrapper ${userData.charity === "Select address" ? "hidden" : null}`}>
                <h4>Charity details</h4>
                <p><small>Address:</small> {userData.charity !== "Select address" && charityDetails.charities[Number(userData.charity)].address}</p>
                <p><small>Name:</small> {userData.charity !== "Select address" && charityDetails.charities[Number(userData.charity)].name}</p>
                <p><small>Description:</small> {userData.charity !== "Select address" && charityDetails.charities[Number(userData.charity)].description}</p>
              </div>
              <div className="form-input-row">
                <label>Presentation text ({textLength}/150)</label>
                <textarea maxLength="150" name="description" onChange={handleChange} value={userData.description} placeholder="Tell people who you are and what they can expect" />
              </div>
              <span className="info-cont">
                <p>
                  Registering a profile will store the data in <a href="https://ropsten.etherscan.io/address/0xCa848d39908191db6e3518A20A80C89970671d33" target="_blank">our smart contract</a> and will be public available on the Ethereum blockchain.
                </p>
              </span>
              <button type="submit" className="button-standard button-form" disabled={userData.name ? false : true}>
                Register
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"></path>
                </svg>
              </button>
            </form>
          </div>
        </main>
    );
};

export default Register;
