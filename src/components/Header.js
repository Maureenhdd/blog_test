import React from 'react'
import menu from '../img/menu.svg'
import flower from '../img/flower.svg'



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
        console.log(currentState)
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
                                <li className="nav_right_links_content">Home</li>
                                <li className="nav_right_links_content">Blog</li>
                                <li className="nav_right_links_content">Category</li>
                                <li className="nav_right_links_content">Link</li>
                                <li className="nav_right_links_content">Link</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </>
        )
    }
}



export default Header
