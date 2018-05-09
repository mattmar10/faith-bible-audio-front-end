import React from 'react';

import SermonListItem from './sermon_list_item'

const SermonList = (props) => {

    const sermonItems = props.sermons.map((sermon) => {
        return <SermonListItem key={sermon.id} sermon={sermon} />
    });

    return (
        <ul className="col-md-8 list-group videolist">
        {sermonItems}
        </ul>
    );
}

export default SermonList;