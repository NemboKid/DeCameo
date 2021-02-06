import React from 'react';
import logo from "./../img/svg/normal/default-monochrome.svg";

const Footer = () => {

    return (
        <footer>
          <div className="footer-outer">
            <div>
              <img src={logo}/>
            </div>
            <div className="footer-inner">
              <div className="footer-email-outer">
                <div className="footer-email-inner">
                  <h3>Like the product? Help us spread the word about decentralized cameos for charity!</h3>
                </div>
              </div>
              {/* <div className="footer-up">
                <div className="footer-social">
                  <ul>
                    <a className="profile-social-icon" rel="external noopener noreferrer" href="https://twitter.com/fsundgren" target="_blank">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a className="profile-social-icon footer-envelope-icon" href="mailto:fsundgren13@gmail.com">
                      <i className="fa fas fa-envelope"></i>
                    </a>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="bottom-container">
              <div className="footer-down">
                <p>Copyright © 2021 DeCameo</p>
              </div>
            </div>
          </div>
          <div className="stripes" />
        </footer>
    );
}
export default Footer;
