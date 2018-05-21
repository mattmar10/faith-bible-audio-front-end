import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Homepage from '../containers/HomePage'
import SermonDetailPage from '../containers/SermonDetailPage'
import SeriesDetailPage from '../containers/SeriesDetailPage'
import SearchResultsPage from '../containers/SearchResultsPage'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route path='/search' component={SearchResultsPage}/>
            <Route path='/sermon/:sermonId' component={SermonDetailPage}/>
            <Route path='/series/:seriesId' component={SeriesDetailPage}/>
            <Route exact path='/' component={Homepage}/>

        </Switch>
    </main>
)

export default Main
