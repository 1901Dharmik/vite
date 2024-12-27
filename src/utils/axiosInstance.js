import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/"
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();
    if (error.response.status === 401) {
      // Redirect to 401 error page
      navigate('/error/401');
    } else if (error.response.status === 505) {
      // Redirect to 505 error page
      navigate('/error/505');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
