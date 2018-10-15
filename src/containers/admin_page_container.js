
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
        this.props.loadUnmapped();
    }

    render(){
        return(
            <AdminPage 
                sermons={this.props.allSermons} 
                series={this.props.allSeries}
                unmappedSermons={this.props.unmappedSermons} />
        );
    }
}

const sermonService = new SermonService();

function mapStateToProps(state) {
    return {
        allSermons: state.allSermons.sermons,
        allSeries: state.allSeries.series,
        unmappedSermons: state.unmappedSermons.sermons
    };
}

function mapDispatchToProps(dispatch) {

    return {
        loadSermons: () => dispatch(sermonService.loadAllSermons()),
        loadSeries: () => dispatch(sermonService.loadAllSeries()),
        loadUnmapped: () => dispatch(sermonService.loadUnmappedSermons())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPageContainer);