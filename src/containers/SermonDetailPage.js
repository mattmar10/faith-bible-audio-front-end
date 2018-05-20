import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import AudioSearchService from '../services/audio-search-service'


class SermonDetailPage extends Component{

    componentWillMount() {
        const sermonId = this.props.match.params['sermonId']
        this.props.getSermonDetails(sermonId);
    }

    render(){

        if(this.props.sermonDetails.error){
            return(<div>{this.props.sermonDetails.errorMessage}</div>);
        }
        else{
            const sermon = this.props.sermonDetails.sermon

            if(sermon){
                return(
                    <div>
                        <h2>Sermon Detail Page</h2>
                        <h3>{sermon.title}</h3>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <h2>Sermon Detail Page</h2>
                    </div>
                );
            }
            
        }
    }
}


const audioSearchService = new AudioSearchService();
function mapStateToProps(state){
    return{
        sermonDetails: state.sermonDetails
    };
}

function mapDispatchToProps(dispatch){
    return { 
        getSermonDetails: (sermonId) => dispatch(audioSearchService.getSermonDetails(sermonId))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SermonDetailPage);            

