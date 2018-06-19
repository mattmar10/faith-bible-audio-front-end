import React from 'react';
import { withRouter, Link} from "react-router-dom";
import _ from 'lodash'

const styles = {
    seriesList:{
        textAlign: 'left',
        listStyleType: 'none',
    },
    seriesTitleMobileWrapper: {
        fontSize: "12px",
        color: "#888",
        display: 'flex',
        justifyContent: 'space-between',
        textTransform: 'uppercase'
    },
    seriesTitleMobile:{
        whiteSpace: 'nowrap',
        minWidth: 0,
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    seriesTitle: {
        color: "#888",
        fontSize: "13px",
        textTransform: 'uppercase'
    },
    seriesSpeaker: {
        fontSize: "13px",
        color: "#888"
    },
    title: {
        fontSize: "15px",
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingTop: '3px',
        color: '#272727',
        fontWeight: 500
    },
    mobileImagePart: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        width: '80px'
    },

};

const SeriesList = ({series, isMobile}) => {

    if(!series){
        return <div>Sorry, we didn't find any series.</div>;
    }
    else{
        
        const seriesItems = series.map((series) => {
            const seriesLink = `/series/${series.slug}`
            
            const sermonsLength = series.sermons.length;

            const speakerCountMap =  _(series.sermons).countBy('speaker')
                .map((count, speaker) => ({ speaker, count }))
                .value();

            const speakerCount = Object.keys(speakerCountMap).length;
            const speakerString = (speakerCount == 1) ? `${speakerCount} Speaker` : `${speakerCount} Speakers`;
            
            const imageURL = 
                (series.imageURI == null || series.imageURI === '') ? 
                    'https://s3.amazonaws.com/faith-bible-data/mp3-images/2017_0813_MH-FBC.mp3.jpg' : 
                    series.imageURI;

            const backgroundStyle = {background: `url(${imageURL}) 50% 50% no-repeat`, backgroundSize: 'cover', height: '80px', width: '80x'};

            if(isMobile){
                return (
                    <li key={series.id} className='sermon-list-item'>
                        <Link to={seriesLink}> 
                            <div className="seriesSermonListRow" >
                                <div style={styles.mobileImagePart}>
                                    <div style={backgroundStyle} />

                                </div>
                                <div className={"sermonRowDetails"}>
                                    <div style={styles.seriesTitleMobileWrapper}>
                                        <div style={styles.seriesTitleMobile}>{speakerString}</div>
                                        <div style={{flexShrink: 0, marginLeft: '10px'}}>{sermonsLength} Sermons</div>
                                    </div>
                                    <div style={styles.title}>{series.title}</div>
                                    
                                </div>

                            </div>
                        </Link> 
                    </li>);
            }
            else{
                return (
                    <li key={series.id} className='sermon-list-item'>
                        <Link to={seriesLink}>
                            <div className="seriesSermonListRow" >
                                <div><img src={imageURL}/></div>
                                <div className={"sermonRowDetails"}>
                                    <div style={styles.seriesTitleMobileWrapper}>
                                        <div style={styles.seriesTitleMobile}>{speakerString}</div>
                                        <div style={{flexShrink: 0, marginLeft: '10px'}}>{sermonsLength} Sermons</div>
                                    </div>
                                    <div style={styles.title}>{series.title}</div>
                                    
                                </div>

                            </div>
                        </Link>
                    </li>);
            }
        });

        return (
            <div>
                <ul className={'sermonList'}>
                    {seriesItems}
                </ul>
            </div>);
    }



};

export default withRouter(SeriesList);