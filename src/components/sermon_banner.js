import React, {Component} from 'react';

class SermonBanner extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const imageURL =
            this.props.sermon.imageURI != null ? this.props.sermon.imageURI :
                "https://s3.amazonaws.com/faith-bible-data/mp3-images/2017_0813_MH-FBC.mp3.jpg";

        const styles = {
            wrapper: {
                textAlign: 'left',
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '7px',
                fontWeight: 500,
                fontSize: '16px',
                fontWeight: '700'
            },
            series: {
                color: '#999999',
                fontSize: '12px',
                marginRight: '5px',
                paddingTop: '3px',
                paddingBottom: '3px',
                paddingRight: '4px',
                paddingLeft: '4px',
                borderRadius: '4px',
                backgroundColor: '#f2f2f2'
            },
            iconWrapper: {
                fontSize: '12px',
                color: '#888888',
                textAlign: 'right',
                marginTop: '5px',
                marginRight: '10px'
            }
        }

        if(this.props.isMobile){
            const playCount = this.props.sermon.stats != null ? this.props.sermon.stats.plays : "";
            <div className={"sermonSocialStatsMobile"}></div>
            return(
                <div className='mobSermonBanner'>
                    <img className='img-fluid' src={imageURL}/>

                    <div style={styles.wrapper}>{this.props.sermon.title}</div>
                </div>
            );
        }
        else{
            return(
                <div className='sermonBanner'>
                    <img className='img-fluid' src={imageURL}/>
                    <div>{this.props.sermon.title}</div>
                </div>
            );
        }

    }
}

export default SermonBanner;