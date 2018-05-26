import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SeriesGridItem = ({series}) => {
    const title = series.title;
    const imageURL = series.imageURI != null ? series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";
    
    return (
        <Link to={`/series/${series.slug}`}>
        <li className="col-md-4" >
            <div>
                <img className="img-thumbnail" src={imageURL} />
            </div>
            <div>
                <span className="sermon-list-item-heading">{title}</span>
            </div>
        </li>
        </Link>
    );
};

export default SeriesGridItem;