import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import getWeb3 from "./../web3/getWeb3";
import RenderOrders from "./RenderOrders";
// import VideoContract from "./../contracts/VideoContract.json";

const OrderModal = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [copySuccess, setCopySuccess] = useState('');
    const [loadSkeleton, setLoadSkeleton] = useState(false);
    const [orderData, setOrderData] = useState({
        celebrity: props.profile[1],
        charity: props.profile[2],
        description: "",
        to: "",
        from: "",
        amount: 0
    });
    const [loading, setLoading] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [orderType, setOrderType] = useState({
        personal: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        name === "description" && setTextLength(value.length);

        setOrderData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
        e.preventDefault();
    }

    const orderVideo = async (e) => {
        e.preventDefault();
        //console.log("address: ", props.appState.account, orderData.celebrity, orderData.charity);
        let from = "default";
        if (orderData.from !== "") {
            from = orderData.from;
        }

        props.appState.contract.methods.orderVideo(orderData.celebrity, orderData.charity, orderData.description, orderData.to, from, orderData.amount)
        .send({
            from: props.appState.account,
            value: props.appState.web3.utils.toWei(orderData.amount)
        })
        .on("transactionHash", hash => {
            console.log("hash: ", hash);
            window.alert("Order successfully sent!")
            // setLoading(false);
        })
    }


    const handleToggle = (e) => {
        const { name, value, checked } = e.target;
        setOrderType({ ...orderType, [e.target.name]: e.target.checked });
    };


    return (
        <div className="order-modal">
          <h1>Request a personalized video</h1>
          <div className="close-wrapper" onClick={() => props.setOrderModal(false)}>
            <CloseIcon />
          </div>
          <div className="outer">
            {
              props.appState.contract.methods &&
              <>
              <div className="inner">
                <form onSubmit={orderVideo}>
                  <div className="form-input-row">
                    <label>Charity org address (<a target="_blank" href={`https://etherscan.io/address/${orderData.charity}`}>Check on Etherscan</a>)</label>
                    <input type="text" value={orderData.charity} name="amount" required onChange={handleChange} disabled />
                  </div>
                  <div className="form-input-row">
                    <label>Amount to donate</label>
                    <input autoFocus type="text" required min="1" value={orderData.amount} name="amount" placeholder="Amount" onChange={handleChange} />
                  </div>
                  <p className="toggle-p">It this video to someone else?</p>
                  <div className="toggle-option">
                    <FormGroup row>
                     <FormControlLabel
                       control={
                         <Switch
                           checked={orderType.personal}
                           onChange={handleToggle}
                           name="personal"
                         />}
                     />
                   </FormGroup>
                  </div>
                  <div className="form-input-row">
                    <label>{!orderType.personal ? "Your name" : "To"}</label>
                    <input type="text" required value={orderData.to} name="to" placeholder="Gary" onChange={handleChange} />
                  </div>
                  <div className={`form-input-row ${!orderType.personal ? "hidden" : ""}`}>
                    <label>From</label>
                    <input type="text" value={orderData.from} name="from" placeholder="Filip" onChange={handleChange} />
                  </div>
                  <div className="form-input-row">
                    <label>Description ({textLength}/150)</label>
                    <textarea maxLength="150" required name="description" onChange={handleChange} value={orderData.description} placeholder={`Explain to ${props.profile[5]} what you want in your video`} />
                  </div>
                  <button type="submit" className="button-standard button-form">
                    Confirm order
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"></path>
                    </svg>
                  </button>
                </form>
              </div>
              </>
            }
          </div>
        </div>
    );
};

export default OrderModal;
