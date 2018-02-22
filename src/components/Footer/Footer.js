import React from "react";


const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 999999
};



// materialize footer
const Footer = () =>

    <footer className="page-footer footer-fixed deep-orange darken-2 center-align">
        <div className="footer-copyright">
            <div className="container">
                <div>
                    &copy;
                    <span id="copyright">2018, </span>
                    <span><a className="footer-yellow">newsAnnotater</a>. All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>


export default Footer;
