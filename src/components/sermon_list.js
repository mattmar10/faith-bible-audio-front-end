import React from 'react';

import SermonListItem from './sermon_list_item'

const SermonList = (props) => {

    console.log(props);
    const sermonItems = props.sermons.map((sermon) => {
        return <SermonListItem key={sermon.id} sermon={sermon} />
    });

    return (
        <ul className="sermonList">
        {sermonItems}
        </ul>
    );
}

export default SermonList;