import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SeriesGridItem = ({series}) => {
    const title = series.title;
    const imageURL = series.imageURI != null ? series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";
    
    return (
        
        <div>
            <div className='seriesCard'>
                <Link to={`/series/${series.slug}`}>
                    <div>
                        <img className="" src={imageURL} />
                    </div>
                    <div className='sermon-list-item-heading'>
                        <span>{title}</span>
                    </div>
                </Link>
            </div>
        </div>
        
    );
};

export default SeriesGridItem;