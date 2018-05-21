import React from 'react';

import HeaderSearchBar from '../containers/header_search_bar'

const SeriesGridItem = () => {

    return (
        <div className="smallHeader">
            <div className="row">
                <div className="col-sm-3"><h5>FBC Media Archive</h5></div>
                <div className="col-sm-6 headerSearchBar">{<HeaderSearchBar />}</div>
                <div className="col-sm-3">right</div>
            </div>
        </div>
    );
};

export default SeriesGridItem;