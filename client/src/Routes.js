import React, {Suspense, useState, useEffect} from "react";
import { Switch, Router, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import Header from "./components/Header";
import Video from "./components/Video";
import Spreads from "./components/Spreads";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Orders from "./components/Orders";
import HandleOrder from "./components/HandleOrder";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Footer from "./components/Footer";
import getWeb3 from "./web3/getWeb3";
import VideoContract from "./contracts/VideoContract.json";

function Routes() {
    const location = useLocation();
    const [appState, setAppState] = useState({
        web3: {},
        account: "",
        contract: {}
    });

    useEffect(() => {
        initSetup();
    }, []);

    const initSetup = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          // console.log("get web3: ", web3);

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          console.log("account: ", accounts);

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = await VideoContract.networks[networkId];

          //load in the contract
          const instance = await new web3.eth.Contract(
            VideoContract.abi,
            deployedNetwork && deployedNetwork.address //only if deployedNetwork exists
          );
          setAppState(prevState => {
              return { ...prevState,
                  web3: web3,
                  account: accounts[0],
                  contract: instance
              }
          });
        } catch (err) {
            // Catch any errors for any of the above operations.
            console.log("error man: ", err);
        }
    }

    return (
        <>
        <Suspense fallback="...Loading">
          <>
          <Header />
            <Switch>
              <RouteOpen exact path="/" component={Home} appState={appState} />
              <RouteOpen exact path="/about" component={About} />
              <RouteOpen exact path="/register" component={Register} appState={appState} />
              <RouteOpen exact path="/spreads" component={Spreads} />
              <RouteOpen exact path="/video" component={Video} />
              <RouteOpen exact path="/profile/:id" component={Profile} appState={appState}/>
              <RouteOpen exact path="/profile/:id/settings" component={Settings} appState={appState}/>
              <RouteOpen exact path="/profile/:id/orders" component={Orders} appState={appState}/>
              <RouteOpen exact path="/profile/:id/order/:orderId" component={HandleOrder} appState={appState}/>
            </Switch>
            <Footer />
          </>
        </Suspense>
        </>
    )
}

const RouteOpen = ({appState, component: Component, ...rest }) => {
    return (
        <Route
          { ...rest }
          render={props =>
            <Component {...props} appState={appState} />
          }
        />
        )
}

export default Routes;
