import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: 'https://web-ban-dong-ho-be.onrender.com/',
});

export default httpRequest;
