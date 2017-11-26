import axios from 'axios';


export const reqLogin = params => {
    return axios.post('/api/login',params).then(res => res.data);
};

export const reqPlayers = params =>{
    return axios.get('/api/players',params).then(res => res.data);
};
