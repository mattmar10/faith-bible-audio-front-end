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
			<div>
				<input 
					value = {this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
				Search Term: {this.state.term}
			</div>
		);
	}
}

export default SearchBar;