//"How it works" in Home Component
const How = () => {

    return (
        <div className="info-cont" id="how">
          <div className="section-title-outer">
            <div className="section-title">
              <span>
                <h1>How it works</h1>
                <div className="title-line"></div>
              </span>
              <span>
                <p>On DeCameo you can browse through developers to order a personalised video from. Perhaps you want help with a coding question, or you just want to have Vitalik wish happy birthday to one of your friends? The money goes to a charity organization of the profiles choice.</p>
              </span>
            </div>
          </div>
          <div className="icons-wrapper">
            <div className="over">
              <div className="info-box">
                <div className="info-col">
                  <i className="fas fa-hand-holding-heart" />
                  <span>
                    <p>Help people in their day to day life by charity</p>
                  </span>
                </div>
                <div className="info-col">
                  <i className="fas fa-exchange-alt" />
                  <span>
                    <p>Cancel your request and withdraw ethers until video has been delivered</p>
                  </span>
                </div>
                <div className="info-col">
                  <i className="fab fa-ethereum" />
                  <span>
                    <p>Spread the use of Ethereum and smart contracts</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
export default How;
