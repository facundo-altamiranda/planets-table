import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://swapi.dev/api/',
});

const getPlanets = () => {
    return axiosInstance.get('planets');
};

export {
    getPlanets
};
