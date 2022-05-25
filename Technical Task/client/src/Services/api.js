import axios from "axios";

export const URL = "http://localhost:8000/"
export const IMG_URL = URL;
export const callApi = ({
    path,
    method = "GET",
    isForm,
    url = null,
    body = null,
    token = null,
}) => {
    let urlString = URL + path;
    let headers = {
        ...(isForm
            ? {}
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
    };
    let options = {
        method,
    };
    if (token) headers["Authorization"] = "Bearer " + token;
    options.headers = headers;
    if (body) options.data = body;
    if (url) urlString = url;
    options.url = urlString;
    return axios(options).then((res) => {
        if (res.status === 200) {
            return res.data;
        }
        return { status: res.status, ...res.data };
    });
};