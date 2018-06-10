import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import SermonList from '../containers/sermon_list_container'
import SeriesList from '../components/series_list'


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        borderTop: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#fff',
    },
    tabRoot: {
        textTransform: 'initial',
        outline: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,

        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        '&:hover': {
            color: '#272727',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#272727',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#272727',
        },
    },
    tabSelected: {
        outline: 'none'
    }
});

class CustomizedTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    renderSermons() {

    
        if (!_.isEmpty(this.props.sermons)) {
            const sermonsList = Object.keys(this.props.sermons).map(result => {
                return this.props.sermons[result];
            });

            return (
                <SermonList sermons={sermonsList} isMobile={this.props.isMobile} />
            );
        }
        else {
            return "";
        }

    }

    renderSeries() {

        if (!_.isEmpty(this.props.series)) {
            const seriesList = Object.keys(this.props.series).map(result => {
                return this.props.series[result];
            });
            
            return (
                
                <SeriesList series={seriesList} isMobile={this.props.isMobile} />
            );
        }
        else {
            return "";
        }

    }


    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="Sermons"
                    />
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="Series"
                    />

                </Tabs>
                {value === 0 && this.renderSermons()}
                {value === 1 && this.renderSeries()}
            </div>
        );
    }
}

CustomizedTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTabs);