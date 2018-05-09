import React from 'react';

const SermonDetail = ({sermon}) => {

    if(!sermon){
        return <div>Loading... </div>;
    }
    
    return (
        <div className="col-md-8">
            <div className="details">
                <div>{sermon.title}</div>
                <div>{sermon.date}</div>
                <div>{sermon.series}</div>
                <div>{sermon.speaker}</div>
            </div>
        </div>
    );

};

export default SermonDetail;