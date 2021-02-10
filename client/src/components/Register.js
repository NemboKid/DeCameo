import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Register = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        image: "",
        pres_text: "",
        address: "",
        charity: "",
        price: "",
    });
    const [profile, setProfile] = useState(null);
    var charityList = ["0x23523", "0x2376985675436", "0x578534534568", "0x3242332", "0x5475673453456", "0x23423423423423", "0x57457", "0x1242445646563", "0x325346346", "0x3242342354634634"];
    const charities = charityList.map(x => (<option key={x} value={x}>{x}</option>));
    const [textLength, setTextLength] = useState(0);
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");


    const registerUser = async (e) => {
        e.preventDefault();

        cleanUserData();
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
            name: "",
            email: "",
            password: ""
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
                <label>Name *</label>
                <input autoFocus type="text" required min="2" value={userData.name} name="name" placeholder="Vitalik Buterin" onChange={handleChange} />
              </div>
              <div className="form-input-row">
                <label>Charity address</label>
                <select name="chairty" value={userData.charity} onChange={handleChange}>
                  {charities}
                </select>
              </div>
              <div className="form-input-row">
                <label>Presentation text ({textLength}/150)</label>
                <textarea maxLength="150" name="presText" onChange={handleChange} value={userData.presText} placeholder="Tell people who you are and what they can expect" />
              </div>
              <div className="form-input-row">
                <label>Twitter handle (for notifications)</label>
                <input type="text" name="twitter" value={userData.twitter} placeholder="VitalikButerin" onChange={handleChange} />
              </div>
              <span className="info-cont">
                <p>
                  Registering a profile will store the data in <a href="etherscan.org/address/0x31234134" target="_blank">our smart contract</a> and will be public available on the Ethereum blockchain.
                </p>
              </span>
              <button type="submit" className="button-standard button-form" disabled={`${!userData.name ? true : ""}`}>
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
