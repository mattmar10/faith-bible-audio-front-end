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
            seriesTitle: {
                textTransform: "uppercase",
                fontSize: "13px",
                color: "#777"
            },
            seriesSpeaker: {
                fontSize: "13px",
                color: "#777"
            },
            sermonTitle: {
                fontSize: "14px"
            },
            mobileImagePart: {
                display: 'flex',
                flexDirection: 'column'
            }
        };

        if (isMobile) {
            return (
                <li className="sermon-list-item">

                    <div className="seriesSermonListRow" onClick={() => playSermonHandler(sermon)}>
                        <div style={styles.mobileImagePart}>
                            <img src={imageURL}/>
                            <div className={"seriesMobileSocialRow"}>
                                <div className={"sermonSocialStatsMobile"}>{likeCount} <i className="fa fa-heart" aria-hidden="true"></i></div>
                                <div className={"sermonSocialStatsMobile"}>{shareCount} <i className="fa fa-share " aria-hidden="true"></i></div>
                                <div className={"sermonSocialStatsMobile"}>{playCount} <i className="fa fa-play" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className={"sermonRowDetails"}>
                            <div style={styles.seriesTitle}>{date}</div>
                            <div style={styles.sermonTitle}>{title}</div>
                            <div style={styles.seriesSpeaker}>{speaker}</div>
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
                            <div style={styles.seriesTitle}>{date}</div>
                            <div style={styles.sermonTitle}>{title}</div>
                            <div style={styles.seriesSpeaker}>{speaker}</div>
                        </div>
                        <div className={"seriesSocialRow"}>
                            <div className={"sermonSocialStats"}>{likeCount} <i className="fa fa-heart" aria-hidden="true"></i></div>
                            <div className={"sermonSocialStats"}>{shareCount} <i className="fa fa-share " aria-hidden="true"></i></div>
                            <div className={"sermonSocialStats"}>{playCount} <i className="fa fa-play" aria-hidden="true"></i></div>
                        </div>
                    </div>

                </li>
            );
        }

    }




export default SermonListItem;