import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1/';
const DEFAULT_IMAGE_URL = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';
const GOOGLE_AUTH_LOGIN_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

const fetchProductsFromApi = async (endpoint: any, options = {}) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const useGoogleLoginWrapper = () => {
  const { login } = useAuth();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch(
        `${GOOGLE_AUTH_LOGIN_URL}?access_token=${tokenResponse.access_token}`
      );
      const userData = await res.json();
      // Call your login function with user data
      console.log('userData');
      console.log(userData);
      login(userData);
      // handle data
    },
  });

  return googleLogin;
};

export { API_BASE_URL, DEFAULT_IMAGE_URL, fetchProductsFromApi, useGoogleLoginWrapper };

