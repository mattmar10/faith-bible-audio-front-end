import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

class HeaderSearchBar extends Component {

    onInputChange(term){
        console.log(term);
    }

    render() {
        return (

            <form>
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

export default connect(mapStateToProps)(HeaderSearchBar);
