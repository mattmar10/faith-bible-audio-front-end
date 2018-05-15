import React from 'react';

const SermonDetail = ({sermon}) => {

    if(!sermon){
        return <div>Loading... </div>;
    }

    return (
        <div >
            <div className="hero-mostRecent">
                <div>Listen Now</div>
            </div>
        </div>
    );

};

export default SermonDetail;