import axios from "./BaseService";

const CLIENTS_URL = `${process.env.REACT_APP_API_URL}/clients/`;

export async function getClients(name, page, token) {
  const clientsUrl = `${CLIENTS_URL}${name}?page=${page}`;

  const headers = { authorization: token };
  const response = await axios.get(clientsUrl, { headers });
  return response.data; //{count, rows}
}

export async function getClient(id, token) {
  const headers = { authorization: token };
  const response = await axios.get(`${CLIENTS_URL}${id}`, { headers });
  return response.data;
}

export async function saveClient(id, newClient, token) {
  const headers = { authorization: token };
  let response;
  if (id)
    response = await axios.patch(`${CLIENTS_URL}${id}`, newClient, {
      headers,
    });
  else response = await axios.post(CLIENTS_URL, newClient, { headers });
  return response.data;
}

export async function deleteClient(id, token) {
  const headers = { authorization: token };
  const response = await axios.delete(`${CLIENTS_URL}${id}`, { headers });
  return response.data;
}
