
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminPage from '../components/AdminPage'
import SermonService from '../services/sermon-service'

class AdminPageContainer extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            term: this.props.searchTerm,
            width: window.innerWidth
        }
        
    }

    componentWillMount() {
        this.props.loadSeries();
        this.props.loadSermons();
    }

    render(){
        return(
            <AdminPage />
        );
    }
}

const sermonService = new SermonService();

function mapStateToProps(state) {
    return {
        allSermons: state.allSermons,
        allSeries: state.allSeries
    };
}

function mapDispatchToProps(dispatch) {

    return {
        loadSermons: () => dispatch(sermonService.loadAllSermons()),
        loadSeries: () => dispatch(sermonService.loadAllSeries())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPageContainer);