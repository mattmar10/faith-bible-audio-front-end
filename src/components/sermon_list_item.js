import React from 'react';

const SermonListItem = ({sermon, playSermonHandler}) => {
    const title = sermon.title;
    const date = sermon.date;
    const series = sermon.series;
    const speaker = sermon.speaker;
    const mp3URL = sermon.mp3URI;
    const pdfURL = sermon.pdfURI;
    const imageURL = sermon.imageURI != null ? sermon.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";

    const styles = {
        row: {
            display: 'flex',
            width: '100%',
            padding: '10px'
        }
    };

    return (
        <li className="sermon-list-item">
            {/* <div className="media">
                <div className="media-left">
                    <div className="imageWrapper">
                        <img className="img-thumbnail" src={imageURL} />
                    </div>
                </div>
                <div className="media-body">
                    
                    <span className="sermon-list-item-heading">{title}</span>
                    <div className="sermon-list-item-time">{date}</div>



                    

                    <div className="sermon-list-item-series">{series}</div>
                    <div className="sermon-list-item-speaker">{speaker}</div>
                    <audio src={mp3URL} controls></audio>
                    <div>Link: <a href={mp3URL}>Download</a></div>
                    <audio src={mp3URL} controls></audio>
                </div>

            </div>*/}

            <div className="seriesSermonListRow">
                <div><img src={imageURL} /></div>
                <div className={"sermonRowTitle"}>{title}</div>
                <i onClick={() => playSermonHandler(sermon)} className="material-icons md-36">play_circle_outline</i>
            </div>

        </li>
    );
};

export default SermonListItem;