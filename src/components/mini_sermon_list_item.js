import React from 'react';
import { withRouter, Link} from "react-router-dom";

const MiniSermonListItem = ({sermon, playSermonHandler, isMobile}) => {
    const title = sermon.title;
    const date = sermon.date;
    const series = sermon.series;
    const seriesSlug = sermon.seriesSlug;
    const speaker = sermon.speaker;
    const mp3URL = sermon.mp3URI;
    const pdfURL = sermon.pdfURI;
    const imageURL = sermon.imageURI != null ? sermon.imageURI : "https://s3.amazonaws.com/faith-bible-data/mp3-images/2017_0813_MH-FBC.mp3.jpg";

    const likeCount = sermon.stats != null ? sermon.stats.likes : "";
    const playCount = sermon.stats != null ? sermon.stats.plays : "";
    const shareCount = sermon.stats != null ? sermon.stats.shares : "";

    const seriesLink = `/series/${seriesSlug}`

    const styles = {
        seriesTitleMobileWrapper: {
            fontSize: "12px",
            color: "#888",
            display: 'flex',
            justifyContent: 'space-between',
        },
        seriesTitleMobile:{
            whiteSpace: 'nowrap',
            minWidth: 0,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        seriesDateWrapper: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        seriesTitle: {
            color: "#888",
            fontSize: "13px",
            textTransform: 'uppercase'
        },
        seriesSpeaker: {
            fontSize: "12px",
            color: "#888"
        },
        sermonTitle: {
            fontSize: "13px",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#272727',
            fontWeight: 500
        },
        mobileImagePart: {
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            width: '40px'
        },
        mobileSocialRow: {
            fontSize: "12px",
            color: "#999999"
        }

    };


    if (isMobile) {
        const backgroundStyle = {background: `url(${imageURL}) 50% 50% no-repeat`, backgroundSize: 'cover', height: '40px', width: '40px'};
        return (
            <li className="sermon-list-item">

                <div className="seriesSermonListRow" onClick={() => playSermonHandler(sermon)}>
                    <div style={styles.mobileImagePart}>
                        <div style={backgroundStyle} />

                    </div>
                    <div className={"sermonRowDetails"}>
                        <div style={styles.sermonTitle}>{title} </div>
                        <div style={styles.seriesTitleMobileWrapper}>
                            <div style={styles.seriesSpeaker}>{speaker}</div>
                            <div style={styles.mobileSocialRow}><i className="fas fa-headphones" aria-hidden="true"></i> {playCount} </div>
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

                        <Link to={seriesLink}>
                            <div style={styles.seriesTitle}>{series}</div>
                        </Link>

                        <div style={styles.sermonTitle}>{title}</div>

                        <div style={styles.seriesSpeaker}>{speaker}</div>
                    </div>



                    <div className={"seriesSocialRow"}>

                        <div className={"sermonSocialStats"}><i className="fa fa-share " aria-hidden="true"></i>{shareCount}</div>
                        <div className={"sermonSocialStats"}><i className="fas fa-headphones" aria-hidden="true"></i>{playCount}</div>
                    </div>

                </div>

            </li>
        );
    }

}




export default withRouter(MiniSermonListItem);