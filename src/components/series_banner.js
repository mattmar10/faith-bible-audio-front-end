import React, {Component} from 'react';
import '../css/Series.css'

class SeriesBanner extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const imageURL = this.props.series.imageURI != null ? this.props.series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";

        const sermonCountStyle = {
            fontSize: '18px',
            color: 'white',
            background: '#272727',
            padding: '5px',
            marginTop: '10px'
        };

        if(this.props.isMobile){

            return(
                <div className='mobSeriesBanner'>
                    <img className='img-fluid' src={imageURL}/>
                </div>
            );
        }
        else{
            return(
                <div className='seriesBanner'>
                    <div className={'seriesBannerTitle'}>
                        <span className='seriesHeader'>{this.props.series.title}</span>
                        <p style= {{marginTop: '10px'}}><span style={sermonCountStyle}>{this.props.series.sermons.length} Sermons</span></p>
                    </div>
                    <div className={'seriesBannerHeroImage'}>
                        <img className='img-fluid' src={imageURL}/>
                    </div>
                </div>
            );
        }

    }
}

export default SeriesBanner;