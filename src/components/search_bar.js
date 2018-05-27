import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AudioSearchService from "../services/audio-search-service";


class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {term: ''}
        this.handleSubmit= this.handleSubmit.bind(this);
	}

	onInputChange(term){
		this.setState({term});
		//this.props.onSearchTermChanged(term);
	}

    handleSubmit(e) {
        e.preventDefault();
        this.props.fetchSearchResults(this.state.term);

        const location = this.props.location;

	    this.props.history.push(`/search?q=${this.state.term}`);

    }

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="searchBar">
						<div>
							<span className="fa fa-search"/>
						</div>
						<div className="search">
							<input
								placeholder = "Search by Title, Series, etc..."
								value = {this.state.term}
								onChange={event => this.onInputChange(event.target.value)} />

						</div>
						<div>
							<button type="submit" className="btn btn-secondary">
								Search
							</button>

							</div>
					</div>
				</form>
			</div>
			
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
)(SearchBar));


