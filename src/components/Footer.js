import React from 'react'
import flower from '../img/flower.svg'
import insta from '../img/instagram.svg'
import facebook from '../img/facebook.svg'
import twitter from '../img/twitter.svg'
import { Link } from 'react-router-dom'

const Footer = props => {
    return (
        <footer className="footer">
            <div className="footer_content">
                <div className="footer_content">
                    <img src={flower} className="footer_logo" alt="logo flower"></img>
                    <h4 className="footer_title">About us</h4>
                    <p className="footer_text"> Nuage chamarré d'or et un anneau. Sommé de se rendre introuvable.</p>
                    <h4 className="footer_title">Follow us ! </h4>
                    <div className="footer_social" >
                        <Link to='/'><img src={insta} className="footer_img_social" ></img></Link>
                        <Link to='/'><img src={facebook} className="footer_img_social" ></img></Link>
                        <Link to='/'><img src={twitter} className="footer_img_social" ></img></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
