var BASE_URL = '';
let headers = new Headers();
headers.set('Accept', 'application/json');

function getData(endpoint) {
    BASE_URL = API_ENDPOINT + '/' + endpoint;

    return new Promise((resolve, reject) => {
        fetch(BASE_URL, {
            method: 'GET',
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function postData(endpoint, payload, method) {
    BASE_URL = API_ENDPOINT + '/' + endpoint;

    payload.append('endPoint', endpoint);
    payload.append('__platform', 'web');
    let from = 'dev';
    payload.append('from', from);

    if (!method)
        method = 'POST';

    return new Promise((resolve, reject) => {
        fetch(BASE_URL, {
            method: 'POST',
            headers: headers,
            body: payload,
            redirect: 'follow'
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export {getData, postData};
