import React, {Suspense} from "react";
import { Switch, Router, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import Header from "./components/Header";
import Video from "./components/Video";
import Spreads from "./components/Spreads";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Orders from "./components/Orders";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Footer from "./components/Footer";

function Routes() {
    const location = useLocation();

    return (
        <>
        <Suspense fallback="...Loading">
            <>
            <Header />
              <Switch>
                  <RouteOpen exact path="/" component={Home} />
                  <RouteOpen exact path="/about" component={About} />
                  <RouteOpen exact path="/register" component={Register} />
                  <RouteOpen exact path="/spreads" component={Spreads} />
                  <RouteOpen exact path="/video" component={Video} />
                  <RouteOpen exact path="/profile/:id" component={Profile} />
                  <RouteOpen exact path="/profile/:id/settings" component={Settings} />
                  <RouteOpen exact path="/profile/:id/orders" component={Orders} />
              </Switch>
              <Footer />
            </>
        </Suspense>
        </>
    )
}

const RouteOpen = ({component: Component, ...rest }) => {

    return (
        <Route
          { ...rest }
          render={props =>
            <Component {...props} />
          }
        />
        )
}

export default Routes;
