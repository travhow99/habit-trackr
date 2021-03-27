import http from '../http-common';

class HabitDataService {
    getAll = () => http.get('/habits');

    get = (id) => http.get(`/habit/${id}`);

    create = (data) => http.post('/habit', data);

    update = (id, data) => http.put(`/habit/${id}`, data);

    delete = (id) => http.delete(`/habit/${id}`);
}

export default new HabitDataService();