import { request } from "./request.js";
export const url = 'http://localhost:9000/';
export const urlSpring = 'http://localhost:8080/'; //Adresa 


export const reqUrl = url;
export const login = (payload) => { return request(url + 'login/', { body: JSON.stringify(payload) }) };
export const register = (payload) => { return request(url + 'register/', { body: JSON.stringify(payload) }) };
export const update = (payload) => { return request(url + 'update/', { body: JSON.stringify(payload) }) };
export const getUsers = () => { return request(url + 'getUsers/', { method: 'GET' }) };
export const getUser = (payload) => { return request(url + 'getUser/', { body: JSON.stringify(payload) }) };
export const addEmployee = (payload) => { return request(url + 'addEmployee/', { body: JSON.stringify(payload) }) };
export const getEmployees = () => { return request(url + 'getEmployees/', { method: 'GET' }) };
export const getEmployeesByKey = (payload) => { return request(url + 'getEmployeesByKey/', { body: JSON.stringify(payload) }) };
export const updateEmployee = (payload) => { return request(url + 'updateEmployee/', { body: JSON.stringify(payload) }) };
export const deleteEmployee = (payload) => { return request(url + 'deleteEmployee/', { body: JSON.stringify(payload),method: 'DELETE' }) };
export const getBuildings = () => { return request(url + 'getBuildings/', { method: 'GET' }) };
export const getBuilding = (payload) => { return request(url + 'getBuilding/', { body: JSON.stringify(payload) }) };
export const addBuilding = (payload) => { return request(url + 'addBuilding/', { body: JSON.stringify(payload) }) };
export const deleteBuilding = (payload) => { return request(url + 'deleteBuilding/', { body: JSON.stringify(payload),method: 'DELETE' }) };
export const getRooms = () => { return request(url + 'getRooms/', { method: 'GET' }) };
export const addRoom = (payload) => { return request(url + 'addRoom/', { body: JSON.stringify(payload) }) };
export const getRoom = (payload) => { return request(url + 'getRoom/', { body: JSON.stringify(payload) }) };
export const getRoomsByFloor = (payload) => { return request(url + 'getRoomsByFloor/', { body: JSON.stringify(payload) }) };
export const updateRoom = (payload) => { return request(url + 'updateRoom/', { body: JSON.stringify(payload) }) };
export const updateRoomStatus = (payload) => { return request(url + 'updateRoomStatus/', { body: JSON.stringify(payload) }) };
export const deleteRoom = (payload) => { return request(url + 'deleteRoom/', { body: JSON.stringify(payload),method: 'DELETE' }) };
export const getKeys = () => { return request(url + 'getKeys/', { method: 'GET' }) };
export const addKey = (payload) => { return request(url + 'addKey/', { body: JSON.stringify(payload) }) };
export const updateKey = (payload) => { return request(url + 'updateKey/', { body: JSON.stringify(payload) }) };
export const getKeysByRoom = (payload) => { return request(url + 'getKeysByRoom/', { body: JSON.stringify(payload) }) };
export const deleteKey = (payload) => { return request(url + 'deleteKey/', { body: JSON.stringify(payload),method: 'DELETE' }) };
export const getLogs = () => { return request(url + 'getLogs/', { method: 'GET' }) };
export const addLog = (payload) => { return request(url + 'addLog/', { body: JSON.stringify(payload) }) };
export const getLogsByRoom = (payload) => { return request(url + 'getLogsByRoom/', { body: JSON.stringify(payload) }) };


export const getRequest = (payload) => {
    return axios({
      method: 'GET',
      responseType: '',
      url: urlSpring + '/path', 
      headers: {
      }
    });
  };
  