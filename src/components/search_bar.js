import React, {Component} from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {term: ''}
	}

	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChanged(term);
	}

	render() {
		return (
			<div className="searchBarWrapper">
			<div className="searchBar">
				<input 
					placeholder = "Search for a Title, Series, Speaker."
					value = {this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
				<button className="searchBar_btn"></button>
			</div>
			
			</div>
		);
	}
}

export default SearchBar;