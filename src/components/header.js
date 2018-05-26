import React from 'react';
import { Link } from "react-router-dom";
import HeaderSearchBar from '../containers/header_search_bar'
import logo from '../images/FBC_Logo.png'

const SeriesGridItem = () => {

    return (
        <div className="smallHeader">
            <div className="row ">
                <Link to={'/'}>
                    <div className="col-sm-6 smallHeaderLeft">

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1">
                                    <img id="logoImg" src={logo}/>
                                </div>
                                <div className="col-sm-11 logoText vertical-align" >
                                    <span>FBC Media Archive</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>
                <div className="col-sm-4 smallHeaderSearchWrapper">
                    <div className="headerSearchBar"> {<HeaderSearchBar />}</div>
                </div>
                <div className="col-sm-2 smallHeaderRight"><a href="mailto://fbc@faithbibleok.com">Contact Us</a></div>

            </div>
        </div>
    );
};

export default SeriesGridItem;