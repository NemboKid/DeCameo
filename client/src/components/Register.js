import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import getWeb3 from "./../web3/getWeb3";
import VideoContract from "./../contracts/VideoContract.json";

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
    var charityList = ["Select address", "0x5ecaD2fEff2BC75CbdC5Fc1Cd43FdF9dE020dacc", "0xFBf1723fe3bf4a40F7454385A1dBd47DB3CC99A3", "0x896a0f3304ac4ba90aF7c0BEffB7F4e57AfAd2b5"];
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
          name: "Sidewalks for the icebears in Sweden",
          description: "ölkskgörytrey gfjfgjerwdcv. köljsöfwe öäladfögwå"
        }
    ]
    //const charities = charityList.map(x => (<option key={x} value={x}>{x}</option>));
    const charities = charityList.map(x => (<option key={x} value={x} disabled={x === "Select address" ? true : false}>{x}</option>));
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
              <div className="charity-wrapper">
                <h4>Charity details</h4>
                <p><small>Name:</small> {charityDetails[charityList.indexOf(userData.charity)].name}</p>
                <p><small>Description:</small> {charityDetails[charityList.indexOf(userData.charity)].description}</p>
              </div>
              <div className="form-input-row">
                <label>Presentation text ({textLength}/150)</label>
                <textarea maxLength="150" name="description" onChange={handleChange} value={userData.description} placeholder="Tell people who you are and what they can expect" />
              </div>
              {/* <div className="form-input-row">
                <label>Twitter handle (for notifications)</label>
                <input type="text" name="twitter" value={userData.twitter} placeholder="VitalikButerin" onChange={handleChange} />
              </div> */}
              <span className="info-cont">
                <p>
                  Registering a profile will store the data in <a href="etherscan.org/address/0x31234134" target="_blank">our smart contract</a> and will be public available on the Ethereum blockchain.
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
