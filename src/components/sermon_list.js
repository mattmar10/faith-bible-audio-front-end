import React from 'react';

import SermonListItem from './sermon_list_item'

const SermonList = (props) => {

    console.log(props);
    const sermonItems = props.sermons.map((sermon) => {
        return <SermonListItem key={sermon.id} sermon={sermon} />
    });

    return (
        <div>
            <ul className='sermonList'>
            {sermonItems}
            </ul>
        </div>
    );
}

export default SermonList;