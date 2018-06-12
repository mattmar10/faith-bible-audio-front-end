import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../actions/index"
import SermonListItem from '../components/sermon_list_item'


class SermonList extends Component {

    constructor(props) {
        super(props);
        this.playSermon= this.playSermon.bind(this);
    }

    playSermon(sermon){
        this.props.playSermon(sermon);
    }

    render() {

        const sermonItems = this.props.sermons.map((sermon) => {
            return <SermonListItem key={sermon.id} sermon={sermon} isMobile={this.props.isMobile} playSermonHandler={this.playSermon}/>
        });

        if (this.props.sermons) {
            return (
                <div>
                    <ul className='sermonList'>
                        {sermonItems}
                    </ul>
                </div>);
        }
        else {
            return (<div>list</div>);
        }
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {

    return {
        playSermon: (sermon) => {
            dispatch(actions.showAudioPlayer(true));
            dispatch(actions.playSermonAudio(sermon))
        }

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SermonList);

