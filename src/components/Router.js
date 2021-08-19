import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigaion from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj}) => {

    return (
        <Router>
            {/* isLoggedIn이 참이라면 뒤의 문장 실행 */}
            {isLoggedIn && <Navigaion />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj}/>
                        </Route>
                    </>) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                )
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;