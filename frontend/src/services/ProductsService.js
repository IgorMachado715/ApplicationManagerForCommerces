import axios from "./BaseService";

const PRODUCTS_URL = `${process.env.REACT_APP_API_URL}/products/`;

export async function getProducts(name, page, token) {
  const productsUrl = `${PRODUCTS_URL}${name}?page=${page}`;

  const headers = { authorization: token };
  const response = await axios.get(productsUrl, { headers });
  return response.data; //{count, rows}
}

export async function getProduct(id, token) {
  const headers = { authorization: token };
  const response = await axios.get(`${PRODUCTS_URL}${id}`, { headers });
  return response.data;
}

export async function saveProduct(id, newProduct, token) {
  const headers = { authorization: token };
  let response;
  if (id)
    response = await axios.patch(`${PRODUCTS_URL}${id}`, newProduct, {
      headers,
    });
  else response = await axios.post(PRODUCTS_URL, newProduct, { headers });
  return response.data;
}

export async function deleteProduct(id, token) {
  const headers = { authorization: token };
  const response = await axios.delete(`${PRODUCTS_URL}${id}`, { headers });
  return response.data;
}
