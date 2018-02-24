import React from "react";
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import { Link } from "react-router-dom";
import API from '../../utils/API.js';
import { Button } from "react-materialize";
import axios from "axios";


// materialize navbar
const Nav = () => (
    <header>
        <nav className="navbar teal lighten-2">
            {/* <!-- Navigation Bar --> */}
            <div className="nav-wrapper">
                <a href="/dashboard" className="brand-logo header-logo"><img src="assets/img/icon-24x24.svg"/> Infomator Annotator</a>
            </div>
        </nav>
    </header>
    )


export default Nav;
