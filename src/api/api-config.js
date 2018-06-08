
//const backendHost = 'http://localhost:8080';{process.env.REACT_APP_SECRET_CODE}


//const baseUrl = 'http://fbc-media-dev-lb-772092556.us-east-1.elb.amazonaws.com';

function getRoot() {
    return process.env.REACT_APP_API_ROOT;
}

export const API_ROOT = getRoot()
