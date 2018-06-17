import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from "../actions/index"

import MiniSermonListItem from '../components/mini_sermon_list_item'

class MiniSermonList extends Component {

    constructor(props) {
        super(props);
        this.playSermon= this.playSermon.bind(this);
    }

    playSermon(sermon){
        //this.props.playSermon(sermon);
        this.props.history.push(`/sermon/${sermon.slug}`);
        window.location.reload();
    }

    render() {

        const sermonItems = this.props.sermons.map((sermon) => {
            return <MiniSermonListItem key={sermon.id} sermon={sermon} isMobile={this.props.isMobile} playSermonHandler={this.playSermon}/>
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

export default withRouter(MiniSermonList);

