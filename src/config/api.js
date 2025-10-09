const API_BASE_URL = 'https://tow0pwafhh.execute-api.us-west-2.amazonaws.com/prod';

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/restaurants/register`,
  LOGIN: `${API_BASE_URL}/restaurants/login`,
  GET_RESTAURANT: (restaurantId) => `${API_BASE_URL}/restaurants/${restaurantId}`,
  UPDATE_RESTAURANT: (restaurantId) => `${API_BASE_URL}/restaurants/${restaurantId}`,
  LIST_ORDERS: (restaurantId) => `${API_BASE_URL}/restaurants/${restaurantId}/orders`,
  ADMIN_LIST_RESTAURANTS: `${API_BASE_URL}/admin/restaurants`,
  ADMIN_GET_MENU: (restaurantId) => `${API_BASE_URL}/admin/restaurants/${restaurantId}/menu`,
};

export default API_BASE_URL;
