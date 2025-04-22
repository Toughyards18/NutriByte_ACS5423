import axios from 'axios';


export const register = async registerData => {
  const { data } = await axios.post('api/users/register', registerData);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
}
export const login = async loginData => {
  const { data } = await axios.post('api/users/login', loginData);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};