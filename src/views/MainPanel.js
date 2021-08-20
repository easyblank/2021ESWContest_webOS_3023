import React, { Component , useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom"
import About from "./routes/About"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Navigation from "./routes/Navigation";
import firebase from "./firebase";
import AppRouter from "./routes/router";
import { authService } from "./firebase"

function MainPanel() {
    const [init, setInit] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
    const [userObj, setUserObj] = useState(null);

    useEffect(()=>{
        authService.onAuthStateChanged((user)=> {
            if(user){
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        }
        );
    },[]);
    // const auth = firebase.auth();
    return (
    // <HashRouter>
    //     <Navigation />
    //     <Route path="/" exact={true} component={Home}/>
    //     <Route path="/about" exact={true} component={About}/>
    //     <Route path="/movie/:id" exact={true} component={Detail}/>
    // </HashRouter>

    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
    </>

    // <AppRouter isLoggedIn={isLoggedIn}/>
    );
}

export default MainPanel;