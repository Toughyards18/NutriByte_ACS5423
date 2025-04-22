// src/components/Fetching/Fetching.jsx
// This component displays a dog fetching message when the application is in a loading state.

import axios from 'axios';

export const setLoadingInterceptor = ({ showLoading, hideLoading }) =>
{
    axios.interceptors.request.use(
        req =>
        {
            if (!(req.data instanceof FormData)) showLoading();
            return req;
        },
        error =>
        {
            hideLoading();
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        res =>
        {
            hideLoading();
            return res;
        },
        error =>
        {
            hideLoading();
            return Promise.reject(error);
        }
    );
};

export default setLoadingInterceptor;
