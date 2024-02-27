const API_BASE_URL = 'https://fakeapi.platzi.com';

export const fetchProductsFromApi = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  const products = await response.json();
  return products;
};

