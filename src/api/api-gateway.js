import axios from 'axios'
//import {sessionActionBuilder} from "../session";

const response404 = {
    status: 404,
    error: "Not Found"
};

const response401 = {
    status: 401,
    error: "Unauthorized"
};

const response400 = {
    status: 400,
    error: "Bad Request"
};

/*function validateSession(response: Object) {
    if api(response.status === 404 || response.status === 401) {
        return response;
    }

    if (response.includes('<html')) {
        const doc = new DOMParser().parseFromString(response, "text/html");
        const payload = {
            action: doc.getElementsByTagName('form')[0].getAttribute('action'),
            value: doc.getElementsByTagName('input')[0].getAttribute('value')
        };
        store.dispatch(sessionActionBuilder.sessionExpired(payload));
        return Promise.reject();
    }
    if (response === null || response === undefined || response === '') {
        return undefined;
    }
    return JSON.parse(response);
}
*/

function executeRequest(finalUrl: string, request: Object) {
    return axios(finalUrl, request)
        .then(response => {
            if (response.status === 404) {
                return response404;
            }
            if (response.status === 401) {
                return response401;
            }
            else if (response.status == 400){
                return response400;
            }
            return response;
        })
        //.then(validateSession)
        .catch((error) => {
            return {
                error: 'API call failed',
                details: error
            }
        });
}

function generateBodyJsonString(body: Object) {
    if (body === null || body === undefined) {
        body = {};
    }
    return JSON.stringify(body);
}

export default class ApiGateway {

    get(url: string, requestParams: Object) {
        return executeRequest(
            url,
            {
                params: requestParams, 
                headers: {'Content-Type': 'application/json'},
                credentials: 'same-origin', 
                method: 'GET'
            });

    }

    post(url: string, body: Object) {
        return executeRequest(
            url,
            {
                body: generateBodyJsonString(body),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', method: 'POST'
            });
    }

    put(url: string, body: Object) {
        return executeRequest(
            url,
            {
                body: generateBodyJsonString(body),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', method: 'PUT'
            });
    }

    patch(url: string, body: Object) {
        return executeRequest(
            url,
            {
                body: generateBodyJsonString(body),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', method: 'PATCH'
            });
    }

    delete(url: string) {
        return executeRequest(
            url,
            {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include', method: 'DELETE'
            });
    }
}
