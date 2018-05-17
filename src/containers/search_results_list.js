import React, {Component} from 'react';
import { connect } from 'react-redux';

class SearchResultList extends Component{

    renderList() {
        return this.props.searchResults.map((result) => {
            return (
                <li key={result.title} className="list-group-item">{result.title}</li>
            )
        });
    }

    render(){
        return(
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return{
        searchResults: state.searchResults
    };
}

export default connect(mapStateToProps)(SearchResultList);