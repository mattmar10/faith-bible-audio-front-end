import React, { Component } from 'react';

import { withRouter, Link } from "react-router-dom";
import '../css/Burger.css'
import { bindActionCreators } from 'redux'
import AudioSearchService from "../services/audio-search-service";
import { connect } from "react-redux";
import BurgerMenu from '../components/burger_menu';

class HeaderRightMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isMobile) {
            return (
                <div className='headerRightMenu'>
                    <BurgerMenu />
                </div>
            );
        }
        else {
            return (
                <div className='headerRightMenu'>
                    <ul>
                        <li><a href="/search">Explore</a></li>
                        <li><a href="mailto:fbc@faithbibleok.com">Contact Us</a></li>
                        <li><a href="http://www.faithbibleok.com">Main Site</a></li>
                    </ul>
                </div>

            );
        }


    }
}

function mapStateToProps(state) {
    return {
    };
}


function mapDispatchToProps(dispatch) {

    return {
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderRightMenu));
