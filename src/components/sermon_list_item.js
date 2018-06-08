import React from 'react';

const SermonListItem = ({sermon, playSermonHandler, isMobile}) => {
        const title = sermon.title;
        const date = sermon.date;
        const series = sermon.series;
        const speaker = sermon.speaker;
        const mp3URL = sermon.mp3URI;
        const pdfURL = sermon.pdfURI;
        const imageURL = sermon.imageURI != null ? sermon.imageURI : "https://s3.amazonaws.com/faith-bible-data/mp3-images/2017_0813_MH-FBC.mp3.jpg";

        const likeCount = sermon.stats != null ? sermon.stats.likes : "";
        const playCount = sermon.stats != null ? sermon.stats.plays : "";
        const shareCount = sermon.stats != null ? sermon.stats.shares : "";

        const styles = {
            seriesTitleMobile: {
                fontSize: "12px",
                color: "#888",
                display: 'flex',
                justifyContent: 'space-between',
                textTransform: 'uppercase'
            },
            seriesTitle: {
                color: "#888",
                fontSize: "12px",
                textTransform: 'uppercase'
            },
            seriesSpeaker: {
                fontSize: "12px",
                color: "#888"
            },
            sermonTitle: {
                fontSize: "14px",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingTop: '3px'
            },
            mobileImagePart: {
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                width: '80px'
            },

        };

        if (isMobile) {
            const backgroundStyle = {background: `url(${imageURL}) 50% 50% no-repeat`, backgroundSize: 'cover', height: '80px', width: '80x'};
            return (
                <li className="sermon-list-item">

                    <div className="seriesSermonListRow" onClick={() => playSermonHandler(sermon)}>
                        <div style={styles.mobileImagePart}>
                            <div style={backgroundStyle} />

                        </div>
                        <div className={"sermonRowDetails"}>
                            <div style={styles.seriesTitleMobile}>
                                <div>{series}</div>
                                <div>{date}</div>    
                            </div>
                            <div style={styles.sermonTitle}>{title}</div>
                            <div style={styles.seriesSpeaker}>{speaker}</div>
                            <div className={"seriesMobileSocialRow"}>

                                <div className={"sermonSocialStatsMobile"}><i className="fa fa-play" aria-hidden="true"></i> {playCount} </div>
                            </div>
                        </div>

                    </div>



                </li>
            );
        }
        else {
            return (
                <li className="sermon-list-item">

                    <div className="seriesSermonListRow" onClick={() => playSermonHandler(sermon)}>
                        <div><img src={imageURL}/></div>
                        <div className={"sermonRowDetails"}>
                            <div style={styles.seriesTitle}>{series} - {date}</div> 
                            <div style={styles.sermonTitle}>{title}</div>
                            <div style={styles.seriesSpeaker}>{speaker}</div>
                        </div>
                        
                        <div className={"seriesSocialRow"}>
                            <div className={"sermonSocialStats"}><i className="fa fa-share " aria-hidden="true"></i>{shareCount}</div>
                            <div className={"sermonSocialStats"}><i className="fa fa-play" aria-hidden="true"></i>{playCount}</div>
                        </div>
                        
                    </div>

                </li>
            );
        }

    }




export default SermonListItem;