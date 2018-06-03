import React, {Component} from 'react';
import '../css/Series.css'

class SeriesBanner extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const imageURL = this.props.series.imageURI != null ? this.props.series.imageURI : "http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Headphones-Apollo-icon.png";

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
                        <h1>{this.props.series.title}</h1>
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