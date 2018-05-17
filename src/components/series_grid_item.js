import React from 'react';

const SeriesGridItem = ({series}) => {
    const title = series.title;
    const imageURL = series.imageURI != null ? series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";
    
    return (
        <li className="col-md-4" >
            <div>
                <img className="img-thumbnail" src={imageURL} />
            </div>
            <div>
                <span className="sermon-list-item-heading">{title}</span>
            </div>
        </li>
    );
};

export default SeriesGridItem;