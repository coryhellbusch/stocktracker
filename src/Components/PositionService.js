import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8080/api/positions';
const STOCK_DATA_BASE_URL = 'http://localhost:8080/api/stocks';

export const getAllPositions = () => axios.get(BASE_REST_API_URL);
export const getPosition = (id) => axios.get(BASE_REST_API_URL + '/' + id);
export const addPosition = (position) => axios.post(BASE_REST_API_URL, position);
export const updatePosition = (position, id) => axios.put(BASE_REST_API_URL + '/' + id, position);
export const deletePosition = (id) => axios.delete(BASE_REST_API_URL + '/' + id);
export const getStockData = (ticker) => axios.get(STOCK_DATA_BASE_URL + '/' + ticker);
