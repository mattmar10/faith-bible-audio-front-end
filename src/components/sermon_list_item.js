import React from 'react';

const SermonListItem = ({sermon}) => {
    const title = sermon.title;
    const date = sermon.date;
    const series = sermon.series;
    const speaker = sermon.speaker;
    const mp3URL = sermon.mp3URI;
    const pdfURL = sermon.pdfURI;
    
    return (
        <li className="list-group-item">
            <div className="media">
                <div className="media-left">
                    <img className="media-object" className="img-responsive" src="http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png" />
                </div>
                <div className="media-body">
                    <div className="media-heading"><h5>{title}</h5></div>
                    <div>Speaker: {speaker}</div>
                    <div>Date: {date}</div>
                    <div>Series: {series}</div>
                    <div>Link: <a href={mp3URL}>Download</a></div>
                    <audio src={mp3URL} controls></audio>
                </div>
            </div>

        </li>
    );
};

export default SermonListItem;