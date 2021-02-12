import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const HandleOrder = (props) => {
    let history = useHistory();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoState, setVideoState] = useState({
        buffer: null,
        size: null,
    });
    const [order, setOrder] = useState();


    useEffect(() => {
        try {
            props.location.state.order && setOrder(props.location.state.order);
            setLoading(false);
        } catch (err) {
            console.log(err);
            history.push("/");
        }
    }, []);

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
            window.alert(`Video size limit is 30 MB, while your file was ${videoState.size / 1000000} MB. Upload a smaller one.`);
            return;
        } else {
            ipfs.add(videoState.buffer)
            .then(res => {
                console.log("ipfs RES: ", res);
                setVideo(res.path);
            });
        }
    }

    const deleteOrder = (e) => {
        e.preventDefault();
        props.appState.contract.methods.deleteOrder(order[0])
        .send({ from: props.appState.account, gas: 3000000 })
        .on("transactionHash", hash => {
            window.alert("Order deleted and funds sent back to the address that placed the order.")
        })
    }

    const sendOrder = (e) => {
        e.preventDefault();
        if (video.length < 2) {
            window.alert("Did you upload a video?");
            return;
        }
        props.appState.contract.methods.sendOrder(order[0], video)
        .send({ from: props.appState.account, gas: 3000000 })
        .on("transactionHash", hash => {
            window.alert("Order was sent and money transfered to the charity address of your choice")
        })
    }

    return (
        <main className="margin-bottom">
          {loading ? <p>...Loading page</p>
            :
            <article>
              <button onClick={() => history.goBack()} className="back-btn button-standard">
                <div className="btn-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                  </svg>
                  <p>
                    Return
                  </p>
                </div>
              </button>
              <div className="public-profile-body">
                <h2>Order Details</h2>
                <p>ID: {order[0]}</p>
                <p>Profile address: {order.celebrity}</p>
                <p>Charity address: {order.charity}</p>
                <p>Description: {order.description}</p>
                <p>Amount: {order.donatedAmount}</p>
                <p>Status: {order.status === "0" ? "Not Delivered" : "Delivered"}</p>
                <br/>
                <input type="file" accept=".mp4, .mov, .ogg, .wmv" onChange={setFile} />
                <div className={!video && "hidden"}>
                  <video playsInline disablePictureInPicture autoload="true" controls>
                    <source src={video && `https://ipfs.infura.io/ipfs/${video}`} type="video/mp4" />
                  </video>
                </div>
                <button type="submit" className="button-standard button-form" disabled={order.status === "1" && true} onClick={sendOrder}>
                  Send Video
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"></path>
                  </svg>
                </button>
                <button type="submit" className="button-standard button-form back-btn delete-btn" disabled={order.status === "1" && true} onClick={deleteOrder}>
                  Delete order
                </button>
              </div>
            </article>
          }
        </main>
    );
};

export default HandleOrder;
