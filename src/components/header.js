import React from 'react';
import { Link } from "react-router-dom";
import HeaderSearchBar from '../containers/header_search_bar'
import logo from '../images/logo.png'

const SeriesGridItem = () => {

    return (
        <div className="smallHeader">
            <div className="row ">
                <Link to={'/'}>
                    <div className="col-sm-5 smallHeaderLeft">

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1">
                                    <img id="logoImg" src={logo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="col-sm-4 smallHeaderSearchWrapper">
                    <div className="headerSearchBar"> {<HeaderSearchBar />}</div>
                </div>

            </div>
        </div>
    );
};

export default SeriesGridItem;