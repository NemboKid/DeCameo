import React, { useState } from 'react';

const Top = () => {
    const [urlIndex, setUrlIndex] = useState(0);

    const handleEnded = () => {
         if (urlIndex >= 1) {
            setUrlIndex(0);
         } else {
            setUrlIndex(urlIndex + 1);
         }
    }

    return (
        <div className="home-top">
          <div className="inner">
            <div className="phone">
              <div className="phone-container">
                <div className="phone-right">
                  <figure className="phone-graphic">
                    <div className="mobile-inner">
                      <video className="video-style" src="https://ipfs.infura.io/ipfs/QmNh4HXE5sPA1s9pGEnAkmBG4H4bdUbBwxhStnEA2AWswG" autoPlay playsInline onEnded={handleEnded} loop muted />
                    </div>
                  </figure>
                </div>
              </div>
            </div>
            <div className="text-wrapper">
              <h1>Get personalized videos from your favorite develpers</h1>
              <div className="info-box">
                <h3>DeCameo is a marketplace that lets you get videos from your favorite blockchain programmers while also giving to charity. Ask a question or get a happy birthday message.</h3>
                <div className="btn-wrapper">
                  <a className="btn-standard" href="#how">How it works</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
export default Top;
