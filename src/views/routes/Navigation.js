import React, { Component } from "react";
import { Link } from "react-router-dom"

function Navigation() {
    return (
    <div>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="./profile">Profile</Link>
            </li>
            <li>
            <Link to={{
                pathname:"./about",
                state:{
                    fromNavigation: true
                }
            }}>About</Link>
            </li>
        </ul>
    </div>
    )
}

export default Navigation;