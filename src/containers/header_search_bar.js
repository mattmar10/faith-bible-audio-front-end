import React, { Component } from 'react';
import queryString from 'query-string'
import { withRouter } from "react-router-dom";

import { bindActionCreators } from 'redux'
import AudioSearchService from "../services/audio-search-service";
import {connect} from "react-redux";

class HeaderSearchBar extends Component {

    constructor(props){
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.state = {term: ''}
    }

    onInputChange(term){
        this.setState({term: term});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchSearchResults(this.state.term);

        const location = this.props.location;

        if(!location['pathname'].endsWith('search')) {
            this.props.history.push(`/search?q=${this.state.term}`);
        }
    }


    render() {


        return (
            <form onSubmit={this.handleSubmit}>
                <button className="headerSearchBar_btn"></button>
                <input
                    placeholder="Search for a Title, Series, Speaker."
                    value={this.props.searchTerm}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </form>

        );
    }
}

function mapStateToProps(state) {
    return {
        searchTerm: state.searchTerm
    };
}


function mapDispatchToProps (dispatch) {

    return {
        fetchSearchResults: (query) => dispatch(audioSearchService.freeTextSearch(query))
    }
}

const audioSearchService = new AudioSearchService();

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderSearchBar));
