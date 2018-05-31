import React, { Component } from 'react';

import { withRouter, Link } from "react-router-dom";

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

        if("/" == this.props.location['pathname']){
            return(<div></div>);
        }
        else{

            if(this.props.isMobile){
                return(
                    <div />
                );
            }
            else{
                return (
                    <div className='headerSearchBarWrapper'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="headerSearchBar">
                                <div>
                                    <span className="fa fa-search"/>
                                </div>
                                <div className="headerSearch">
                                    <input
                                        placeholder = "Search by Title, Series, etc..."
                                        value = {this.state.term}
                                        onChange={event => this.onInputChange(event.target.value)} />
    
                                </div>
                                
                            </div>
                            
                        </form>
                    
                    </div>
                );
            }
        }


    }
}

function mapStateToProps(state) {
    return {
        searchTerm: state.searchResults.searchTerm
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
