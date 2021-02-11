import React from 'react';
import Top from "./home/Top";
import Profiles from "./home/Profiles";
import How from "./home/How";

const Home = (props) => {
    return (
        <div className="home-cont">
          <Top />
          <Profiles appState={props.appState}/>
          <How />
        </div>
    );
}
export default Home;
