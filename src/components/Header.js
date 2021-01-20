import React from 'react'
import menu from '../img/menu.svg'
import flower from '../img/flower.svg'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    openNav() {
        const currentState = this.state.isNavOpen;
        this.setState({ isNavOpen: !currentState });
    }

    render() {
        return (
            <>
                <div>
                    {this.ok}
                    <div className="nav_responsive" onClick={this.openNav}>
                        <img src={menu} className="nav_responsive_img"></img>
                    </div>
                    <nav className={"nav" + ' ' + (this.state.isNavOpen ? "nav_active" : '')} >
                        <div className="nav_left">
                            <img src={flower} className="nav_left_logo" alt="logo flower"></img>
                        </div>
                        <div className="nav_right">
                            <ul className="nav_right_links">
                                <Link className="nav_right_links_content" to='/'><li className="nav_right_links_li">Home</li></Link>
                                <Link className="nav_right_links_content" to='/'><li className="nav_right_links_li">Blog</li></Link>
                                <Link className="nav_right_links_content" to='/'><li className="nav_right_links_li">Category</li></Link>
                                <Link className="nav_right_links_content" to='/'><li className="nav_right_links_li">Link</li></Link>
                                <Link className="nav_right_links_content" to='/'><li className="nav_right_links_li">Link</li></Link>
                            </ul>
                        </div>
                    </nav>
                </div>
            </>
        )
    }
}

export default Header
