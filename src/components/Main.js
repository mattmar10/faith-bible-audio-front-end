import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Homepage from '../containers/HomePage'
import SermonDetailPage from '../containers/SermonDetailPage'
import SeriesDetailPage from '../containers/SeriesDetailPage'
import SearchResultsPage from '../containers/SearchResultsPage'
import AdminPageContainer from '../containers/admin_page_container'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends Component {

    render() {
        return (
            <main>
                <BrowserRouter>
                    <Switch>
                        <Route path='/search' component={SearchResultsPage} />
                        <Route path='/sermon/:sermonSlug' component={SermonDetailPage} />
                        <Route path='/series/:seriesId' component={SeriesDetailPage} />
                        <Route path='/admin' component={AdminPageContainer} />
                        <Route exact path='/' component={Homepage} />
                    </Switch>
                </BrowserRouter>
            </main>
        );
    }
}

export default Main
