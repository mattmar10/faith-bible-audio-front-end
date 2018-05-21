import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

class HeaderSearchBar extends Component {

    render() {
        return (

            <form>
                <input
                    placeholder="Search for a Title, Series, Speaker."
                    value={this.props.searchTerm}
                    onChange={event => this.onInputChange(event.target.value)} />
                <button className="searchBar_btn"></button>
            </form>

        );
    }
}

function mapStateToProps(state) {
    return {
        searchTerm: state.searchTerm
    };
}

export default connect(mapStateToProps)(HeaderSearchBar);
