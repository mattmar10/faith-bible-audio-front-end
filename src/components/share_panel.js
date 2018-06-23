import React, {Component} from 'react';
const SharePanel = ({sermon}) => {

    const styles = {
        twitter: {
            color: '#1dcaff',
            fontSize: '60px',
            cursor: 'pointer'
        },
        facebook: {
            color: '#3B5998',
            fontSize: '60px',
            cursor: 'pointer'
        },
        email: {
            color: '#999999',
            fontSize: '60px',
            cursor: 'pointer'
        },
        wrapper: {
            marginTop: '15px'
        }
    };

    return (

        <div style={{textAlign:"center", fontSize: '12px', marginTop: '15px'}}>
            <div>
                <div>
                    <i style={styles.email} className="fas fa-envelope"></i>
                    <p>Email</p>
                </div>
            </div>
            <div style={styles.wrapper}>
                <div>
                    <i style={styles.facebook} className="fab fa-facebook-square"></i>
                    <p>Facebook</p>
                </div>
            </div>
            <div style={styles.wrapper}>
                <div>
                    <i style={styles.twitter} className="fab fa-twitter"></i>
                    <p>Twitter</p>
                </div>
            </div>
        </div>

    );
};

export default SharePanel;