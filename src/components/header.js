
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import HeaderSearchBar from '../containers/header_search_bar'
import logo from '../images/logo.png'
import HeaderRightMenu from '../containers/header-right-menu';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {

        const { width } = this.state;
        const isMobile = width <= 768;

        return (
            <div className="smallHeader">
                <Link to={'/'}>
                    <div>
                        <img id="logoImg" src={logo} />
                    </div>

                </Link>

                <HeaderSearchBar 
                    isMobile={isMobile} 
                    searchTerm={this.props.searchTerm} 
                    onSearch={this.props.onSearch} />

                {<HeaderRightMenu isMobile={isMobile}/>}

            </div>

        );
    }
}

export default Header;