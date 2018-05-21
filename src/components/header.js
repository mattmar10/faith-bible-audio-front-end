import React from 'react';
import { Link } from "react-router-dom";
import HeaderSearchBar from '../containers/header_search_bar'

const SeriesGridItem = () => {

    return (
        <div className="smallHeader">
            <div className="row">
                <Link to={'/'}>
                    <div className="col-sm-5"><h5>FBC Media Archive</h5></div>
                </Link>
                <div className="col-sm-5 smallHeaderSearchWrapper">
                    <div className="headerSearchBar"> {<HeaderSearchBar />}</div>
                </div>
                <div className="col-sm-2">CONTACT US</div>

            </div>
        </div>
    );
};

export default SeriesGridItem;